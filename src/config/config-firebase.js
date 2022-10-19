import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAMwccQ2pixNTlB9cMHB5IsvOKEE043TXI",
  authDomain: "react-todo-list-6d104.firebaseapp.com",
  projectId: "react-todo-list-6d104",
  storageBucket: "react-todo-list-6d104.appspot.com",
  messagingSenderId: "848623386068",
  appId: "1:848623386068:web:45896437f034e7afd62a41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);