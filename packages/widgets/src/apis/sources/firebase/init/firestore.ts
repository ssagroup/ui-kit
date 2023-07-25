import { getFirestore } from 'firebase/firestore';
import { app } from './app';

export {
  query,
  collection,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore';

export const db = getFirestore(app);
