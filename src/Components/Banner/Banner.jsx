import React, { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft, FaChevronRight as ArrowRight } from "react-icons/fa";

const Banner = ({ products = [], setFilteredProducts }) => {
  const images = [
    "/banner1.png",
    "/banner2.jpg",
    "/banner3.avif",
    "/banner4.png",
    "/banner5.jpg",
  ];

  const categories = [
    "New Arrival",
    "Airpods",
    "Clock",
    "Lamp",
    "watch",
  ];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCategoryClick = (category) => {
    if (setFilteredProducts) {
      const filtered = products.filter(
        (p) => p.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Left Categories */}
        <div className="bg-white shadow-md rounded-md p-4 md:col-span-1">
          <h2 className="bg-pink-600 text-white px-4 py-2 rounded-md font-semibold mb-3">
            All Categories
          </h2>

          <ul className="space-y-3">
            {categories.map((cat, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(cat)}
                className="flex justify-between items-center text-gray-700 hover:text-pink-600 cursor-pointer transition"
              >
                {cat}
                <FaChevronRight size={12} />
              </li>
            ))}
          </ul>
        </div>

        {/* Right Slider */}
        <div className="relative md:col-span-3 rounded-md overflow-hidden shadow-md bg-white flex items-center justify-center min-h-[220px] md:min-h-[400px]">

          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Banner"
              className={`absolute max-h-full max-w-full object-contain transition-opacity duration-1000 ${
                current === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Prev */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
          >
            <FaChevronLeft />
          </button>

          {/* Next */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white"
          >
            <ArrowRight />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${
                  current === index ? "bg-black" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
