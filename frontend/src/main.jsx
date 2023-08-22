import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './Pages/home/Home'

import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import CreatePost from './pages/createPost/CreatePost'
import Profile from './pages/profile/Profile'
import ViewPost from './pages/viewPost/ViewPost.jsx'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'

import store from './store.js';
import { Provider } from 'react-redux';
import PrivateRoutes from './components/PrivateRoutes.jsx'






const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

            <Route index={true} path='/' element= {<Home/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            

            {/* Private Routes */}

            <Route path='' element={<PrivateRoutes/>}>
                <Route path='/profile' element={<Profile/>}></Route>
                <Route path='/createpost' element={<CreatePost/>}></Route>
            </Route>
       

            <Route path='/viewpost' element={<ViewPost/>}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <React.StrictMode>
     
      <RouterProvider router={router} />

    </React.StrictMode>
  </Provider>,

)
