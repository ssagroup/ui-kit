import getFirebase from './initFirebase';
import { TopWidgetsResp } from '../../types';

export const topWidgets = {
  async get(): Promise<TopWidgetsResp> {
    const {
      firestore: { db, query, collection, getDocs },
    } = await getFirebase();
    const { docs } = await getDocs(query(collection(db, 'topWidgets')));

    return docs.reduce((res, doc) => {
      const docId = doc.id;
      res[docId] = doc.data();
      return res;
    }, {} as TopWidgetsResp);
  },
};
