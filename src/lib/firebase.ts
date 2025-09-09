import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "algosight",
  "appId": "1:258840598313:web:3a3642006a29c3b53b8938",
  "storageBucket": "algosight.firebasestorage.app",
  "apiKey": "AIzaSyA71E4GziA-CuL5OjD-HznsmuEC-kvQttk",
  "authDomain": "algosight.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "258840598313"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
};
