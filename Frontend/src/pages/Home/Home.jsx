import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Products from '../../components/Products/Products';
import Banners from '../../components/Banners/Banners';
import BottomBanner from '../../components/BottomBanner/BottomBanner';


const Home = () => {
  const [category,setCategory] = useState("All");
  return (
    <div>
      <Header />
      {/* <ExploreMenu category={category} setCategory={setCategory}/> */}
      <Products category={category} />
      <Banners />
      <BottomBanner />
    </div>
  )
}

export default Home