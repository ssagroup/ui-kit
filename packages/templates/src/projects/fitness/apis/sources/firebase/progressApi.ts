import {
  ProgressInfoResp,
  ProgressInfoItemProps,
  Period,
} from '@ssa-ui-kit/core';
import getFirebase from './initFirebase';

type DatePeriod = Record<Period, Array<ProgressInfoItemProps>>;

const groupByDate = (data: Array<ProgressInfoItemProps>) => {
  const minDate = new Date('2023-02-17T00:00:00.000Z').getTime();
  const hoursMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const offsetWeek = hoursMilliseconds * 7;
  const offsetMonth = hoursMilliseconds * 30;
  const offsetYear = hoursMilliseconds * 365;

  const offset: Record<Period, Date> = {
    daily: new Date(new Date().setTime(minDate + hoursMilliseconds)),
    weekly: new Date(new Date().setTime(minDate + offsetWeek)),
    monthly: new Date(new Date().setTime(minDate + offsetMonth)),
    yearly: new Date(new Date().setTime(minDate + offsetYear)),
  };

  const dataPeriod: DatePeriod = {} as DatePeriod;

  (Object.keys(offset) as Array<Period>).forEach((period) => {
    dataPeriod[period] = data.filter((item) => {
      const date = new Date(item.date);
      return date < offset[period];
    });
  });

  return dataPeriod;
};

export const progress = {
  async getProgress(): Promise<ProgressInfoResp> {
    const {
      firestore: { db, query, collection, getDocs },
    } = await getFirebase();
    const posts: ProgressInfoItemProps[] = [];

    await getDocs(query(collection(db, 'progress'))).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        const id = doc.id;
        const { color, colorTag, date, label, value } = doc.data();

        posts.push({ id, label, color, colorTag, date, value });
      });
    });

    const postsByDate = groupByDate(posts);
    const finalMap: ProgressInfoResp = {};

    (Object.keys(postsByDate) as Array<Period>).forEach((period) => {
      finalMap[period] = finalMap[period] || {};
      postsByDate[period].forEach(({ label, ...el }) => {
        finalMap[period][label] = finalMap[period][label] || [];
        finalMap[period][label].push({ ...el, label });
      });
    });

    return finalMap;
  },
};
