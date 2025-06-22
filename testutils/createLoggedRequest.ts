import { type APIRequestContext, test } from '@playwright/test';

import { timeSpan } from './timeSpan.ts';

export const getBaseUrl = () => {
  const info = test.info();

  const project = info.project.name;

  const currentProject = info.config.projects.find((p) => p.name === project);

  const baseURL = currentProject?.use?.baseURL;

  return baseURL;
};

export function createLoggedRequest(request: APIRequestContext) {
  // Wrap all methods of request
  const methods = ['get', 'post', 'put', 'delete', 'patch', 'head'] as const;

  const baseURL = getBaseUrl();

  // Return a new object that mimics `request` but adds logging
  const loggedRequest = methods.reduce(
    (acc, method) => {
      acc[method] = async (
        url: string,
        options?: Parameters<APIRequestContext[typeof method]>[1],
      ) => {
        const end = timeSpan();

        // eslint-disable-next-line
        console.log(`➡️ [REQUEST] ${method.toUpperCase()} ${baseURL}${url}`);
        if (options?.data) {
          // eslint-disable-next-line
          console.log('Request Body:', JSON.stringify(options.data, null, 2));
        }

        const response = await request[method](url, options);

        const durationTime = end();

        // eslint-disable-next-line
        console.log(
          `⬅️ [RESPONSE] ${response.status()} ${baseURL}${url} (${durationTime}ms)`,
        );
        try {
          const body = await response.json();

          // eslint-disable-next-line
          console.log('Response Body:', JSON.stringify(body, null, 2));
        } catch {
          // eslint-disable-next-line
          console.log('Response could not be parsed as JSON');
        }

        return response;
      };
      return acc;
    },
    {} as Record<string, any>,
  );

  return loggedRequest;
}
