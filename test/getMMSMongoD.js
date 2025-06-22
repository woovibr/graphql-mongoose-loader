import { getMMSLaunchTimeout } from './getMMSLaunchTimeout';
import { getMMSPort } from './getMMSPort';

const MMS = require('mongodb-memory-server-global');

const { MongoMemoryServer, MongoMemoryReplSet } = MMS;

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
