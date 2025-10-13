import { MealPlannerItem } from '@ssa-ui-kit/widgets';

import { MealPlannerResp } from '../../types';

import getFirebase from './initFirebase';

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
