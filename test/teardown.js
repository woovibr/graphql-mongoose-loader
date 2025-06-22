module.exports = async () => {
  if (process.env.MONGO_URI_TEST) {
    return;
  }

  if (global.__MONGOD__) {
    await global.__MONGOD__.stop();
  }
};
