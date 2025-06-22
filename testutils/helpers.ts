import mongoose, { HydratedDocument } from 'mongoose';

import UserModel, { IUser } from './fixtures/UserModel';
import GroupModel, { IGroup } from './fixtures/GroupModel';

const mongooseOptions = {
  autoIndex: false,
  connectTimeoutMS: 10000,
};

declare global {
  var __COUNTERS__: Record<string, number>;
  var __MONGO_URI__: string;
  var __MONGO_DB_NAME__: string;
}

export const getCounter = (key: string) => {
  if (key in global.__COUNTERS__) {
    // @ts-ignore
    const currentValue = global.__COUNTERS__[key];

    // @ts-ignore
    global.__COUNTERS__[key]++;

    return currentValue;
  }

  // @ts-ignore
  global.__COUNTERS__[key] = 0;
  return 0;
};

export const restartCounters = () => {
  global.__COUNTERS__ = {};
};

export async function connectMongoose() {
  return mongoose.connect(global.__MONGO_URI__, {
    ...mongooseOptions,
    dbName: global.__MONGO_DB_NAME__,
  });
}

export async function connectMongooseAndPopulate() {
  await connectMongoose();
}

export async function clearDatabase() {
  await mongoose.connection.db?.dropDatabase();
}

export async function disconnectMongoose() {
  //await mongoose.connection.close();
  return mongoose.disconnect();
}

export async function clearDbAndRestartCounters() {
  await clearDatabase();
  restartCounters();
}

export const createUser = async (
  args: any = {},
): Promise<HydratedDocument<IUser>> => {
  const n = getCounter('user');

  return new UserModel({
    name: `User ${n}`,
    ...args,
  }).save();
};

export const createGroup = async (
  args: any = {},
): Promise<HydratedDocument<IGroup>> => {
  const n = getCounter('group');

  return new GroupModel({
    name: `Group ${n}`,
    ...args,
  }).save();
};
