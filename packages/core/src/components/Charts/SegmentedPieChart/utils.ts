export const getRoundedNumber = (number: unknown, roundingDigits: number) =>
  Number(Number(number).toFixed(roundingDigits));

export const getFixedNumber = (number: unknown, roundingDigits: number) =>
  Number(number).toFixed(roundingDigits);
