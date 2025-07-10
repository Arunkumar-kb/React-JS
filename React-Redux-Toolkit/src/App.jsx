import React from 'react'
import './App.css'
import Users from './Users'
import Home from './Home'
import { Routes, Link, Route, BrowserRouter } from 'react-router-dom'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="nav-bar">
          <h1>Logo</h1>
          <ul className="nav-links">
            <li> <Link to='/'>Home</Link></li>
            <li><Link to='/Users'>Users</Link></li>
          </ul>
        </div>

        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Users' element={<Users />}></Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
