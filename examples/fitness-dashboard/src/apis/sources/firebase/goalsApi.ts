import { Goal } from '@ssa-ui-kit/widgets';
import getFirebase from './initFirebase';

export const goals = {
  async get() {
    const {
      firestore: { db, query, collection, getDocs, orderBy },
    } = await getFirebase();
    const { docs } = await getDocs(
      query(collection(db, 'goals'), orderBy('order')),
    );

    return docs.map((d) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { order, ...data } = d.data();
      return {
        id: d.id,
        ...data,
      } as Goal;
    });
  },
};
