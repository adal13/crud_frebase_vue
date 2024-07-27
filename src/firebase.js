// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import firebase from "firebase/compat/app";
// import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHD_KIdMIRTDgVesEovdLpSpzjk9oECrQ",
  authDomain: "crudvue-5f704.firebaseapp.com",
  projectId: "crudvue-5f704",
  storageBucket: "crudvue-5f704.appspot.com",
  messagingSenderId: "1067245256125",
  appId: "1:1067245256125:web:615d1bfbda3a84143e26d4",
};

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const db = getFirestore(app);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
