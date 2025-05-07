
import React, { useEffect, useState } from 'react';
import { db } from '../../data/database';
import { collection, getDocs } from 'firebase/firestore';
import ProductCards from './ProductCards'; // Importera din kort-komponent

function ToyProductsList() {
  const [products, setProducts] = useState([]); // Skapa state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollectionRef = collection(db, 'toyProducts');
        const querySnapshot = await getDocs(productsCollectionRef);
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(fetchedProducts); // Spara datan i state
        console.log("Fetched products:", fetchedProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Toy Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCards key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ToyProductsList;
