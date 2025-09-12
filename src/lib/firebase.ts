
"use client"

import { initializeApp, getApp, getApps, FirebaseOptions, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// The Firebase configuration is hardcoded here to bypass persistent
// environment variable loading issues in the development environment.
const firebaseConfig: FirebaseOptions = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// This is a critical check. It ensures that the app will fail to build if the
// configuration is missing, preventing runtime errors.
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Firebase configuration is missing. Make sure you have the correct values hardcoded in src/lib/firebase.ts');
}

// Initialize Firebase as a singleton to avoid re-initialization.
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);

export { app, auth };
