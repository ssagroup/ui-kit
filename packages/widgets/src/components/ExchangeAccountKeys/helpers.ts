const secretKey = '1234567890';

export const getMockData = () => {
  return new Promise<string>((resolve) => {
    resolve(secretKey);
  });
};
