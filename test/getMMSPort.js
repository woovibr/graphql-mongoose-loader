export const getMMSPort = () => {
  if (process.env.MMS_PORT) {
    return {
      port: parseInt(process.env.MMS_PORT),
    };
  }

  return {};
};
