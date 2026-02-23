import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaFacebook, FaYoutube, FaInstagram, FaTiktok, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Logo & Description */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/public/WhatsApp Image 2026-01-03 at 11.28.37 PM.jpeg"
                alt="Innovive's Logo"
                className="w-12 h-12 rounded-full"
              />
              <h2 className="text-xl font-bold">INNOVIVE</h2>
            </div>
            <p className="text-gray-300 text-sm hidden md:block">
              🌟INNOVIVE – Your Trusted Hub for Unique Products & Home Décor ✨
              Delivering quality, reliability & happiness straight to your doorstep. 👜
              Customer-first approach | 🚚 Fast delivery | 🏆 Trusted by thousands nationwide
            </p>

            <div className="flex gap-3 mt-2 text-white">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <FaYoutube size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram size={20} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                <FaTiktok size={20} />
              </a>
            </div>
          </div>

          {/* Desktop Grid Links */}
          <div className="hidden md:grid md:grid-cols-3 flex-1 gap-6">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><NavLink to="/" className="hover:text-white transition">Home</NavLink></li>
                <li><NavLink to="/shop" className="hover:text-white transition">Shop</NavLink></li>
                <li><NavLink to="/offers" className="hover:text-white transition">Offers</NavLink></li>
                <li><NavLink to="/top-sales" className="hover:text-white transition">Top Sales</NavLink></li>
                <li><NavLink to="/all-products" className="hover:text-white transition">All Products</NavLink></li>
                <li><NavLink to="/become-seller" className="hover:text-white transition">Become a Seller</NavLink></li>
              </ul>
            </div>

            {/* About Business */}
            <div>
              <h3 className="font-semibold mb-3">About Business</h3>
              <ul className="space-y-2 text-gray-300">
                <li><NavLink to="/about" className="hover:text-white transition">About us</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-white transition">Contact us</NavLink></li>
                <li><NavLink to="/privacy" className="hover:text-white transition">Privacy Policy</NavLink></li>
                <li><NavLink to="/terms" className="hover:text-white transition">Terms & Conditions</NavLink></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="font-semibold mb-3">Contact Us</h3>
              <p className="text-gray-300 text-sm">
                Kodomtoli,alompur<br />
                Sylhet, Bangladesh
              </p>
              <p className="text-gray-300 text-sm mt-2">📞 01318819963</p>
              <p className="text-gray-300 text-sm">📞 +8801869438544</p>
              <p className="text-gray-300 text-sm mt-2">
                ✉ <a href="mailto:badhonsworld09@gmail.com" className="hover:text-white transition">innovive@gmail.com</a>
              </p>
             
            </div>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden space-y-2">
          {[
            { title: "Quick Links", items: [
              { name: "Home", link: "/" },
              { name: "Shop", link: "/shop" },
              { name: "Offers", link: "/offers" },
              { name: "Top Sales", link: "/top-sales" },
              { name: "All Products", link: "/all-products" },
              { name: "Become a Seller", link: "/become-seller" },
            ]},
            { title: "About Business", items: [
              { name: "About us", link: "/about" },
              { name: "Contact us", link: "/contact" },
              { name: "Privacy Policy", link: "/privacy" },
              { name: "Terms & Conditions", link: "/terms" },
            ]},
            { title: "Contact Us", items: [
              { name: "Address", text: "Kodomtoli,Alompur,Sylhet, Bangladesh" },
              { name: "Phone1", text: "+8801318819963" },
              { name: "Phone2", text: "+8801869438544" },
              { name: "Email", text: "innovive@gmail.com" },
            //   { name: "Website", text: "https://badhonsworld.com" },
            ]},
          ].map((section, idx) => (
            <div key={idx} className="border-t border-gray-700">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex justify-between items-center py-3 text-left font-semibold"
              >
                {section.title}
                {openSection === section.title ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {openSection === section.title && (
                <ul className="pl-4 pb-3 text-gray-300 space-y-1">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      {item.link ? (
                        <NavLink to={item.link} className="hover:text-white transition">{item.name}</NavLink>
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
          ©2025 INNOVIVE, ALL RIGHTS RESERVED. Developed by <a href="https://www.linkedin.com/in/nahid-ahmed" className="hover:text-white">Mizanur rahman</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
