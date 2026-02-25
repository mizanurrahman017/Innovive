import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Trim values
    const phone = form.phone.trim();
    const password = form.password.trim();

    if (!phone || !password) {
      setError("Please fill all fields");
      return;
    }

    let users = [];

    try {
      users = JSON.parse(localStorage.getItem("users")) || [];
    } catch {
      users = [];
    }

    const validUser = users.find(
      (u) => u.phone === phone && u.password === password
    );

    if (!validUser) {
      setError("Invalid phone or password");
      return;
    }

    // 🔥 Save current user
    localStorage.setItem("currentUser", JSON.stringify(validUser));

    if (setUser) {
      setUser(validUser);
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-pink-600 text-center mb-6">
          Login
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-3 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* Phone Input */}
        <input
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {/* Password Input */}
        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full p-2 border rounded pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition">
          Login
        </button>

        {/* Register Link */}
        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <NavLink to="/register" className="text-pink-600">
            Create Account
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;