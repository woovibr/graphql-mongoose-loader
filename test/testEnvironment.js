const fs = require('fs');
const { TestEnvironment } = require('jest-environment-node');
const { v4: uuidv4 } = require('uuid');

const { getGlobalConfigPath } = require('./getGlobalConfigPath');

class WooviTestEnvironment extends TestEnvironment {
  constructor({ globalConfig, projectConfig }, context) {
    super({ globalConfig, projectConfig }, context);
  }

  async setup() {
    await super.setup();

    const globalConfigPath = getGlobalConfigPath();

    const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'));

    this.global.__MONGO_URI__ = globalConfig.mongoUri;
    this.global.__MONGO_DB_NAME__ = uuidv4();
    this.global.__MONGO_DB_NAME_ANALYTICS__ = uuidv4();

    this.global.__COUNTERS__ = {};
  }

  async teardown() {
    await super.teardown();
    this.global = {};
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = WooviTestEnvironment;
