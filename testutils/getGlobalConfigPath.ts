import path from 'node:path';

const cwd = process.cwd();

export const getGlobalConfigPath = () => {
  if (process.env.MMS_GLOBAL_CONFIG_PATH) {
    return process.env.MMS_GLOBAL_CONFIG_PATH;
  }

  return path.join(cwd, 'globalConfig.json');
};
