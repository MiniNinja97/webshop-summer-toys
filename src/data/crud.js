import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, productsCollectionRef  } from "./database.js";

async function getProducts(setProducts) {
	const productsCollectionRef = collection(db, 'products');
	const productsSnapshot = await getDocs(productsCollectionRef);
	const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	setProducts(productsList);
	console.log('App getProducts, products=', productsList)
}
export {getProducts}