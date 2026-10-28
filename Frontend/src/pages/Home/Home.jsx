import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import CategoryCards from '../../components/CategoryCards/CategoryCards';
import Products from '../../components/Products/Products';
import Features from '../../components/Features/Features';
import Banners from '../../components/Banners/Banners';
import BottomBanner from '../../components/BottomBanner/BottomBanner';


const Home = () => {
  return (
    <div>
      <Header />
      <CategoryCards />
      <Products />
      <Features />
      <Banners />
      <BottomBanner />
    </div>
  )
}

export default Home
