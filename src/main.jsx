import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import HomeStructure from './components/home/HomeStructure.jsx';
import ProductCards from './components/Products/ProductCards.jsx';
import AdminProductCard from './components/Products/AdminProductCard.jsx';
import CartStructure from './components/cart/Cartstructure.jsx';

const router = createHashRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: HomeStructure
      },
      {
        path: 'products',
        Component: ProductCards
      },
      {
        path: 'admin',
        Component: AdminProductCard
      },
	  {
		path: 'cart',
		Component: CartStructure
	  }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
