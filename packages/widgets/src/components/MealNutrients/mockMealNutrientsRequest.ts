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

const FIRST_DATE = 1692799200000;

const createMockGraphData = (firstDate: number) => ({
  d: [
    {
      data: [
        {
          comp: -40,
          unit: '%',
          x: new Date(firstDate),
          y: 63,
        },
        {
          comp: 66,
          unit: '%',
          x: new Date(1692802800000),
          y: 32,
        },
        {
          comp: 11,
          unit: '%',
          x: new Date(1692806400000),
          y: 2,
        },
        {
          comp: 49,
          unit: '%',
          x: new Date(1692810000000),
          y: 38,
        },
        {
          comp: 25,
          unit: '%',
          x: new Date(1692813600000),
          y: 46,
        },
        {
          comp: -34,
          unit: '%',
          x: new Date(1692817200000),
          y: 42,
        },
        {
          comp: -3,
          unit: '%',
          x: new Date(1692820800000),
          y: 33,
        },
        {
          comp: 67,
          unit: '%',
          x: new Date(1692824400000),
          y: 78,
        },
        {
          comp: -85,
          unit: '%',
          x: new Date(1692828000000),
          y: 24,
        },
        {
          comp: 66,
          unit: '%',
          x: new Date(1692831600000),
          y: 43,
        },
        {
          comp: 31,
          unit: '%',
          x: new Date(1692835200000),
          y: 31,
        },
        {
          comp: -43,
          unit: '%',
          x: new Date(1692838800000),
          y: 30,
        },
        {
          comp: -77,
          unit: '%',
          x: new Date(1692842400000),
          y: 70,
        },
        {
          comp: -65,
          unit: '%',
          x: new Date(1692846000000),
          y: 61,
        },
        {
          comp: 76,
          unit: '%',
          x: new Date(1692849600000),
          y: 91,
        },
        {
          comp: 5,
          unit: '%',
          x: new Date(1692853200000),
          y: 34,
        },
        {
          comp: 60,
          unit: '%',
          x: new Date(1692856800000),
          y: 89,
        },
        {
          comp: 9,
          unit: '%',
          x: new Date(1692860400000),
          y: 26,
        },
        {
          comp: 65,
          unit: '%',
          x: new Date(1692864000000),
          y: 8,
        },
        {
          comp: -75,
          unit: '%',
          x: new Date(1692867600000),
          y: 53,
        },
        {
          comp: -52,
          unit: '%',
          x: new Date(1692871200000),
          y: 80,
        },
        {
          comp: -42,
          unit: '%',
          x: new Date(1692874800000),
          y: 23,
        },
        {
          comp: 63,
          unit: '%',
          x: new Date(1692878400000),
          y: 83,
        },
        {
          comp: 79,
          unit: '%',
          x: new Date(1692882000000),
          y: 37,
        },
      ],
      id: 'fibre',
    },
    {
      data: [
        {
          comp: 99,
          unit: '%',
          x: new Date(firstDate),
          y: 65,
        },
        {
          comp: 15,
          unit: '%',
          x: new Date(1692802800000),
          y: 54,
        },
        {
          comp: 8,
          unit: '%',
          x: new Date(1692806400000),
          y: 31,
        },
        {
          comp: -75,
          unit: '%',
          x: new Date(1692810000000),
          y: 24,
        },
        {
          comp: 58,
          unit: '%',
          x: new Date(1692813600000),
          y: 94,
        },
        {
          comp: -50,
          unit: '%',
          x: new Date(1692817200000),
          y: 33,
        },
        {
          comp: 27,
          unit: '%',
          x: new Date(1692820800000),
          y: 35,
        },
        {
          comp: -46,
          unit: '%',
          x: new Date(1692824400000),
          y: 94,
        },
        {
          comp: 30,
          unit: '%',
          x: new Date(1692828000000),
          y: 95,
        },
        {
          comp: 63,
          unit: '%',
          x: new Date(1692831600000),
          y: 91,
        },
        {
          comp: -89,
          unit: '%',
          x: new Date(1692835200000),
          y: 95,
        },
        {
          comp: 92,
          unit: '%',
          x: new Date(1692838800000),
          y: 9,
        },
        {
          comp: 30,
          unit: '%',
          x: new Date(1692842400000),
          y: 86,
        },
        {
          comp: 39,
          unit: '%',
          x: new Date(1692846000000),
          y: 2,
        },
        {
          comp: -44,
          unit: '%',
          x: new Date(1692849600000),
          y: 22,
        },
        {
          comp: -98,
          unit: '%',
          x: new Date(1692853200000),
          y: 91,
        },
        {
          comp: 32,
          unit: '%',
          x: new Date(1692856800000),
          y: 93,
        },
        {
          comp: -80,
          unit: '%',
          x: new Date(1692860400000),
          y: 80,
        },
        {
          comp: 63,
          unit: '%',
          x: new Date(1692864000000),
          y: 85,
        },
        {
          comp: 51,
          unit: '%',
          x: new Date(1692867600000),
          y: 53,
        },
        {
          comp: 37,
          unit: '%',
          x: new Date(1692871200000),
          y: 92,
        },
        {
          comp: 80,
          unit: '%',
          x: new Date(1692874800000),
          y: 41,
        },
        {
          comp: 43,
          unit: '%',
          x: new Date(1692878400000),
          y: 86,
        },
        {
          comp: 61,
          unit: '%',
          x: new Date(1692882000000),
          y: 83,
        },
      ],
      id: 'calories',
    },
    {
      data: [
        {
          comp: 70,
          unit: '%',
          x: new Date(firstDate),
          y: 23,
        },
        {
          comp: -59,
          unit: '%',
          x: new Date(1692802800000),
          y: 24,
        },
        {
          comp: 6,
          unit: '%',
          x: new Date(1692806400000),
          y: 32,
        },
        {
          comp: -73,
          unit: '%',
          x: new Date(1692810000000),
          y: 76,
        },
        {
          comp: -76,
          unit: '%',
          x: new Date(1692813600000),
          y: 86,
        },
        {
          comp: 4,
          unit: '%',
          x: new Date(1692817200000),
          y: 37,
        },
        {
          comp: 13,
          unit: '%',
          x: new Date(1692820800000),
          y: 45,
        },
        {
          comp: 27,
          unit: '%',
          x: new Date(1692824400000),
          y: 39,
        },
        {
          comp: -26,
          unit: '%',
          x: new Date(1692828000000),
          y: 92,
        },
        {
          comp: 56,
          unit: '%',
          x: new Date(1692831600000),
          y: 94,
        },
        {
          comp: 26,
          unit: '%',
          x: new Date(1692835200000),
          y: 78,
        },
        {
          comp: 84,
          unit: '%',
          x: new Date(1692838800000),
          y: 37,
        },
        {
          comp: 2,
          unit: '%',
          x: new Date(1692842400000),
          y: 93,
        },
        {
          comp: -49,
          unit: '%',
          x: new Date(1692846000000),
          y: 5,
        },
        {
          comp: -81,
          unit: '%',
          x: new Date(1692849600000),
          y: 62,
        },
        {
          comp: 37,
          unit: '%',
          x: new Date(1692853200000),
          y: 16,
        },
        {
          comp: -29,
          unit: '%',
          x: new Date(1692856800000),
          y: 93,
        },
        {
          comp: -43,
          unit: '%',
          x: new Date(1692860400000),
          y: 88,
        },
        {
          comp: -31,
          unit: '%',
          x: new Date(1692864000000),
          y: 18,
        },
        {
          comp: 60,
          unit: '%',
          x: new Date(1692867600000),
          y: 42,
        },
        {
          comp: -94,
          unit: '%',
          x: new Date(1692871200000),
          y: 70,
        },
        {
          comp: -23,
          unit: '%',
          x: new Date(1692874800000),
          y: 12,
        },
        {
          comp: 24,
          unit: '%',
          x: new Date(1692878400000),
          y: 32,
        },
        {
          comp: -69,
          unit: '%',
          x: new Date(1692882000000),
          y: 11,
        },
      ],
      id: 'sugar',
    },
  ],
  m: [
    {
      data: [
        {
          comp: -9,
          unit: '%',
          x: new Date(1690318800000),
          y: 59,
        },
        {
          comp: -51,
          unit: '%',
          x: new Date(1690405200000),
          y: 28,
        },
        {
          comp: -5,
          unit: '%',
          x: new Date(1690491600000),
          y: 47,
        },
        {
          comp: -40,
          unit: '%',
          x: new Date(1690578000000),
          y: 90,
        },
        {
          comp: -3,
          unit: '%',
          x: new Date(1690664400000),
          y: 84,
        },
        {
          comp: 32,
          unit: '%',
          x: new Date(1690750800000),
          y: 53,
        },
        {
          comp: 57,
          unit: '%',
          x: new Date(1690837200000),
          y: 47,
        },
        {
          comp: 5,
          unit: '%',
          x: new Date(1690923600000),
          y: 54,
        },
        {
          comp: -12,
          unit: '%',
          x: new Date(1691010000000),
          y: 40,
        },
        {
          comp: 44,
          unit: '%',
          x: new Date(1691096400000),
          y: 5,
        },
        {
          comp: -100,
          unit: '%',
          x: new Date(1691182800000),
          y: 32,
        },
        {
          comp: -94,
          unit: '%',
          x: new Date(1691269200000),
          y: 43,
        },
        {
          comp: 12,
          unit: '%',
          x: new Date(1691355600000),
          y: 70,
        },
        {
          comp: -42,
          unit: '%',
          x: new Date(1691442000000),
          y: 89,
        },
        {
          comp: -7,
          unit: '%',
          x: new Date(1691528400000),
          y: 39,
        },
        {
          comp: -34,
          unit: '%',
          x: new Date(1691614800000),
          y: 42,
        },
        {
          comp: -70,
          unit: '%',
          x: new Date(1691701200000),
          y: 69,
        },
        {
          comp: -97,
          unit: '%',
          x: new Date(1691787600000),
          y: 8,
        },
        {
          comp: 96,
          unit: '%',
          x: new Date(1691874000000),
          y: 78,
        },
        {
          comp: -6,
          unit: '%',
          x: new Date(1691960400000),
          y: 25,
        },
        {
          comp: -86,
          unit: '%',
          x: new Date(1692046800000),
          y: 63,
        },
        {
          comp: 46,
          unit: '%',
          x: new Date(1692133200000),
          y: 81,
        },
        {
          comp: -7,
          unit: '%',
          x: new Date(1692219600000),
          y: 50,
        },
        {
          comp: 22,
          unit: '%',
          x: new Date(1692306000000),
          y: 57,
        },
        {
          comp: 14,
          unit: '%',
          x: new Date(1692392400000),
          y: 61,
        },
        {
          comp: -61,
          unit: '%',
          x: new Date(1692478800000),
          y: 87,
        },
        {
          comp: 81,
          unit: '%',
          x: new Date(1692565200000),
          y: 11,
        },
        {
          comp: -56,
          unit: '%',
          x: new Date(1692651600000),
          y: 73,
        },
        {
          comp: 74,
          unit: '%',
          x: new Date(1692738000000),
          y: 47,
        },
        {
          comp: 94,
          unit: '%',
          x: new Date(1692824400000),
          y: 42,
        },
      ],
      id: 'fibre',
    },
    {
      data: [
        {
          comp: 62,
          unit: '%',
          x: new Date(1690318800000),
          y: 42,
        },
        {
          comp: -29,
          unit: '%',
          x: new Date(1690405200000),
          y: 67,
        },
        {
          comp: -90,
          unit: '%',
          x: new Date(1690491600000),
          y: 52,
        },
        {
          comp: -53,
          unit: '%',
          x: new Date(1690578000000),
          y: 48,
        },
        {
          comp: -38,
          unit: '%',
          x: new Date(1690664400000),
          y: 88,
        },
        {
          comp: -70,
          unit: '%',
          x: new Date(1690750800000),
          y: 94,
        },
        {
          comp: -78,
          unit: '%',
          x: new Date(1690837200000),
          y: 76,
        },
        {
          comp: -40,
          unit: '%',
          x: new Date(1690923600000),
          y: 77,
        },
        {
          comp: -31,
          unit: '%',
          x: new Date(1691010000000),
          y: 21,
        },
        {
          comp: -36,
          unit: '%',
          x: new Date(1691096400000),
          y: 21,
        },
        {
          comp: -45,
          unit: '%',
          x: new Date(1691182800000),
          y: 89,
        },
        {
          comp: 13,
          unit: '%',
          x: new Date(1691269200000),
          y: 88,
        },
        {
          comp: -75,
          unit: '%',
          x: new Date(1691355600000),
          y: 92,
        },
        {
          comp: 28,
          unit: '%',
          x: new Date(1691442000000),
          y: 91,
        },
        {
          comp: 92,
          unit: '%',
          x: new Date(1691528400000),
          y: 94,
        },
        {
          comp: -41,
          unit: '%',
          x: new Date(1691614800000),
          y: 47,
        },
        {
          comp: 58,
          unit: '%',
          x: new Date(1691701200000),
          y: 89,
        },
        {
          comp: 42,
          unit: '%',
          x: new Date(1691787600000),
          y: 63,
        },
        {
          comp: 72,
          unit: '%',
          x: new Date(1691874000000),
          y: 56,
        },
        {
          comp: -82,
          unit: '%',
          x: new Date(1691960400000),
          y: 83,
        },
        {
          comp: -100,
          unit: '%',
          x: new Date(1692046800000),
          y: 8,
        },
        {
          comp: 40,
          unit: '%',
          x: new Date(1692133200000),
          y: 51,
        },
        {
          comp: 34,
          unit: '%',
          x: new Date(1692219600000),
          y: 38,
        },
        {
          comp: 55,
          unit: '%',
          x: new Date(1692306000000),
          y: 36,
        },
        {
          comp: -85,
          unit: '%',
          x: new Date(1692392400000),
          y: 19,
        },
        {
          comp: 35,
          unit: '%',
          x: new Date(1692478800000),
          y: 46,
        },
        {
          comp: 65,
          unit: '%',
          x: new Date(1692565200000),
          y: 95,
        },
        {
          comp: 81,
          unit: '%',
          x: new Date(1692651600000),
          y: 67,
        },
        {
          comp: 77,
          unit: '%',
          x: new Date(1692738000000),
          y: 64,
        },
        {
          comp: -79,
          unit: '%',
          x: new Date(1692824400000),
          y: 72,
        },
      ],
      id: 'calories',
    },
    {
      data: [
        {
          comp: -36,
          unit: '%',
          x: new Date(1690318800000),
          y: 6,
        },
        {
          comp: 90,
          unit: '%',
          x: new Date(1690405200000),
          y: 42,
        },
        {
          comp: -6,
          unit: '%',
          x: new Date(1690491600000),
          y: 76,
        },
        {
          comp: 64,
          unit: '%',
          x: new Date(1690578000000),
          y: 78,
        },
        {
          comp: 47,
          unit: '%',
          x: new Date(1690664400000),
          y: 30,
        },
        {
          comp: -62,
          unit: '%',
          x: new Date(1690750800000),
          y: 95,
        },
        {
          comp: -37,
          unit: '%',
          x: new Date(1690837200000),
          y: 61,
        },
        {
          comp: -36,
          unit: '%',
          x: new Date(1690923600000),
          y: 31,
        },
        {
          comp: 63,
          unit: '%',
          x: new Date(1691010000000),
          y: 37,
        },
        {
          comp: -61,
          unit: '%',
          x: new Date(1691096400000),
          y: 17,
        },
        {
          comp: 28,
          unit: '%',
          x: new Date(1691182800000),
          y: 20,
        },
        {
          comp: -94,
          unit: '%',
          x: new Date(1691269200000),
          y: 91,
        },
        {
          comp: -10,
          unit: '%',
          x: new Date(1691355600000),
          y: 15,
        },
        {
          comp: -55,
          unit: '%',
          x: new Date(1691442000000),
          y: 82,
        },
        {
          comp: -29,
          unit: '%',
          x: new Date(1691528400000),
          y: 34,
        },
        {
          comp: 80,
          unit: '%',
          x: new Date(1691614800000),
          y: 83,
        },
        {
          comp: -83,
          unit: '%',
          x: new Date(1691701200000),
          y: 47,
        },
        {
          comp: 0,
          unit: '%',
          x: new Date(1691787600000),
          y: 52,
        },
        {
          comp: 2,
          unit: '%',
          x: new Date(1691874000000),
          y: 74,
        },
        {
          comp: -8,
          unit: '%',
          x: new Date(1691960400000),
          y: 27,
        },
        {
          comp: 41,
          unit: '%',
          x: new Date(1692046800000),
          y: 50,
        },
        {
          comp: -50,
          unit: '%',
          x: new Date(1692133200000),
          y: 21,
        },
        {
          comp: 29,
          unit: '%',
          x: new Date(1692219600000),
          y: 55,
        },
        {
          comp: 17,
          unit: '%',
          x: new Date(1692306000000),
          y: 89,
        },
        {
          comp: 48,
          unit: '%',
          x: new Date(1692392400000),
          y: 79,
        },
        {
          comp: -43,
          unit: '%',
          x: new Date(1692478800000),
          y: 2,
        },
        {
          comp: 38,
          unit: '%',
          x: new Date(1692565200000),
          y: 65,
        },
        {
          comp: -77,
          unit: '%',
          x: new Date(1692651600000),
          y: 85,
        },
        {
          comp: -55,
          unit: '%',
          x: new Date(1692738000000),
          y: 24,
        },
        {
          comp: -31,
          unit: '%',
          x: new Date(1692824400000),
          y: 45,
        },
      ],
      id: 'sugar',
    },
  ],
  w: [
    {
      data: [
        {
          comp: 33,
          unit: '%',
          x: new Date(1692306000000),
          y: 78,
        },
        {
          comp: -33,
          unit: '%',
          x: new Date(1692392400000),
          y: 87,
        },
        {
          comp: -47,
          unit: '%',
          x: new Date(1692478800000),
          y: 27,
        },
        {
          comp: -20,
          unit: '%',
          x: new Date(1692565200000),
          y: 83,
        },
        {
          comp: -17,
          unit: '%',
          x: new Date(1692651600000),
          y: 87,
        },
        {
          comp: 97,
          unit: '%',
          x: new Date(1692738000000),
          y: 42,
        },
        {
          comp: -89,
          unit: '%',
          x: new Date(1692824400000),
          y: 54,
        },
      ],
      id: 'fibre',
    },
    {
      data: [
        {
          comp: 65,
          unit: '%',
          x: new Date(1692306000000),
          y: 71,
        },
        {
          comp: -16,
          unit: '%',
          x: new Date(1692392400000),
          y: 74,
        },
        {
          comp: 31,
          unit: '%',
          x: new Date(1692478800000),
          y: 43,
        },
        {
          comp: 45,
          unit: '%',
          x: new Date(1692565200000),
          y: 71,
        },
        {
          comp: 17,
          unit: '%',
          x: new Date(1692651600000),
          y: 85,
        },
        {
          comp: -99,
          unit: '%',
          x: new Date(1692738000000),
          y: 13,
        },
        {
          comp: -6,
          unit: '%',
          x: new Date(1692824400000),
          y: 26,
        },
      ],
      id: 'calories',
    },
    {
      data: [
        {
          comp: -71,
          unit: '%',
          x: new Date(1692306000000),
          y: 1,
        },
        {
          comp: 91,
          unit: '%',
          x: new Date(1692392400000),
          y: 7,
        },
        {
          comp: 3,
          unit: '%',
          x: new Date(1692478800000),
          y: 24,
        },
        {
          comp: 92,
          unit: '%',
          x: new Date(1692565200000),
          y: 31,
        },
        {
          comp: 55,
          unit: '%',
          x: new Date(1692651600000),
          y: 36,
        },
        {
          comp: -21,
          unit: '%',
          x: new Date(1692738000000),
          y: 89,
        },
        {
          comp: -24,
          unit: '%',
          x: new Date(1692824400000),
          y: 27,
        },
      ],
      id: 'sugar',
    },
  ],
});

const getMockGraphData = (timePeriodId: 'd' | 'm' | 'w') => {
  const firstDate = FIRST_DATE + Math.floor(Math.random() * 3600);
  const mockGraphData = createMockGraphData(firstDate);
  return [...mockGraphData[timePeriodId]];
};

export const mockStaticApi = {
  getData(timePeriodId: 'd' | 'm' | 'w') {
    const res = getMockGraphData(timePeriodId);
    if (!res) {
      return Promise.resolve([]);
    }

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
