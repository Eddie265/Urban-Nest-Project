import React, { useContext, useEffect, useState } from 'react'
import './Product.css'
import { useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import ShopProducts from '../ShopProducts/ShopProducts'


const Product = ({ }) => {

  const { product_list, addToCart } = useContext(StoreContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();


  const handleAddCart = () => {
    addToCart(productData._id);
  };

  const handleBuyNow = () => {
    addToCart(productData._id);
    navigate('/Cart')
  }

  useEffect(() => {
    const item = product_list.find(item => item._id === productId);
    if (item) {
      setProductData(item);
    }
  }, [productId, product_list])

  if (!productData) return <div className='verify'><div className="spinner"></div></div>;


  return productData ? (
    <>
      <div className="product-page">
        <div className="product-image">
          <img src={`https://urban-nest-backend-pvvj.onrender.com/images/${productData.image}`} alt={productData.name} />

        </div>
        <div className="product-details">
          <h2>{productData.name}</h2>
          <p className="product-description">{productData.description}</p>
          <div className="product-price">
            <span className="current-price">${productData.price}</span>
          </div>
          <div className="product-meta">
            <p><strong>Category:</strong> {productData.category || 'Accessory'}</p>
          </div>
          <div className="product-buttons">
            <button className="add-cart" onClick={handleAddCart} >Add to Cart</button>
            <button className="buy-now" onClick={handleBuyNow} >Buy now</button>
          </div>
        </div>
    

      </div>
      <ShopProducts />
    </>

  ) : <div className='down'></div>
}

export default Product
