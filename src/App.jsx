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
import { useDispatch } from 'react-redux';

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
  const getAccount = async() => {
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
      errorElement: <div>Sorry!!! 404 not found</div>,
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
      path: "/register",
      element: <RegisterPage/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
  ]);
      return (
        <>
          <RouterProvider router={router} />
        </>
      )
}
