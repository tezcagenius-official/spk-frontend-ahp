export const rounder = (num: number, rounds: number = 2) =>
  num === 0 ? num : Math.round((num + Number.EPSILON) * 100) / 100;
