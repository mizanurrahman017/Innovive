import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../../firebase/firebase.config";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserContext } from "../../../Context/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      setUser(user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      setUser(user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <input
          type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
        />

        <div className="relative w-full mb-4">
          <input
            type={showPassword ? "text" : "password"} placeholder="Password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-pink-400"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition mb-4">
          {loading ? "Logging in..." : "Login"}
        </button>

        <button type="button" onClick={handleGoogleSignIn} className="w-full flex justify-center items-center border py-3 rounded-lg mb-4 hover:bg-gray-100 transition">
          <FcGoogle className="mr-2" /> Sign in with Google
        </button>

        <p className="text-center text-sm">
          New here? <NavLink to="/register" className="text-pink-600 font-semibold">Create Account</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;