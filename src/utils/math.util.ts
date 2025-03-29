export const rounder = (num: number) =>
    num === 0 ? num : Math.round((num + Number.EPSILON) * 100) / 100;
