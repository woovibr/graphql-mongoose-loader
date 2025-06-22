export const getMMSLaunchTimeout = () => {
  if (process.env.MMS_LAUNCH_TIMEOUT) {
    return {
      launchTimeout: parseInt(process.env.MMS_LAUNCH_TIMEOUT),
    };
  }

  return {};
};
