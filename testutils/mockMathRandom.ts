import Chance from 'chance';

const chances: { [key: string]: Chance } = {};

export const mockMathRandom = () => {
  const mockMath = Object.create(Math);

  mockMath.random = (seed = 42) => {
    chances[seed] = chances[seed] || new Chance(seed);
    const chance = chances[seed];

    return chance.random();
  };

  global.Math = mockMath;
}