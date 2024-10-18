import { OptionType } from '@ssa-ui-kit/widgets';
import getFirebase from './initFirebase';

interface RespOption extends OptionType {
  id: string;
}

export const mealNutrients = {
  async get(timePeriodId: string) {
    if (timePeriodId == null) {
      throw new Error('No id provided');
    }
    const {
      firestore: { db, query, collection, getDocs, orderBy },
    } = await getFirebase();

    const { docs: nutrientDocs } = await getDocs(
      query(collection(db, 'mealNutrients', timePeriodId, 'nutrients')),
    );

    const result = await Promise.all(
      nutrientDocs.map(async (doc) => {
        const id = doc.id;
        const nutrientsDocs = await getDocs(
          query(
            collection(
              db,
              'mealNutrients',
              timePeriodId,
              'nutrients',
              id,
              'data',
            ),
            orderBy('x', 'desc'),
          ),
        );

        const data = nutrientsDocs.docs.map((d) => {
          const nutrientData = d.data();

          nutrientData.x = new Date(nutrientData.x);

          return nutrientData;
        });

        return {
          id,
          data,
        };
      }),
    );

    return result;
  },
  async getOptions() {
    const {
      firestore: { db, query, collection, getDocs, orderBy },
    } = await getFirebase();
    const snapshot = await getDocs(
      query(collection(db, 'mealNutrients'), orderBy('order')),
    );
    return snapshot.docs.map((doc) => {
      const { val, precision } = doc.data();

      return {
        id: doc.id,
        value: doc.id,
        label: val,
        precision,
      } as RespOption;
    });
  },
};
