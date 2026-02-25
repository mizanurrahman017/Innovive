import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { UserContext } from "../../Context/UserContext";

const Navbar = ({ cartCount = 0, products = [], setFilteredProducts }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
    setMenuOpen(false);
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
      setMenuOpen(false);
    }
  };

  // 🔹 Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-pink-600 text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* 🔹 Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <img
            src="/WhatsApp Image 2026-01-03 at 11.28.37 PM.jpeg"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />
          INNOVIVE
        </Link>

        {/* 🔹 Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center gap-6 ml-6">

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-1 bg-white rounded-full overflow-hidden shadow-sm"
          >
            <input
              type="text"
              placeholder="Search products..."
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

          {/* Shop Link */}
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-medium transition ${
                isActive ? "bg-white text-pink-600" : "bg-white text-pink-600 hover:bg-gray-200"
              }`
            }
          >
            Shop
          </NavLink>
        </div>

        {/* 🔹 Right Section (Desktop) */}
        <div className="hidden md:flex items-center gap-5">

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center gap-1">
            <FaShoppingCart size={20} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          {/* <Link to="/wishlist">
            <FaHeart size={20} />
          </Link> */}

          {/* User */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 bg-white text-pink-600 rounded-full flex items-center justify-center font-bold cursor-pointer"
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
            <Link to="/login" className="flex items-center gap-2 px-3 py-1 bg-white text-pink-600 rounded-full hover:bg-gray-200 transition">
              <FaUser /> Log in
            </Link>
          )}
        </div>

        {/* 🔹 Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 bg-pink-600 flex flex-col gap-3">

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex bg-white rounded-full overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search products..."
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

          {/* Shop Link */}
          <NavLink
            to="/shop"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 rounded-full font-medium bg-white text-pink-600 hover:bg-gray-200 transition"
          >
            Shop
          </NavLink>

          {/* Cart */}
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <FaShoppingCart /> Cart
            {cartCount > 0 && (
              <span className="bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          {/* <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
            <FaHeart /> Wishlist
          </Link> */}

          {/* User */}
          {user ? (
            <div className="bg-white text-black p-4 rounded-lg">
              <p className="font-semibold">{user.displayName || "User"}</p>
              <p className="text-sm text-gray-600 mb-3">{user.email}</p>
              <button
                onClick={handleLogout}
                className="bg-pink-600 text-white px-3 py-1 rounded-md w-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 bg-white text-pink-600 px-3 py-1 rounded-full hover:bg-gray-200 transition"
            >
              <FaUser /> Log in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;