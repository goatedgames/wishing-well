import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// add your Firebase configs here
const firebaseConfig = {
  apiKey: ########################,
  authDomain: ###########################,
  databaseURL: ##########################,
  projectId: ###########################,
  storageBucket: #######################,
  messagingSenderId: ################,
  appId: ############################################,
  measurementId: #-##########
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

auth.setPersistence(firebase.auth.Auth.Persistence.NONE);

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  console.log(user.id);
  const snapshot = await userRef.get();
  console.log(snapshot);
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    console.log(email, displayName);
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return userRef;
  // return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
export const addMemo = async (user, memo) => {
  firestore.doc(`users/${user.id}`).collection(`memos`).add({
    date: memo.date,
    note: memo.note
  }).catch(error => {
    console.error("Error writing: ", error);
  });
};

export const getMemos = async (user) => {

  const doc = await firestore.doc(`users/${user.id}`).collection('memos').get();
  const BRUH = await firestore.doc(`users/${user.id}`).get();
  const BRUHDATA = BRUH.data();
  const name = 'displayName' in BRUHDATA ? BRUHDATA.displayName : " yourself";
  let memos = [];
  doc.forEach(d => {
    const data = d.data();
    memos.push({ date: data.date, note: data.note, name: name });
  });
  return memos;
}                                                    
