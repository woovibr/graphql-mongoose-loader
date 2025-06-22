import { vi } from 'vitest';

vi.setConfig({
  testTimeout: 20_000,
});

vi.mock('uuid', () => {
  const base = '9134e286-6f71-427a-bf00-';

  const current = 100000000000;

  const getCurrent = vi.fn();

  const v4 = vi.fn(() => {
    const step = getCurrent.mock.calls.length;

    // call getCurrent to generate step
    getCurrent();

    const uuid = base + (current + step).toString();

    return uuid;
  });

  return {
    default: {
      v4,
    },
    v4,
  }
});

vi.mock('crypto', async () => {
  const crypto = await vi.importActual('node:crypto');

  const Chance = require('chance');

  const chances = {};

  // biome-ignore lint: 
  const randomBytes = vi.fn((size, seed = 42, callback) => {
    if (typeof seed === 'function') {
      // biome-ignore lint: 
      callback = seed;
      seed = 42;
    }

    chances[seed] = chances[seed] || new Chance(seed);
    const chance = chances[seed];

    const randomByteArray = chance.n(chance.natural, size, { max: 255 });

    const buffer = Buffer.from(randomByteArray);

    if (typeof callback === 'function') {
      callback(null, buffer);
    }

    return buffer;
  });

  return {
    default: {
      randomBytes,
    },
    randomBytes,
  };
});