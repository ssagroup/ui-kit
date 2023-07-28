import getFirebase from './initFirebase';
import { ActivityItemProps, ActivityResp } from '@ssa-ui-kit/widgets';

export const activity = {
  async getActivities(): Promise<ActivityResp> {
    const {
      firestore: { db, query, collection, getDocs },
    } = await getFirebase();
    const posts: { [key: string]: ActivityItemProps[] } = {};

    await getDocs(query(collection(db, 'activity'))).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { activity, currentValue, max, date } =
          doc.data() as ActivityItemProps;

        posts[activity] = posts[activity] || [];
        posts[activity].push({
          id: doc.id,
          currentValue,
          max,
          date,
          activity,
        });
      });
    });

    Object.keys(posts).forEach((key) =>
      posts[key].sort(
        (a, b) => new Date(a.date).getDay() - new Date(b.date).getDay(),
      ),
    );

    return posts;
  },
};
