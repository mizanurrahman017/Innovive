import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from '../Pages/Root/Root';
import ErrorPage from '../Pages/Root/ErrorPage/ErrorPage';
import Home from '../Pages/Root/Home/Home';
import Shop from '../Pages/Root/Shop/Shop';
import OrderHistory from '../Pages/Root/OrderHistory/OrderHistory';




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
      }

    ]
  },
]);