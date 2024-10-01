export const getRoundedNumber = (number: unknown, roundingDigits: number) =>
  Number(Number(number).toFixed(roundingDigits));
