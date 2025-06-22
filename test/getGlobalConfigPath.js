import path from 'path';

const cwd = process.cwd();

export const getGlobalConfigPath = (vitest = false) => {
  if (process.env.MMS_GLOBAL_CONFIG_PATH) {
    return process.env.MMS_GLOBAL_CONFIG_PATH;
  }

  const getName = () => {
    if (vitest) {
      return 'globalConfig.vitest.json';
    }

    return 'globalConfig.json';
  };

  const globalConfigPath = path.join(cwd, getName());

  return globalConfigPath;
};
