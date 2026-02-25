// src/Routes/Routes.jsx
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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,                // Parent layout
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,                  // / → Home page
        element: <Home />
      },
      {
        path: "shop",                 // /shop
        element: <Shop />
      },
      {
        path: "orders",               // /orders
        element: <OrderHistory />
      },
      {
        path: "login",                // /login
        element: <Login />
      },
      {
        path: "register",             // /register
        element: <Register />
      },
      {
        path: "cart",                 // /cart
        element: <Cart />
      }
    ]
  }
]);