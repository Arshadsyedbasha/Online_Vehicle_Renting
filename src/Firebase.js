// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy_VORs-wLM4GDAKWwglu4odi1T4dAaHc",
  authDomain: "syed-kanna.firebaseapp.com",
  projectId: "syed-kanna",
  storageBucket: "syed-kanna.appspot.com",
  messagingSenderId: "845187914101",
  appId: "1:845187914101:web:a6fb7c88cf693e9fad5b3c",
  measurementId: "G-3GXHYF7B2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);