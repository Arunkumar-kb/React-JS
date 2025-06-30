import React, { useEffect, useState } from 'react'
import './home.css'
import Product from './Product'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://dummyjson.com/products/category/smartphones');
                const data = await response.json();
                setProducts(data.products);
            }
            catch (error) {
                console.error('Error fetching cart items:', error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [])
 
    return (
        <div className="home">
            <h1>Welcome to our website</h1>
            <p>Items will be displayed here.</p>
               {loading ? (<p className='loading'>Loading...</p>):(
            <div className="menu">
                {products.map((item)=>(
                  <Product key={item.id} item = {item}/>  
                ))}
            </div>)}
        </div>
    )
}

export default Home
