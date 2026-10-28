import React, { useContext } from 'react'
import './ShopProducts.css'
import ShopProductItem from '../ShopProductItem/ShopProductItem'
import { StoreContext } from '../../context/StoreContext'
import { Link, useSearchParams } from 'react-router-dom'

const ShopProducts = () => {
  const { product_list } = useContext(StoreContext)
  const [searchParams] = useSearchParams();
  const search = (searchParams.get("search") || "").trim().toLowerCase();

  const filtered = search
    ? product_list.filter((item) =>
      [item.name, item.description, item.category].some((field) => field?.toLowerCase().includes(search)))
    : product_list;

  return (

    <section className='product1' id='products'>
      <div className="section-head shop-head">
        <div>
          <p className='shop-eyebrow'>Discover. Shop. Upgrade.</p>
          <h2>{search ? <>Results for “{searchParams.get("search")}”</> : <>All <span>Products</span></>}</h2>
        </div>
        {search && <Link to='/Shop'>Clear search</Link>}
      </div>
      {product_list.length > 0 && filtered.length === 0
        ? <div className="shop-empty">
          <p>No products match your search.</p>
          <Link to='/Shop' className='btn-red'>Browse all products</Link>
        </div>
        : <div className="products-display1">
          {filtered.map((item, index) => {
            return <ShopProductItem key={index} id={item._id} userId={item.userId} name={item.name} description={item.description} price={item.price} offerPrice={item.offerPrice} image={item.image} category={item.category} date={item.date} />
          })}
        </div>}
    </section>
  )
}

export default ShopProducts
