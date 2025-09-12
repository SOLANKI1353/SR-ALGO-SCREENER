
'use client';
import { useContext } from 'react';
import { FirebaseProvider, useFirebase as useFirebaseContext } from '@/components/firebase-provider';

export const useFirebaseAuth = () => {
  const { auth } = useFirebaseContext();
  if (!auth) {
    // This can happen during the initial render before the useEffect in the provider runs.
    // Components using this hook should handle this null state gracefully.
  }
  return { auth };
};
