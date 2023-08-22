import React from 'react'

import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'


import {Outlet} from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'




const App = () => {



  return (
    <>
      
      
        <Navbar/>
        
        <ToastContainer/>

        <Outlet/>
    
        <Footer/>
        
    </>
  )
}

export default App