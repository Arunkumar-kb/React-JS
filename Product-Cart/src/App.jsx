import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Viewcart from './components/Viewcart';
import { createContext, useState } from 'react'

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cart, setCart }}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Viewcart />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

export default App
