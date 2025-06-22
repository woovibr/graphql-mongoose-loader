export const getMMSLaunchTimeout = () => {
  if (process.env.MMS_LAUNCH_TIMEOUT) {
    return {
      launchTimeout: Number.parseInt(process.env.MMS_LAUNCH_TIMEOUT),
    };
  }

  return {};
};
