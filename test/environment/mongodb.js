// eslint-disable-next-line import/no-extraneous-dependencies
const NodeEnvironment = require('jest-environment-node');
const { MongoMemoryServer } = require('mongodb-memory-server');

class MongoDbEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    // eslint-disable-next-line new-cap
    this.mongod = new MongoMemoryServer({
      binary: {
        version: 'latest',
      },
    });
  }

  async setup() {
    await super.setup();

    await this.mongod.start();

    this.global.__MONGO_URI__ = this.mongod.getUri();
    this.global.__COUNTERS__ = {
      user: 0,
      group: 0,
    };
  }

  async teardown() {
    await super.teardown();
    await this.mongod.stop();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoDbEnvironment;
