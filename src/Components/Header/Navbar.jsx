import React, { useState } from "react";
import { Link } from "react-router";
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ cartCount = 0, user = null, products = [], setFilteredProducts }) => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Search filter function
  const handleSearch = (e) => {
    e.preventDefault();
    if (setFilteredProducts) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <nav className="bg-pink-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <img
            src="/WhatsApp Image 2026-01-03 at 11.28.37 PM.jpeg" // Logo placeholder
            alt="Innovive's Logo"
            className="w-10 h-10 rounded-full"
          />
         INNOVIVE
        </Link>

        {/* Desktop Menu + Search */}
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

          {/* Shop Page Link */}
          <Link to="/shop" className="ml-4 px-4 py-2 bg-white text-pink-600 rounded-md font-medium hover:bg-gray-200 transition">
            Shop
          </Link>

          {/* Right Icons */}
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

            {/* User */}
            {user ? (
              <div className="flex items-center gap-1">
                <FaUser />
                <span>{user.name}</span>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1">
                <FaUser /> Log in
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 bg-pink-600 flex flex-col gap-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex w-full bg-white rounded-md overflow-hidden">
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

          {/* Shop Page Link */}
          <Link to="/shop" className="mt-2 px-4 py-2 bg-white text-pink-600 rounded-md font-medium hover:bg-gray-200 transition">
            Shop
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-5 mt-3">
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
              <div className="flex items-center gap-1">
                <FaUser />
                <span>{user.name}</span>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1">
                <FaUser /> Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
