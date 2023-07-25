import { initializeApp, getApp, getApps } from 'firebase/app';

const setupApp = () => {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDERID,
    appId: process.env.FIREBASE_APP_ID,
  });
};

export const app = setupApp();
