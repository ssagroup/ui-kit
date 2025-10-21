import { User } from '@ssa-ui-kit/widgets';

import getFirebase from './initFirebase';

export const user = {
  async get(): Promise<User | null> {
    const {
      firestore: { db, doc, getDoc },
    } = await getFirebase();
    // cspell:disable-next-line
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
