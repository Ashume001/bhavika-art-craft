import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import img1 from "../assets/hero1.jpeg";
import img2 from "../assets/hero2.jpeg";
import img3 from "../assets/hero3.jpeg";

const images = [img1, img2, img3];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt="Hero"
            className="w-full h-full object-cover scale-105"
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 text-white max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-fadeIn">
          Bhavika Art & Craft
        </h1>

        <p className="text-lg md:text-xl mb-8 opacity-90">
          Handcrafted treasures made with love and creativity.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/shop"
            className="bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
          >
            Shop Now
          </Link>

          <Link
            to="/about"
            className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-rose-500 transition-all duration-300 font-semibold hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;