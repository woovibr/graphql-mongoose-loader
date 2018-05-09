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
  const userA = await createUser();
  const userB = await createUser();
  await createUser();
  await createUser();

  await createGroup({ users: [userA._id, userB._id] });

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
  expect(loader.mock.calls[0]).toEqual([context, userA._id]);
  expect(resultFirstPage).toMatchSnapshot();

  const argsSecondPage = { after: resultFirstPage.pageInfo.endCursor };

  const resultSecondPage = await connectionFromMongoAggregate({
    aggregate,
    context,
    args: argsSecondPage,
    loader,
  });

  expect(loader).toHaveBeenCalledTimes(2);
  expect(loader.mock.calls[1]).toEqual([context, userB._id]);
  expect(resultSecondPage).toMatchSnapshot();
});

it('should work with empty args', async () => {
  const userA = await createUser();
  const userB = await createUser();

  await createGroup({ users: [userA._id, userB._id] });

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

  const args = {};

  const result = await connectionFromMongoAggregate({
    aggregate,
    context,
    args,
    loader,
  });

  expect(loader).toHaveBeenCalledTimes(2);
  expect(loader.mock.calls[0]).toEqual([context, userA._id]);
  expect(result).toMatchSnapshot();
});

it.only('should work with empty args and empty result', async () => {
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

  const args = {};

  const result = await connectionFromMongoAggregate({
    aggregate,
    context,
    args,
    loader,
  });

  expect(loader).not.toHaveBeenCalled();
  expect(result).toMatchSnapshot();
});
