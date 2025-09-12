
import { initializeApp, getApp, getApps, FirebaseOptions, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// The Firebase configuration is hardcoded here to bypass persistent
// environment variable loading issues in the development environment.
const firebaseConfig: FirebaseOptions = {
  "projectId": "algosight",
  "appId": "1:258840598313:web:3a3642006a29c3b53b8938",
  "storageBucket": "algosight.firebasestorage.app",
  "apiKey": "AIzaSyA71E4GziA-CuL5OjD-HznsmuEC-kvQttk",
  "authDomain": "algosight.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "258840598313"
};

// Initialize Firebase as a singleton to avoid re-initialization.
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export { app, auth };
