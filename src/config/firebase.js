// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANJntT2pWjDqBoee4y_kNcRGv7k5YMEMc",
  authDomain: "contact-app-f491c.firebaseapp.com",
  projectId: "contact-app-f491c",
  storageBucket: "contact-app-f491c.appspot.com",
  messagingSenderId: "227159594983",
  appId: "1:227159594983:web:074ed0a8f1098549344f42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);