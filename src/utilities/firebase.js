import firebase from 'firebase/app';
import 'firebase/database';
import { useObjectVal } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'firebase/auth';

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

firebase.initializeApp(firebaseConfig);

export const useData = (path, transform) => (
  useObjectVal(firebase.database().ref(path), { transform })
);

export const setData = (path, value) => (
  firebase.database().ref(path).set(value)
);

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

export const signOut = () => firebase.auth().signOut();

export const useUserState = () => useAuthState(firebase.auth());
