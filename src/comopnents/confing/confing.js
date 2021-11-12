// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrsTyxAat-wk2o4acGdvnnXSfQFzR2dsI",
  authDomain: "myntra-68290.firebaseapp.com",
  projectId: "myntra-68290",
  storageBucket: "myntra-68290.appspot.com",
  messagingSenderId: "500935013644",
  appId: "1:500935013644:web:a972e3447c78222d804529"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);
const fAuth = firebase.auth();
const db = firebase.firestore();
const fStorage = firebase.storage()


export { fAuth,db,fStorage}