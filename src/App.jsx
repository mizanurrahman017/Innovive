// src/App.jsx
import React from "react";
import { UserProvider } from "./Context/UserContext";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;