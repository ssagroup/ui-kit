import { MealPlannerItem } from '@ssa-ui-kit/widgets';
import getFirebase from './initFirebase';
import { MealPlannerResp } from '../../types';

export const mealPlanner = {
  async get() {
    const {
      firestore: { db, query, collection, getDocs },
    } = await getFirebase();
    const { docs } = await getDocs(query(collection(db, 'mealPlanner')));

    return docs.reduce((res, doc) => {
      const docId = doc.id;
      res[docId] = doc.data() as MealPlannerItem;
      return res;
    }, {} as MealPlannerResp);
  },
};
