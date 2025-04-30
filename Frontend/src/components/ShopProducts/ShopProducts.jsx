import React, { useContext } from 'react'
import './ShopProducts.css'
import ShopProductItem from '../ShopProductItem/ShopProductItem'
import { StoreContext } from '../../context/StoreContext'

const ShopProducts = ({category}) => {
  const {product_list} = useContext(StoreContext)
  return (
    <div className='product1' id='products'>
        <h2>All <span>Products</span></h2>
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