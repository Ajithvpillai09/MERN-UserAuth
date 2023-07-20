import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import store from './store';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminPrivateRoute from './components/AdminComponents/AdminPrivateRoute.jsx'
import AdminLogin from './components/AdminComponents/AdminLogin.jsx'
import AdminHome from './components/AdminComponents/AdminHome.jsx'
import Admin from './Admin.jsx'
import CreateUser from './components/AdminComponents/CreateUser.jsx'
import EditUser from './components/AdminComponents/EditUser.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen/>} />
      
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route> 
   </Route>
    <Route path='/admin' element={<Admin />} >
         <Route path='/admin' element={<AdminLogin />} />
        <Route path='' element={<AdminPrivateRoute/>}>
          <Route path='home' element={<AdminHome />} />
          <Route path='create' element={<CreateUser />} />
          <Route path='edit/:id' element={<EditUser />} />
        </Route>
    </Route>
  </>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>  
)
 