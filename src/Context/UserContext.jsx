// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";

// 1️⃣ Context তৈরি করা
export const UserContext = createContext();

// 2️⃣ Provider তৈরি করা
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 3️⃣ Page reload বা app load হলে localStorage থেকে user load করা
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};