import React, { useContext, useEffect,useState } from 'react'
import { CartContext } from '../App'
import './viewCart.css';

const Viewcart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0)
  useEffect(() => {
    let sum = cart.reduce((acc, val) => acc + val.price, 0).toFixed(2);
    setTotal(sum)
  }, [cart]);
  return (
    <div className="viewcart" >
      <h1>View Cart</h1>
      {
        cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.images[2]} alt={item.title} />
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p>Price: ${item.price}</p>
                  </div>
                  <button onClick={() => setCart(cart.filter((i) => i.id !== item.id))}>
                    Remove from Cart
                  </button>
                </div>
              )
              )}
            </div>
            <p>total amount : {total}</p>
          </>
        )}

    </div>
  )
}

export default Viewcart
