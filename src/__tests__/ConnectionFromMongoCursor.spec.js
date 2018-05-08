// @flow'

import {
  clearDbAndRestartCounters,
  connectMongooseAndPopulate,
  disconnectMongoose,
  createUser,
  createGroup,
} from '../../test/helpers';

import connectionFromMongoCursor from '../ConnectionFromMongoCursor';
import UserModel from '../../test/fixtures/UserModel';

beforeAll(connectMongooseAndPopulate);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return connection from mongo cursor', async () => {
  // 2 users without groups
  const userA = await createUser();
  const userB = await createUser();

  // 2 users with groups
  const GroupA = await createGroup();
  const GroupB = await createGroup();

  await createUser({ group: GroupA });
  await createUser({ group: GroupB });

  const cursor = UserModel.find();

  const context = { randomProperty: 2 };
  const loader = jest.fn();
  loader.mockReturnValue('user');

  const args = { first: 2 };

  const result = await connectionFromMongoCursor({ cursor, context, args, loader });

  expect(result).toMatchSnapshot();
  expect(loader).toHaveBeenCalledTimes(2);
  expect(loader.mock.calls[0]).toEqual([context, userA._id]);
  expect(loader.mock.calls[1]).toEqual([context, userB._id]);
});
