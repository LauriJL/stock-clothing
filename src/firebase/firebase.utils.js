import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAd8dSmctUMqp8I62lD2hErDEyxn1XX1LM",
    authDomain: "stock-clo-db.firebaseapp.com",
    projectId: "stock-clo-db",
    storageBucket: "stock-clo-db.appspot.com",
    messagingSenderId: "610487921541",
    appId: "1:610487921541:web:68513e1de680b7a9cc72ec",
    measurementId: "G-HRSW64222K"
  }

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
          ...additionalData
        })
      } catch (error ){
        console.log('Error creating user!', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //Setting up Google authentication utility
  const provider = new firebase.auth.GoogleAuthProvider();
  //Triggering Google-popup always when googleauthprovider is used for authentication
  provider.setCustomParameters({ prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;


