import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: ""
  });

  const handleRegister = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.password) {
      alert("Fill all fields");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = existingUsers.find(u => u.phone === form.phone);

    if (userExists) {
      alert("User already exists");
      return;
    }

    existingUsers.push(form);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Account Created Successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-pink-600 text-center mb-6">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({...form, name: e.target.value})}
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setForm({...form, phone: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have account?{" "}
          <NavLink to="/login" className="text-pink-600">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;