// import React, { useEffect, useState } from 'react';
// import { db } from '../../data/database';
// import { collection, getDocs } from 'firebase/firestore';
// import ProductCards from './ProductCards';
// import AdminProductCard from './AdminProductCard';

// function ToyProductList({ isAdmin }) {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, 'toyProducts'));
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
// 		console.log("Fetched products:", data);
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="product-list">
//       {products.map((product) =>
//         isAdmin ? (
// 			<AdminProductCard key={product.id} product={product} setProducts={setProducts} />
//         ) : (
//           <ProductCards key={product.id} product={product} />
//         )
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { getProducts } from '../../data/crud'; 
// import ProductCards from './ProductCards';
// import AdminProductCard from './AdminProductCard';

// function ToyProductList({ isAdmin }) {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getProducts(setProducts); 
//   }, []);

//   return (
//     <div className="product-list">
//       {products.map((product) =>
//         isAdmin ? (
//           <AdminProductCard
//             key={product.id}
//             product={product}
//             setProducts={setProducts} 
//           />
//         ) : (
//           <ProductCards key={product.id} product={product} />
//         )
//       )}
//     </div>
//   );
// }

// export default ToyProductList;
