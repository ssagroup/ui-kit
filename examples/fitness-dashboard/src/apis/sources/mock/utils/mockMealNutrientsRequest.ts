const ONE_DAY_MS = 86400000;
const ONE_HOUR_MS = 3600000;

const getRandomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomDataRange = (n = 7, period = ONE_DAY_MS) => {
  const data: Array<{ x: Date; y: number; comp: number; unit?: string }> = [];
  const now = Date.now();

  for (let i = 0; i < n; ++i) {
    data.push({
      x: new Date(now - period * (n - i - 1)),
      y: getRandomNum(0, 95),
      comp: getRandomNum(-100, 100),
      unit: '%',
    });
  }

  return data;
};

const randomGeneratorArgsMapping = {
  d: [24, ONE_HOUR_MS], // Daily
  w: [7, ONE_DAY_MS], // Weekly
  m: [30, ONE_DAY_MS], // Monthly
};

const mockDataLoad = {
  getData(timePeriodId: string) {
    const args =
      randomGeneratorArgsMapping[
        timePeriodId as keyof typeof randomGeneratorArgsMapping
      ];

    if (!args) {
      return Promise.resolve([]);
    }

    const res = [
      {
        id: 'fibre',
        data: generateRandomDataRange(...args),
      },
      {
        id: 'calories',
        data: generateRandomDataRange(...args),
      },
      {
        id: 'sugar',
        data: generateRandomDataRange(...args),
      },
    ];

    return Promise.resolve(res);
  },
  getOptions() {
    return Promise.resolve([
      { value: 'd', label: 'Daily', precision: 'hour' },
      { value: 'w', label: 'Weekly', precision: 'week' },
      { value: 'm', label: 'Monthly', precision: 'day' },
    ]);
  },
};

export default mockDataLoad;
