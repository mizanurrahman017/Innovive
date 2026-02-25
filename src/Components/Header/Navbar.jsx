import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaSearch, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { UserContext } from "../../Context/UserContext";

const Navbar = ({ cartCount = 0, products = [], setFilteredProducts }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  // 🔹 Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (setFilteredProducts) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
      navigate("/shop");
    }
  };

  // 🔹 Outside click close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-pink-600 text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* 🔹 Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <img
            src="/public/WhatsApp Image 2026-01-03 at 11.28.37 PM.jpeg"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          INNOVIVE
        </Link>

        {/* 🔹 Search + Shop */}
        <div className="flex flex-1 items-center gap-4 mx-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-1 bg-white rounded-md overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 text-black outline-none"
            />
            <button
              type="submit"
              className="bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
            >
              <FaSearch />
            </button>
          </form>

          {/* 🔹 Shop NavLink */}
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition ${
                isActive ? "bg-white text-pink-600" : "bg-white text-pink-600"
              }`
            }
          >
            Shop
          </NavLink>
        </div>

        {/* 🔹 Right Side */}
        <div className="flex items-center gap-5">

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center gap-1">
            <FaShoppingCart />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist">
            <FaHeart />
          </Link>

          {/* User */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 bg-white text-pink-600 rounded-full flex items-center justify-center font-bold cursor-pointer"
              >
                {user.displayName?.charAt(0).toUpperCase() ||
                  user.email?.charAt(0).toUpperCase()}
              </div>

              {profileOpen && (
                <div className="absolute right-0 mt-3 bg-white text-black rounded-lg shadow-xl p-4 w-56 z-50">
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-sm text-gray-600 mb-3">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1">
              <FaUser /> Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;