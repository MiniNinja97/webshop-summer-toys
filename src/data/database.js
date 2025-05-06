import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Din Firebase-konfiguration (från Steg 3)
const firebaseConfig = <your-config-object/>; // Hämta denna från Firebase Console

// Initiera Firebase
const app = initializeApp(firebaseConfig);

// Hämta en referens till Firestore
const db = getFirestore(app);

// Hämta en referens till din "produkter"-samling
const productsCollectionRef = collection(db, "produkter");

// Nu kan du använda productsCollectionRef för att läsa eller skriva data!

export {db, productsCollectionRef};
