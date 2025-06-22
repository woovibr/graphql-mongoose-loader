module.exports = {
  displayName: 'test',
  testPathIgnorePatterns: ['/node_modules/', './lib', './scripts'],
  coverageReporters: ['lcov', 'html'],
  resetModules: false,
  reporters: ['default'],
  transform: {
    '^.+\\.(js|ts)?$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)?$',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: '<rootDir>/test/testEnvironment.js',
  globalSetup: '<rootDir>/test/setup.js',
  globalTeardown: '<rootDir>/test/teardown.js',
  setupFilesAfterEnv: [
    '<rootDir>/test/setupFilesAfterEnv.js',
  ],
  setupFiles: ['<rootDir>/test/setupFiles.js'],
};
