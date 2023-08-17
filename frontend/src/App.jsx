import React from 'react'
import Home from './Pages/home/Home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import CreatePost from './pages/createPost/CreatePost'
import Profile from './pages/profile/Profile'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ViewPost from './pages/viewPost/ViewPost'



const App = () => {
  return (
    <>
      <Navbar/>
      
      <BrowserRouter>
        <Routes>
            <Route path='/' element= {<Home/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/createpost' element={<CreatePost/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/viewpost' element={<ViewPost/>}></Route>
        </Routes>
      </BrowserRouter>

      <Footer/>
    </>
  )
}

export default App