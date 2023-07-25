import getFirebase from './initFirebase';
import { MealPlannerItem } from '@components/MealPlanner/types';
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
