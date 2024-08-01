import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import TenderDetails from './pages/tenderDetails/TenderDetails'
import SignUP from './pages/login/SignUP'
import CreateTender from './pages/create-tender/CreateTender'



const App = () => {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUP />} />
          <Route path='/tender/:tenderId' element={<TenderDetails />} />
          <Route path='/create-tender' element={<CreateTender />} />
        </Routes>
      </BrowserRouter> 
    
  )
}

export default App
