import {
  clearDbAndRestartCounters,
  connectMongooseAndPopulate,
  disconnectMongoose,
  createUser,
} from '../../testutils/helpers.ts';
import DataLoader from 'dataloader';
import { beforeAll, beforeEach, afterAll, it, expect } from 'vitest'
import mongoose, { HydratedDocument } from 'mongoose';

import mongooseLoader from '../MongooseLoader';
import UserModel, { IUser } from '../../testutils/fixtures/UserModel';

beforeAll(connectMongooseAndPopulate);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should batch user load', async () => {
  const userA = await createUser();
  const userB = await createUser();

  const userDataloader = new DataLoader<string, HydratedDocument<IUser>>(ids => mongooseLoader(UserModel, ids));

  // should batch user load
  const resultUserA = userDataloader.load(userA._id.toString());
  const resultUserB = userDataloader.load(userB._id.toString());

  const [userAData, userBData] = await Promise.all([resultUserA, resultUserB]);

  expect(userAData._id.toString()).toBe(userA._id.toString())
  expect(userBData._id.toString()).toBe(userB._id.toString())
});

it('should batch user load without lean', async () => {
  const userA = await createUser();
  const userB = await createUser();

  const userDataloader = new DataLoader<string, HydratedDocument<IUser>>(ids => mongooseLoader(UserModel, ids, false));

  // should batch user load
  const resultUserA = userDataloader.load(userA._id.toString());
  const resultUserB = userDataloader.load(userB._id.toString());

  const [userAData, userBData] = await Promise.all([resultUserA, resultUserB]);

  expect(userAData._id.toString()).toBe(userA._id.toString())
  expect(userBData._id.toString()).toBe(userB._id.toString())
});

it('should load based on custom key', async () => {
  const userName = 'user-a';
  const userA = await createUser({ userName });

  const userDataloader = new DataLoader<string, HydratedDocument<IUser>>(ids => mongooseLoader(UserModel, ids, true, 'userName'));

  const userAData = await userDataloader.load(userA.userName);

  expect(userAData.userName).toBe(userA.userName);
})
