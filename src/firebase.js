
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMGwrz5FCyLEu6Mv_i5aI36jbt2d73w5w",
  authDomain: "mdnotes-a1e1c.firebaseapp.com",
  projectId: "mdnotes-a1e1c",
  storageBucket: "mdnotes-a1e1c.appspot.com",
  messagingSenderId: "799031031841",
  appId: "1:799031031841:web:9c2c5c792f35f59bce0b60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app); //Get associated database
export const notesCollection = collection(database, "notes") //Find collection from specified database
