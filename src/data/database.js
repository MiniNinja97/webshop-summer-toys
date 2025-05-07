// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEwm2RXYpEzBVJR1E6Olcek-rXOFaAspM",
  authDomain: "summer-toy-shop.firebaseapp.com",
  projectId: "summer-toy-shop",
  storageBucket: "summer-toy-shop.firebasestorage.app",
  messagingSenderId: "106628536677",
  appId: "1:106628536677:web:7763fa5211525363c3a98c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};
