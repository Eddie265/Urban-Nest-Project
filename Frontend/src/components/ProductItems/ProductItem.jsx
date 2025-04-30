import React, { useContext, useState } from 'react'
import './ProductItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, userId, name, description, price, offerPrice, image, category, date },props) => {


  const{cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)

  return (
    <div className='product-item'>
      <div className="products-item-img-container">
        <img className='heart-icon' src={assets.heart_icon} alt="" />
        <Link to={`/product/${id}`}><img className='product-image' src={url+"/images/"+image} alt="" /></Link>
        {!cartItems[id]
          ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
          :<div className='item-container'>
              <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>

        }
      </div>
      <p className='name'>{name}</p>
      <p className='disc'>{description.length > 60 ? description.slice(0,60) + '...':description}</p>
      <div className="product-info">
        <p className='rate'>4.5</p>
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_dull_icon} alt="" />
      </div>
      <button>Buy Now</button>
      <p className='price'>${price}</p>
    </div>
  )
}

export default ProductItem