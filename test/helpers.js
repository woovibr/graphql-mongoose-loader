// @flow

import mongoose from 'mongoose';

import UserModel from '../test/fixtures/UserModel';
import GroupModel from '../test/fixtures/GroupModel';

const mongooseOptions = {
  autoIndex: false,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  connectTimeoutMS: 10000,
};

export const restartCounters = () => {
  global.__COUNTERS__ = Object.keys(global.__COUNTERS__).reduce(
    (prev, curr) => ({ ...prev, [curr]: 0 }),
    {},
  );
};

export async function connectMongoose() {
  jest.setTimeout(20000);
  return mongoose.connect(global.__MONGO_URI__, {
    ...mongooseOptions,
    dbName: global.__MONGO_DB_NAME__,
  });
}

export async function connectMongooseAndPopulate() {
  await connectMongoose();
}

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

export async function disconnectMongoose() {
  //await mongoose.connection.close();
  return mongoose.disconnect();
}

export async function clearDbAndRestartCounters() {
  await clearDatabase();
  restartCounters();
}

export const createUser = async (args: $FlowFixMe = {}) => {
  const n = (global.__COUNTERS__.user += 1);

  return new UserModel({
    name: `User ${n}`,
    ...args,
  }).save();
};

export const createGroup = async (args: $FlowFixMe = {}) => {
  const n = (global.__COUNTERS__.group += 1);

  return new GroupModel({
    name: `Group ${n}`,
    ...args,
  }).save();
};
