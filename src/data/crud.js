// import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
// import { db, productsCollectionRef  } from "./database.js";

// async function getProducts(setProducts) {
// 	const productsCollectionRef = collection(db, 'products');
// 	const productsSnapshot = await getDocs(productsCollectionRef);
// 	const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// 	setProducts(productsList);
// 	console.log('App getProducts, products=', productsList)
// }
// export {getProducts}
// import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
// import { db,  } from "./database.js";

// // Funktion för att hämta produkter
// async function getProducts(setProducts) {
// 	const productsCollectionRef = collection(db, 'toyProducts');
// 	const snapshot = await getDocs(productsCollectionRef);
// 	const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// 	setProducts(productsList);
// 	console.log('Hämtade produkter:', productsList);
//   }
//   //Funktion för att lägga till ny produkt
//   async function addProduct(productObject, setProducts) {
// 	try {
// 	  const productsCollectionRef = collection(db, 'toyProducts');
// 	  await addDoc(productsCollectionRef, {
// 		name: productObject.name,
// 		price: productObject.price,
// 		url: productObject.url,
// 		timestamp: Date.now()
// 	  });
// 	  getProducts(setProducts); 
// 	} catch (error) {
// 	  console.error('Fel vid tillägg av produkt:', error);
// 	}
//   }
  
//   export { getProducts, addProduct };




import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./database.js";

// Funktion för att hämta produkter
async function getProducts(setProducts) {
  const productsCollectionRef = collection(db, 'toyProducts');
  const snapshot = await getDocs(productsCollectionRef);
  const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  setProducts(productsList);
  console.log('Hämtade produkter:', productsList);
}

// Funktion för att lägga till ny produkt
async function addProduct(productObject, setProducts) {
  try {
    const productsCollectionRef = collection(db, 'toyProducts');
    await addDoc(productsCollectionRef, {
      name: productObject.name,
      price: productObject.price,
      url: productObject.url,
      timestamp: Date.now()
    });
    getProducts(setProducts); 
  } catch (error) {
    console.error('Fel vid tillägg av produkt:', error);
  }
}

// Funktion för att ta bort produkt
async function deleteProduct(productId, setProducts) {
  try {
    
    const productDocRef = doc(db, 'toyProducts', productId);

   
    await deleteDoc(productDocRef);

    console.log(`Produkt med ID ${productId} har tagits bort.`);

    
    getProducts(setProducts); 
  } catch (error) {
    console.error('Fel vid borttagning av produkt:', error);
  }


  async function editProduct(productId, newProduct, setProduct) {
	const messageRef = doc(db, "products", productId); // Referens till dokumentet

	try {
		await updateDoc(messageRef, {
			text: newText // Uppdatera text-fältet
		})
		console.log("Dokument uppdaterat!")
		getMessages(setProducts)

	} catch (e) {
		console.error("Fel vid uppdatering av dokument: ", e)
	}
}
}

async function editProduct(productId, newProduct, setProducts) {
  const productDocRef = doc(db, "toyProducts", productId); // Rätt kollektion

  try {
    await updateDoc(productDocRef, {
      name: newProduct.name,
      price: newProduct.price,
      url: newProduct.url,
    });
    console.log("Produkten uppdaterad!");

    getProducts(setProducts); // Hämta uppdaterad lista
  } catch (error) {
    console.error("Fel vid uppdatering av produkt: ", error);
  }
}

export { getProducts, addProduct, deleteProduct, editProduct };