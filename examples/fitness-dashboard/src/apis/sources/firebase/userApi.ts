import getFirebase from './initFirebase';
import { User } from '../../types';

export const user = {
  async get(): Promise<User | null> {
    const {
      firestore: { db, doc, getDoc },
    } = await getFirebase();
    const user = await getDoc(doc(db, 'user', 'P4zpkqdkYmloXXrhDo1d'));

    if (user.exists()) {
      return {
        id: user.id,
        ...user.data(),
      } as User;
    }
    return null;
  },
};
