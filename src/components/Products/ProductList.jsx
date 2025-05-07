
// Importera React-hooks om du inte redan gjort det
import React, { useEffect } from 'react';

// Importera din db-instans som du exporterade
import { db } from '../../data/database'; // Adjust the path if your firebaseConfig file is elsewhere

// Importera Firestore-funktioner
import { collection, getDocs } from 'firebase/firestore';

function ToyProductsList() {
  useEffect(() => {
    // Define an async function to fetch the data
    const fetchProducts = async () => {
      try {
        // 1. Get a reference to the 'toyProducts' collection
        const productsCollectionRef = collection(db, 'toyProducts');

        // 2. Get a snapshot of the documents in the collection
        const querySnapshot = await getDocs(productsCollectionRef);

        // 3. Loop through the documents and log their data
        console.log("Fetching data from 'toyProducts':");
        querySnapshot.forEach((doc) => {
          // doc.data() is the document's data
          console.log(doc.id, " => ", doc.data());
        });

      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    // Call the function to fetch the data when the component mounts
    fetchProducts();

  }, []); // The empty dependency array [] ensures this effect runs only once when the component mounts

  // You need to return some JSX, even if it's just null or a loading message
  return (
    <div>
      <h2>Toy Products (Check console)</h2>
      {/* You would typically render the data here */}
    </div>
  );
}

export default ToyProductsList;
