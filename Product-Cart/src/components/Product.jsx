import React, { useContext } from 'react'
import './product.css'
import { CartContext } from '../App'


const Product = ({ item }) => {
  const { cart, setCart } = useContext(CartContext);

  const handleCart = (item) => {
    setCart([...cart, item]);

  }
  const handleRemoveCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  }
  return (
    <div className="product" key={item.id}>
      <div className="img">
        <img src={item.images[2]} alt={item.name} />
      </div>
      <div className="details">
        <h3>{item.title}</h3>
        <p>Price: ${item.price}</p>
      </div>
      {
        cart.some(cartItem => cartItem.id === item.id) ?
          <button onClick={() => handleRemoveCart(item.id)}>Remove item to cart</button> :
          <button onClick={() => handleCart(item)}>Add to Cart</button>
      }

    </div>
  )
}

export default Product
