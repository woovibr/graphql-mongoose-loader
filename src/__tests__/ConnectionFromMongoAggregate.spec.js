// @flow'

import {
  clearDbAndRestartCounters,
  connectMongooseAndPopulate,
  disconnectMongoose,
  createUser,
  createGroup,
} from '../../test/helpers';

import connectionFromMongoAggregate from '../ConnectionFromMongoAggregate';
import GroupModel from '../../test/fixtures/GroupModel';

beforeAll(connectMongooseAndPopulate);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return connection from mongo aggregate', async () => {
  const userC = await createUser();
  const userD = await createUser();

  await createGroup({ users: [userC._id, userD._id] });

  // simple aggregate to return all users inside any group
  const aggregate = GroupModel.aggregate([
    {
      $lookup: {
        from: 'User',
        localField: 'users',
        foreignField: '_id',
        as: 'users',
      },
    },
    {
      // remove empty groups
      $match: { users: { $exists: true, $ne: [] } },
    },
    {
      // promote each user to a new document
      $unwind: '$users',
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $replaceRoot: { newRoot: '$users' },
    },
  ]);

  const context = {
    // got it throwing a 🎲
    randomValue: 1,
  };

  const loader = jest.fn();
  loader.mockReturnValue('user');

  const argsFirstPage = { first: 1 };

  const resultFirstPage = await connectionFromMongoAggregate({
    aggregate,
    context,
    args: argsFirstPage,
    loader,
  });

  expect(loader).toHaveBeenCalledTimes(1);
  expect(loader.mock.calls[0]).toEqual([context, userC._id]);
  expect(resultFirstPage).toMatchSnapshot();

  const argsSecondPage = { after: resultFirstPage.pageInfo.endCursor };

  const resultSecondPage = await connectionFromMongoAggregate({
    aggregate,
    context,
    args: argsSecondPage,
    loader,
  });

  expect(loader).toHaveBeenCalledTimes(2);
  expect(loader.mock.calls[1]).toEqual([context, userD._id]);
  expect(resultSecondPage).toMatchSnapshot();
});
