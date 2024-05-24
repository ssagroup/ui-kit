import getFirebase from './initFirebase';
import { Workout } from '@ssa-ui-kit/widgets';

export const workouts = {
  async get() {
    const {
      firestore: { db, query, collection, getDocs },
    } = await getFirebase();
    const { docs } = await getDocs(query(collection(db, 'workouts')));

    return docs.map(
      (d) =>
        ({
          id: d.id,
          ...d.data(),
        }) as Workout,
    );
  },
};
