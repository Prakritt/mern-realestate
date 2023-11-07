// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b380f.firebaseapp.com",
  projectId: "mern-estate-b380f",
  storageBucket: "mern-estate-b380f.appspot.com",
  messagingSenderId: "811644751508",
  appId: "1:811644751508:web:ae76343e79cce6d75b6e81"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);