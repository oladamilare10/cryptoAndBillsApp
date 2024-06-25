import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Airtime from './Pages/Airtime'
import Crypto from './Pages/Crypto'
import Bills from './Pages/Bills'
import Service from './Pages/Service'
import Pack from './Pages/Pack'
import Product from './Pages/Product'
import Login from './Pages/Login'
import BuyCrypto from './Pages/BuyCrypto'
import Protected from './Components/Protected'
import Profile from './Pages/Profile'
import Settings from './Pages/Settings'
import Register from './Pages/Register'
import Cable from './Pages/Cable'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected Component={Home} />} />
        <Route path="/Airtime" element={<Protected Component={Airtime} />} />
        <Route path="/Crypto" element={<Protected Component={Crypto} />} />
        <Route path="/Crypto/Buy" element={<Protected Component={BuyCrypto} />} />
        <Route path="/Bills" element={<Protected Component={Bills} />} />
        <Route path="/Profile" element={<Protected Component={Profile} />} />
        <Route path="/Settings" element={<Protected Component={Settings} />} />
        <Route path="/Vendors/:s_id" element={<Protected Component={Service} />} />
        <Route path='/Packages/:s_id/:v_id/' element={<Protected Component={Pack} />} />
        <Route path='/Packages/:s_id/:v_id/' element={<Protected Component={Pack} />} />
        <Route path='/Cable' element={<Protected Component={Cable} />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
