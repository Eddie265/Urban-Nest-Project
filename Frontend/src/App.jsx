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

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin} />:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Shop' element={<Shop />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Order' element={<PlaceOrder/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
        <Footer />
      </div>
      
    </>

  )
}

export default App