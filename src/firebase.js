// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVXOHtUaxqYp7uFpXf79Mtyq500DJGzBY",
  authDomain: "greenscore-9bee8.firebaseapp.com",
  projectId: "greenscore-9bee8",
  storageBucket: "greenscore-9bee8.firebasestorage.appspot.com",
  messagingSenderId: "483554765481",
  appId: "1:483554765481:web:a8a22fe7e8fc638a2c17b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export auth and db
export const auth = getAuth(app);
export const db = getFirestore(app);