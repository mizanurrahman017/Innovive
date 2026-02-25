import React, { useEffect, useState, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Banner = () => {
  const images = [
    "/banner1.png",
    "/banner2.jpg",
    "/banner3.avif",
    "/banner4.png",
    "/banner5.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // Next Slide
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Previous Slide
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden">

      {/* Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="banner"
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === current
                ? "bg-white scale-125"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;