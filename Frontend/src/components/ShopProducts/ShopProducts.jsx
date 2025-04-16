import React from 'react'
import './ShopProducts.css'
import { product_list } from '../../assets/assets'
import ShopProductItem from '../ShopProductItem/ShopProductItem'

const ShopProducts = () => {
  return (
    <div className='product1'>
        <h2>Featured <span>Products</span></h2>
        <hr />
        <div className="products-display1">
            {product_list.map((item,index)=>{
              return <ShopProductItem key={index} id={item._id} userId={item.userId} name={item.name} description={item.description} price={item.price} offerPrice={item.offerPrice} image={item.image} category={item.category} date={item.date} />
            })}
        </div>
    </div>
  )
}

export default ShopProducts