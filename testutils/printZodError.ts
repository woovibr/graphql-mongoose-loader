import type { SafeParseReturnType } from 'zod/lib/types';

export const printZodError = (result: SafeParseReturnType<any, any>) => {
  // eslint-disable-next-line
  console.log(result.error.format());

  // eslint-disable-next-line
  console.log({
    errors: result.error.issues.map(
      (issue) => `${issue.message} - [${issue.path}]`,
    ),
  });
};
