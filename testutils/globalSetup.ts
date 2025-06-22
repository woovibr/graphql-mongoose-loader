import { MongoMemoryServer } from 'mongodb-memory-server-global';
import fs from 'node:fs';

import { getGlobalConfigPath } from './getGlobalConfigPath.ts';

const setupEnv = () => {
  // mock process.env
  process.env.APP_ENV = 'testing';
};

export async function setup(): Promise<void> {
  const globalConfigPath = getGlobalConfigPath();

  if (process.env.MONGO_URI_TEST) {
    const mongoConfig = {
      mongoUri: process.env.MONGO_URI_TEST,
    };

    // save mongo uri to be reused in each test
    fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

    return;
  }

  globalThis.__MONGOD__ = await MongoMemoryServer.create();

  const mongoConfig = {
    mongoUri: globalThis.__MONGOD__.getUri(),
  };

  // save mongo uri to be reused in each test
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  setupEnv();
}

export async function teardown(): Promise<void> {
  if (process.env.MONGO_URI_TEST) {
    return;
  }

  if (globalThis.__MONGOD__) {
    await globalThis.__MONGOD__.stop();
  }
}
