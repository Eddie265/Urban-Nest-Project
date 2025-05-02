import React, { useContext, useEffect, useState } from 'react'
import './Product.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
// import { product_list } from '../../assets/assets';

const Product = () => {

    const { product_list } = useContext(StoreContext);
    const { productId } = useParams();
    const [productData, setProductData] = useState(null);


    // const fetchProductData = async () => {
    //     product_list.map((item) => {
    //         if (item._id === productId) {
    //             setProductData(item)
    //             setImage(item.image[0])
    //             console.log(item);

    //             return null;
    //         }
    //     })
    // }

    useEffect(() => {
        const item = product_list.find(item => item._id === productId);
        if (item) {
            setProductData(item);
        }
    }, [productId, product_list])

    if (!productData) return <div className="product-loading">Loading...</div>;
    return productData ? (
        <div className="product-page">
      <div className="product-image">
        <img src={`https://urban-nest-backend-pvvj.onrender.com/images/${product.image}`} alt={productData.name} />
          
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
          <button className="add-cart">Add to Cart</button>
          <button className="buy-now">Buy now</button>
        </div>
      </div>
    </div>
    ) : <div className='down'></div>
}

export default Product
