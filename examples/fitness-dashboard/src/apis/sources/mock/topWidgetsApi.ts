import { TopWidgetsResp } from '../../types';
import { heartRateData } from './utils/mockHeartRateRequest';

export const topWidgets = {
  get(): Promise<TopWidgetsResp> {
    return Promise.resolve({
      steps: {
        current: 2500,
        max: 3000,
        unit: 'L',
      },
      water: {
        current: 2500,
        max: 3000,
        steps: [
          {
            title: '1500ml',
            caption: '11am - 2pm',
            done: false,
          },
          {
            title: '500ml',
            caption: '11am - 2pm',
            done: false,
          },
          {
            title: '1000ml',
            caption: '9am - 11am',
            done: true,
          },
          {
            title: '700ml',
            caption: '6am - 0am',
            done: true,
          },
        ],
      },
      calories: {
        current: 70,
        max: 100,
      },
      heartRate: heartRateData,
    });
  },
};
