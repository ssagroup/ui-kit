#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

const path = require('path');
const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  query,
  collection,
  getDocs,
  addDoc,
  orderBy,
} = require('firebase/firestore');

const jsonDirPath = process.argv[2];

const dotenv = require('dotenv');
dotenv.config();

const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
  appId: process.env.FIREBASE_APP_ID,
});

const db = getFirestore(app);

(async function insert() {
  const snapshot = await getDocs(
    query(collection(db, 'mealNutrients'), orderBy('order')),
  );
  const ids = snapshot.docs.map((doc) => doc.id);

  const importData = async (json, collectionId) => {
    for (const nutrient of json) {
      const nutrientId = nutrient.id;
      const entries = nutrient.data;

      const collectionName = `mealNutrients/${collectionId}/nutrients/${nutrientId}/data`;
      const collectionRef = collection(db, collectionName);

      for (const entry of entries) {
        /**
         * Don't forget to enable rules for this operation.
         * */
        await addDoc(collectionRef, entry);
      }

      console.log('Imported', entries.length, ' docs to', collectionName);
    }
  };

  for (const id of ids) {
    const json = require(path.resolve(jsonDirPath, id + '.json'));
    await importData(json, id);
  }

  console.log('done');

  process.exit(0);
})();
