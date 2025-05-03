import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Shop from './pages/Shop/Shop'
import Cart from './pages/Cart/Cart'
import LoginPopUp from './components/LoginPopup/LoginPopUp'
import PlaceOrder from './components/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import MenuBar from './components/MenuBar/MenuBar'
import About from './components/About Us/About'
import Contact from './components/Contact/Contact'
import Product from './components/Product/Product'




const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu,setShowMenu] = useState(false);
  
  return (
    <>
    {showMenu?<MenuBar setShowMenu={setShowMenu} />:<></>}
    {showLogin?<LoginPopUp setShowLogin={setShowLogin} />:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} setShowMenu={setShowMenu} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Shop' element={<Shop />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Order' element={<PlaceOrder/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myorders' element={<MyOrders/>}/>
          <Route path='/About' element={<About/>} />
          <Route path='/Contact' element={<Contact/>} />
          <Route path='/product/:productId' element={<Product/>} />
        </Routes>
        <Footer />
      </div>
      
    </>

  )
}

export default App