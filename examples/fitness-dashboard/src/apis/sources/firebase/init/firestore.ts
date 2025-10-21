import { getFirestore } from 'firebase/firestore';

import { app } from './app';

export {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';

export const db = getFirestore(app);
