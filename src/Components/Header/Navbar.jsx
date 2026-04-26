import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { UserContext } from "../../Context/UserContext";

const Navbar = ({ cartCount = 0 }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  // 🔹 Load products from localStorage or static data
  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || [];
    setAllProducts(storedProducts);
  }, []);

  // 🔹 Live Suggestion Logic
  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 6));
  }, [search, allProducts]);

  // 🔹 Logout
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
    setMenuOpen(false);
  };

  // 🔹 Close profile dropdown & suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Handle search change (desktop + mobile)
  const handleSearchChange = (value) => {
    setSearch(value);
    navigate(`/shop?search=${value}`);
  };

  return (
    <nav className="bg-black text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <img
            src="/WhatsApp Image 2026-01-03 at 11.28.37 PM.jpeg"
            alt="Logo"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          INNOVIVE
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center gap-6 ml-6">
          {/* Search Section */}
          <div className="relative flex-1" ref={searchRef}>
            <form className="flex bg-white rounded-full overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="flex-1 px-4 py-2 text-black outline-none"
              />
              <button
                type="submit"
                className="bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
              >
                <FaSearch />
              </button>
            </form>

            {/* Suggestion Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute bg-white text-black w-full mt-2 rounded-xl shadow-xl max-h-64 overflow-y-auto z-50">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`/shop?search=${item.name}`);
                      setSearch("");
                      setSuggestions([]);
                    }}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    )}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-medium transition ${
                isActive
                  ? "bg-white text-pink-600"
                  : "bg-white text-pink-600 hover:bg-gray-200"
              }`
            }
          >
            Shop
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-5">
          <Link to="/cart" className="relative flex items-center gap-1">
            <FaShoppingCart size={20} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

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
            <Link
              to="/login"
              className="flex items-center gap-2 px-3 py-1 bg-white text-pink-600 rounded-full hover:bg-gray-200 transition"
            >
              <FaUser /> Log in
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 bg-black flex flex-col gap-3 relative" ref={searchRef}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 px-4 py-2 text-white outline-none rounded-full border border-gray-300"
          />

          {/* Mobile Suggestion Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute bg-white text-black w-full mt-2 rounded-xl shadow-xl max-h-64 overflow-y-auto z-50">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(`/shop?search=${item.name}`);
                    setSearch("");
                    setSuggestions([]);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  )}
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          )}

          <NavLink
            to="/shop"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 rounded-full font-medium bg-white text-pink-600"
          >
            Shop
          </NavLink>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 rounded-full font-medium bg-white text-pink-600"
          >
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;