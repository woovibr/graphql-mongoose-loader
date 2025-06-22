import { readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import type { Environment } from 'vitest/environments'

import { getGlobalConfigPath } from './getGlobalConfigPath';

const globalConfigPath = getGlobalConfigPath();

// Read and parse the global configuration
const globalConfig = JSON.parse(readFileSync(globalConfigPath, 'utf-8'));

export default <Environment>{
  name: 'woovi-environment',
  transformMode: 'ssr',
  setup(global) {
    global.__MONGO_URI__ = globalConfig.mongoUri;
    global.__MONGO_DB_NAME__ = uuidv4();
    global.__MONGO_DB_NAME_ANALYTICS__ = uuidv4();
    global.__COUNTERS__ = {};

    return {
      teardown() {
        // Cleanup globals during teardown
        delete global.__MONGO_URI__;
        delete global.__MONGO_DB_NAME__;
        delete global.__MONGO_DB_NAME_ANALYTICS__;
        delete global.__COUNTERS__;
      }
    };
  },
};
