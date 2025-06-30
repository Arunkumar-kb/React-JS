import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
const Header = () => {
  return (
    <div className="header">
        <div className="logo">
            <h2>Product Cart</h2>
        </div>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to="/cart">Cart</Link></li>
        </ul>
    </div>
  )
}

export default Header
