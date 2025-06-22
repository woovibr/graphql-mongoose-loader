import { MongoMemoryServer } from 'mongodb-memory-server-global';

import { getMMSLaunchTimeout } from './getMMSLaunchTimeout.ts';
import { getMMSPort } from './getMMSPort.ts';

export const getMMSMongoD = async () => {
  const mongod = await MongoMemoryServer.create({
    binary: {
      systemBinary: process.env.MONGODB_BINARY,
      skipMD5: true,
    },
    instance: {
      // storageEngine: 'wiredTiger',
      ...getMMSLaunchTimeout(),
      ...getMMSPort(),
    },
  });

  return mongod;
};
