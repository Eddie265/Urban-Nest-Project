import React, { useContext, useEffect } from 'react'
import './Products.css'
import { StoreContext } from '../../context/StoreContext'
import ProductItem from '../ProductItems/ProductItem'
import { Link } from 'react-router-dom'

const Products = ({ category }) => {

  const { product_list } = useContext(StoreContext)
  
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className='products' id='products'>
      <h2>Available Products</h2>
      <div className="product-display">
        {product_list.map((item, index) => {
          return <ProductItem key={index} id={item._id} userId={item.userId} name={item.name} description={item.description} price={item.price} offerPrice={item.offerPrice} image={item.image} category={item.category} />
        })}
      </div>
      <div className="button">
        <button><Link to='/Shop' >See more</Link></button>
      </div>
    </div>
  )
}

export default Products