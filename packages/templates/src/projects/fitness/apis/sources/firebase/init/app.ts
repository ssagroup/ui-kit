import { getApp, getApps, initializeApp } from 'firebase/app';

const setupApp = () => {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp({
    apiKey: process.env.STORYBOOK_FIREBASE_API_KEY,
    authDomain: process.env.STORYBOOK_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.STORYBOOK_FIREBASE_PROJECT_ID,
    storageBucket: process.env.STORYBOOK_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.STORYBOOK_FIREBASE_MESSAGING_SENDERID,
    appId: process.env.STORYBOOK_FIREBASE_APP_ID,
  });
};

export const app = setupApp();
