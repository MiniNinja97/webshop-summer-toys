
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./database.js";

// Hämta produkter
async function getProducts(setProducts) {
  const productsCollectionRef = collection(db, 'toyProducts');
  const snapshot = await getDocs(productsCollectionRef);
  const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  setProducts(productsList);
  console.log('Hämtade produkter:', productsList);
}

// Lägg till produkt
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

// Ta bort produkt
async function deleteProduct(productId, setProducts) {
  try {
    const productDocRef = doc(db, 'toyProducts', productId);
    await deleteDoc(productDocRef);
    console.log(`Produkt med ID ${productId} har tagits bort.`);
    getProducts(setProducts); 
  } catch (error) {
    console.error('Fel vid borttagning av produkt:', error);
  }
}

// Redigera produkt
async function editProduct(productId, newProduct, setProducts) {
  const productDocRef = doc(db, "toyProducts", productId);
  try {
    await updateDoc(productDocRef, {
      name: newProduct.name,
      price: newProduct.price,
      url: newProduct.url,
    });
    console.log("Produkten uppdaterad!");
    getProducts(setProducts);
  } catch (error) {
    console.error("Fel vid uppdatering av produkt: ", error);
  }
}

export { getProducts, addProduct, deleteProduct, editProduct };