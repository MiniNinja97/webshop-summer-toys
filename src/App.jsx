import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/HomeStructure'


import { useState, useEffect } from 'react'
import AdminProductCard from './components/Products/AdminProductCard'
import ProductCards from './components/Products/ProductCards'
import ToyProductsList from './components/Products/ProductList'


import './App.css'

function App() {
	const [isAdmin, setIsAdmin] = useState(false); // true för admin, false för kund

  // Du kan växla mellan vyer härifrån, t.ex. med en knapp
  const toggleAdminView = () => {
    setIsAdmin(!isAdmin);
  };
	

	return (
		<div>
      <button onClick={toggleAdminView}>
        {isAdmin ? 'Switch to Customer View' : 'Switch to Admin View'}
      </button>

      <ToyProductsList isAdmin={isAdmin} />
    </div>
	)
  

//   return (
//     <HashRouter>
//       <Routes>
// 		<Route path='/' element={<Home/>}/>
// 	  </Routes>
//     </HashRouter>
//   )
}

export default App
