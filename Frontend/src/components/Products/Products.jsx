import React, { useContext, useEffect } from 'react'
import './Products.css'
import { StoreContext } from '../../context/StoreContext'
import ProductItem from '../ProductItems/ProductItem'
import { Link } from 'react-router-dom'

const Products = () => {

  const { product_list } = useContext(StoreContext)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='products' id='products'>
      <div className="section-head">
        <h2>Trending Products</h2>
        <Link to='/Shop'>View all</Link>
      </div>
      {product_list.length === 0
        ? <div className="product-skeletons">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="product-skeleton"></div>)}
        </div>
        : <div className="product-display">
          {product_list.slice(0, 12).map((item, index) => {
            return <ProductItem key={index} id={item._id} userId={item.userId} name={item.name} description={item.description} price={item.price} offerPrice={item.offerPrice} image={item.image} category={item.category} />
          })}
        </div>}
    </section>
  )
}

export default Products
