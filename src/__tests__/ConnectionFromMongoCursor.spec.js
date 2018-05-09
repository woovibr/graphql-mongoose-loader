// @flow'

import {
  clearDbAndRestartCounters,
  connectMongooseAndPopulate,
  disconnectMongoose,
  createUser,
} from '../../test/helpers';

import connectionFromMongoCursor from '../ConnectionFromMongoCursor';
import UserModel from '../../test/fixtures/UserModel';

beforeAll(connectMongooseAndPopulate);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return connection from mongo cursor', async () => {
  const userA = await createUser();
  const userB = await createUser();
  const userC = await createUser();
  const userD = await createUser();

  const cursor = UserModel.find();
  const context = {
    // got it throwing a 🎲
    randomValue: 2,
  };

  const loader = jest.fn();
  loader.mockReturnValue('user');

  const argsFirstPage = { first: 2 };

  const resultFirstPage = await connectionFromMongoCursor({
    cursor,
    context,
    args: argsFirstPage,
    loader,
  });

  expect(loader).toHaveBeenCalledTimes(2);
  expect(loader.mock.calls[0]).toEqual([context, userA._id]);
  expect(loader.mock.calls[1]).toEqual([context, userB._id]);
  expect(resultFirstPage).toMatchSnapshot();

  // second page

  const argsSecondPage = { after: resultFirstPage.pageInfo.endCursor };

  const resultSecondPage = await connectionFromMongoCursor({
    cursor,
    context,
    args: argsSecondPage,
    loader,
  });

  expect(loader).toHaveBeenCalledTimes(4);
  expect(loader.mock.calls[2]).toEqual([context, userC._id]);
  expect(loader.mock.calls[3]).toEqual([context, userD._id]);
  expect(resultSecondPage).toMatchSnapshot();
});
