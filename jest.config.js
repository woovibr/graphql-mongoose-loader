module.exports = {
  displayName: 'test',
  testEnvironment: '<rootDir>/test/environment/mongodb',
  testPathIgnorePatterns: ['/node_modules/', './lib', './scripts'],
  coverageReporters: ['lcov', 'html'],
  resetModules: false,
  transform: {
    '^.+\\.js?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.ts?$': '<rootDir>/node_modules/babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
  moduleFileExtensions: ['ts', 'js'],
};
