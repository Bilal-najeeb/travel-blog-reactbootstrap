import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './Pages/home/Home'

import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import CreatePost from './pages/createPost/CreatePost'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import ViewPost from './pages/viewPost/ViewPost.jsx'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {createBrowserRouter, createRoutesFromElements, Route,Routes, RouterProvider} from 'react-router-dom'

import store from './store.js';
import { Provider } from 'react-redux';
import PrivateRoutes from './components/PrivateRoutes.jsx'
import MyProfile from './pages/myProfile/MyProfile.jsx'
import MyBlogs from './pages/myBlogs/MyBlogs.jsx'
import UpdatePost from './pages/updatePost/UpdatePost.jsx'







const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

            <Route index={true} path='/' element= {<Home/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            

            {/* Private Routes */}

            <Route path='' element={<PrivateRoutes/>}>
                <Route path='/dashboard' element={<Dashboard/>}></Route>
                <Route path='/myprofile' element={<MyProfile/>}></Route>
                <Route path='/myblogs' element={<MyBlogs/>}></Route>
                <Route path='/createpost' element={<CreatePost/>}></Route>
                <Route path='/updatepost/:id' element={<UpdatePost/>}></Route>
            </Route>
       

            <Route path='/viewpost/:id' element={<ViewPost/>}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <React.StrictMode>
     
      <RouterProvider router={router}>
        <Routes/>
      </RouterProvider>

    </React.StrictMode>
  </Provider>,

)
