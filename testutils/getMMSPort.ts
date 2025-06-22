export const getMMSPort = () => {
  if (process.env.MMS_PORT) {
    return {
      port: Number.parseInt(process.env.MMS_PORT),
    };
  }

  return {};
};
