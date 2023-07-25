import { progressInfoData } from './utils/mockProgressInfoRequest';

export const progress = {
  getProgress() {
    return Promise.resolve(progressInfoData);
  },
};
