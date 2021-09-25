import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { getUA } from '@firebase/util';

const firebaseConfig = {
  apiKey: "AIzaSyBqBn4U-GsldDiCs5nm7619uPr6Y6z1X2s",
  authDomain: "cs497-scheduler-d1cd6.firebaseapp.com",
  databaseURL: "https://cs497-scheduler-d1cd6-default-rtdb.firebaseio.com",
  projectId: "cs497-scheduler-d1cd6",
  storageBucket: "cs497-scheduler-d1cd6.appspot.com",
  messagingSenderId: "108701483628",
  appId: "1:108701483628:web:6678be24b9898382170e49",
  measurementId: "G-8RTSPW7MW7"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase();

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect (() => {
    const dbRef = ref(database, path);
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};

export const setData = (path, value) => (
  set(ref(database, path), value)
);

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(), new GoogleAuthProvider());
}

export const signOut = () => {
  firebaseSignOut(getAuth());
}

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(), setUser);
  }, []);

  return [user];
};
