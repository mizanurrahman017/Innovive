import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from '../Pages/Root/Root';
import ErrorPage from '../Pages/Root/ErrorPage/ErrorPage';
import Home from '../Pages/Root/Home/Home';
import Shop from '../Pages/Root/Shop/Shop';
import OrderHistory from '../Pages/Root/OrderHistory/OrderHistory';
import Login from '../Pages/Root/Login/Login';
import Register from '../Pages/Root/Register/Register';
import Cart from '../Pages/Root/Cart/Cart';




export  const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        path:"/",
        Component:Home,

      },
      {
        path:"shop",
        element:<Shop></Shop>
      },
      {
        path:"/orders",
        element:<OrderHistory></OrderHistory>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"register",
        element:<Register></Register>
      },
      {
        path:"cart",
        element:<Cart></Cart>
      }

    ]
  },
]);