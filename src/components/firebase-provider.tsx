
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  projectId: 'algosight',
  appId: '1:258840598313:web:3a3642006a29c3b53b8938',
  storageBucket: 'algosight.firebasestorage.app',
  apiKey: 'AIzaSyA71E4GziA-CuL5OjD-HznsmuEC-kvQttk',
  authDomain: 'algosight.firebaseapp.com',
  messagingSenderId: '258840598313',
};

interface FirebaseContextType {
  app: FirebaseApp | null;
  auth: Auth | null;
}

const FirebaseContext = createContext<FirebaseContextType>({ app: null, auth: null });

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [firebase, setFirebase] = useState<FirebaseContextType>({ app: null, auth: null });

  useEffect(() => {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);
    setFirebase({ app, auth });
  }, []);

  return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
}
