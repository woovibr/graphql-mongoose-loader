const fs = require('fs');

const { getGlobalConfigPath } = require('./getGlobalConfigPath');
const { getMMSMongoD } = require('./getMMSMongoD');

module.exports = async () => {
  const globalConfigPath = getGlobalConfigPath();

  console.log('globalConfigPath', globalConfigPath);

  if (process.env.MONGO_URI_TEST) {
    const mongoConfig = {
      mongoUri: process.env.MONGO_URI_TEST,
    };

    // save mongo uri to be reused in each test
    fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

    return;
  }

  const mongod = await getMMSMongoD();

  const mongoConfig = {
    mongoUri: mongod.getUri(),
  };

  // save mongo uri to be reused in each test
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  global.__MONGOD__ = mongod;
};
