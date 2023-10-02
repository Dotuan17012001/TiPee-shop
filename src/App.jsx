import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import ContactPage from './pages/contact';
import BookPage from './pages/book';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import RegisterPage from './pages/register';
import { callFetchAccount } from './service/apiService';
import { doGetAccountAction } from './redux/account/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import AdminPage from './pages/admin';
import ProtectedRoute from './components/ProtectedRoute';

const Layout = () => {
  return (
    <div className='layout-app'>
      <Header/>
        <Outlet/>
      <Footer/>
    </div>
  )
}
export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)
  const getAccount = async() => {
      if(window.location.pathname === '/login' || window.location.pathname === '/admin') return
      const res = await callFetchAccount()
      console.log("check res", res)
      if(res && res.data){
        dispatch(doGetAccountAction(res.data))
      }
  }
  useEffect(()=>{
    getAccount()
  },[])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <NotFound/>,
      children: [
        { index:true, element: <Home/>}
        ,
        {
          path: "contacts",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },

    {
      path: "/admin",
      element: 
        <ProtectedRoute>
          <AdminPage/>
        </ProtectedRoute>,
      errorElement: <NotFound/>,
      children: [
        { index:true, element: <Home/>}
        ,
        {
          path: "user",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },

    {
      path: "/register",
      element: <RegisterPage/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
  ]);
      return (
        <>{ isAuthenticated === true || window.location.pathname === '/login' || window.location.pathname === '/admin'?
         
          <RouterProvider router={router} /> 
          :
          <Loading/>
        }
        </>
      )
}
