import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAPHdSq9HLc1v9MglNwYm5gIdLZoFx1Xc4",
  authDomain: "shopping-db-373d6.firebaseapp.com",
  databaseURL: "https://shopping-db-373d6.firebaseio.com",
  projectId: "shopping-db-373d6",
  storageBucket: "shopping-db-373d6.appspot.com",
  messagingSenderId: "1029284165412",
  appId: "1:1029284165412:web:7e032ceced55adf0f4e5b1",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
