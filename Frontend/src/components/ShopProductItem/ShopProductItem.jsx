import React from 'react'
import ProductItem from '../ProductItems/ProductItem'

// Shop and Home share the same product card (and cart behaviour)
const ShopProductItem = (props) => <ProductItem {...props} />

export default ShopProductItem
