import React from 'react'
import './Shop.css'
// import ShopTop from '../../components/ShopTop/ShopTop'
import ShopProducts from '../../components/ShopProducts/ShopProducts'
import PageHeader from '../../components/PageHeader/PageHeader'
import { assets } from '../../assets/assets'

const Shop = () => {
  return (
    <div>
      {/* <ShopTop /> */}
      <PageHeader
        crumb="Shop"
        title="Shop the"
        accent="Latest Tech"
        text="Explore cutting-edge gadgets that upgrade your lifestyle."
        image={assets.header_macbook_image}
      />
      <ShopProducts/>
    </div>
  )
}

export default Shop
