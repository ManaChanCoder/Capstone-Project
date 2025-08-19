// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmKzrjgvhbc15vIquwKBEBu_CF_YPL3qQ",
  authDomain: "capstone-e2611.firebaseapp.com",
  projectId: "capstone-e2611",
  storageBucket: "capstone-e2611.appspot.com",
  messagingSenderId: "313845517374",
  appId: "1:313845517374:web:c11b240b5aeec84f78956f",
  measurementId: "G-6T5F6FGH6K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
// db.settings({ timestampsInSnapshots: true });
export { db, storage, auth };
