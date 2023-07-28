import getFirebase from './initFirebase';
import { ProgressInfoResp, ProgressInfoItemProps } from '@ssa-ui-kit/widgets';

const groupByDate = (data) => {
  const hoursMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const offsetWeek = hoursMilliseconds * 7;
  const offsetMonth = hoursMilliseconds * 30;
  const offsetYear = hoursMilliseconds * 365;

  const today = new Date();
  const offset = {
    weekly: new Date(new Date().setTime(today.getTime() - offsetWeek)),
    monthly: new Date(new Date().setTime(today.getTime() - offsetMonth)),
    yearly: new Date(new Date().setTime(today.getTime() - offsetYear)),
  };

  const dataPeriod = {};

  Object.keys(offset).forEach((period) => {
    dataPeriod[period] = dataPeriod[period] || [];
    dataPeriod[period] = data.filter((item) => {
      const date = new Date(item.date);
      return date > offset[period];
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
    const finalMap = {};

    Object.keys(postsByDate).forEach((period) => {
      finalMap[period] = finalMap[period] || {};
      postsByDate[period].forEach(({ label, ...el }) => {
        finalMap[period][label] = finalMap[period][label] || [];
        finalMap[period][label].push({ ...el, label });
      });
    });

    return finalMap;
  },
};
