import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { 
  FaSearch, 
  FaShoppingCart, 
  FaHeart, 
  FaUser, 
  FaBars, 
  FaTimes 
} from "react-icons/fa";

const Navbar = ({ 
  cartCount = 0, 
  user = null, 
  setUser, 
  products = [], 
  setFilteredProducts 
}) => {

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 🔥 Load user from localStorage when navbar mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser && setUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  // 🔍 Search
  const handleSearch = (e) => {
    e.preventDefault();

    if (setFilteredProducts) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
      navigate("/shop");
    }
  };

  // 🔥 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    if (setUser) {
      setUser(null);
    }
    navigate("/login");
  };

  return (
    <nav className="bg-pink-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <img
            src="/WhatsApp Image 2026-01-03 at 11.28.37 PM.jpeg"
            alt="Innovive's Logo"
            className="w-10 h-10 rounded-full"
          />
          INNOVIVE
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5 flex-1 ml-6">

          {/* Search */}
          <form onSubmit={handleSearch} className="flex flex-1 bg-white rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 text-black outline-none"
            />
            <button type="submit" className="bg-gray-200 px-4 py-2 text-black">
              <FaSearch />
            </button>
          </form>

          {/* Shop */}
          <Link 
            to="/shop" 
            className="ml-4 px-4 py-2 bg-white text-pink-600 rounded-md font-medium hover:bg-gray-200 transition"
          >
            Shop
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-5 ml-6">

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

            {/* User Section */}
            {user ? (
              <div className="flex items-center gap-3">

                {/* Avatar */}
                <div className="w-8 h-8 bg-white text-pink-600 rounded-full flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="font-medium">
                  {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-white text-pink-600 px-3 py-1 rounded-md text-sm hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1">
                <FaUser /> Log in
              </Link>
            )}

          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 bg-pink-600 flex flex-col gap-3">

          <form onSubmit={handleSearch} className="flex bg-white rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 text-black outline-none"
            />
            <button type="submit" className="bg-gray-200 px-4 py-2 text-black">
              <FaSearch />
            </button>
          </form>

          <Link to="/shop" className="px-4 py-2 bg-white text-pink-600 rounded-md font-medium">
            Shop
          </Link>

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white text-pink-600 rounded-full flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span>{user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-white text-pink-600 px-3 py-1 rounded-md text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-1">
              <FaUser /> Log in
            </Link>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;