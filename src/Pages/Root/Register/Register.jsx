import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router";
import { auth } from "../../../firebase/firebase.config";
import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { UserContext } from "../../../Context/UserContext";

const Register = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, password } = form;
    if (!name || !email || !password) {
      setError("Fill all fields");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      localStorage.setItem("currentUser", JSON.stringify(userCredential.user));
      setUser(userCredential.user);

      navigate("/"); // Redirect after registration
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
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">Create Account</h2>
        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <input
          type="text" placeholder="Full Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="password" placeholder="Password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-pink-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition mb-4"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center border py-3 rounded-lg mb-4 hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-2" /> Sign up with Google
        </button>

        <p className="text-center text-sm">
          Already have an account? <NavLink to="/login" className="text-pink-600 font-semibold">Login</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;