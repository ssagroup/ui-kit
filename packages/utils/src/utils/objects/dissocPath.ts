export const dissocPath =
  <T>(path: string[]) =>
  (sourceObject: T): T => {
    const resultObject = JSON.parse(JSON.stringify(sourceObject));

    path.reduce((acc: any, key, index) => {
      if (index === path.length - 1) {
        delete acc[key];
      }
      return acc[key];
    }, resultObject);

    return resultObject;
  };
