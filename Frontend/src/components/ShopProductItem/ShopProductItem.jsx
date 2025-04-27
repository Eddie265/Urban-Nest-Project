import React, { useContext} from 'react'
import './ShopProductItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const ShopProductItem = ({ id, userId, name, description, price, offerPrice, image, category, date }) => {

  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
  return (
    <div className='product-item1'>
      <div className="products-item-img-container1">
        <img className='heart-icon1' src={assets.heart_icon} alt="" />
        <img className='product-image1' src={url+"/images"+image} alt="" />
        {!cartItems[id]
          ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
          :<div className='item-counter'>
              <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <p className='name1'>{name}</p>
      <div className="product-info1">
        <p className='rate1'>4.5</p>
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_dull_icon} alt="" />
      </div>
      <button>Buy Now</button>
      <p className='price1'>${price}</p>
    </div>
  )
}

export default ShopProductItem