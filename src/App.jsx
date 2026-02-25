import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./Components/Header/Navbar";
import Login from "./Pages/Root/Login/Login";

function App() {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={<h1 className="text-center mt-10">Home Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;