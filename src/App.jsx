import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/HomeStructure'
// import ProductList from './components/Products/ProductList' 
import ToyProductsList from './components/Products/ProductList'
import { useState, useEffect } from 'react'


import './App.css'

function App() {

	

	return (
		<>
		<ToyProductsList/>
		</>
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
