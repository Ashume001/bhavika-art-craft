import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PremiumCTA = () => {
  return (
    <section className="relative py-28 bg-gradient-to-br from-black via-gray-950 to-black overflow-hidden">
      
      {/* Subtle Gold Glow Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.08),_transparent_70%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto text-center px-6"
      >
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide leading-tight">
          Crafted With Passion.
          <span className="block bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mt-3">
            Designed For Your Special Moments.
          </span>
        </h2>

        {/* Description */}
        <p className="text-gray-400 mt-6 text-lg leading-relaxed">
          Discover timeless handmade creations that bring elegance, warmth,
          and beauty into every celebration.
        </p>

        {/* Button */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">

  <Link
    to="/shop"
    className="w-64 text-center 
               inline-flex justify-center items-center
               px-10 py-4 rounded-full 
               bg-gradient-to-r from-amber-400 to-yellow-500 
               text-black font-semibold tracking-wide
               shadow-lg shadow-amber-500/30
               hover:scale-105 hover:shadow-amber-500/50
               transition duration-300"
  >
    Explore Collection →
  </Link>

  <Link
    to="/contact"
    className="w-64 text-center 
               inline-flex justify-center items-center
               px-10 py-4 rounded-full 
               bg-gradient-to-r from-amber-400 to-yellow-500 
               text-black font-semibold tracking-wide
               shadow-lg shadow-amber-500/30
               hover:scale-105 hover:shadow-amber-500/50
               transition duration-300"
  >
    Contact Us →
  </Link>

</div>
      </motion.div>
    </section>
  );
};

export default PremiumCTA;