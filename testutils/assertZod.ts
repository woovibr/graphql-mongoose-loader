import { expect } from '@playwright/test';
import type { ZodType } from 'zod/lib/types';

import { printZodError } from './printZodError';

export const assertZod = (schema: ZodType, data: unknown) => {
  const validationResult = schema.safeParse(data);

  if (!validationResult.success) {
    printZodError(validationResult);
  }

  try {
    expect(validationResult.success).toBeTruthy();
  } catch (error) {
    Error.captureStackTrace(error as Error, assertZod);

    throw error;
  }
};
