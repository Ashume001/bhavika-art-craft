import { motion } from "framer-motion";
import { Link } from "react-router-dom";


import resinImg from "../assets/resinArt.jpg";
import giftsImg from "../assets/gift.jpg";
import decorImg from "../assets/decorImg.jpg";
import framesImg from "../assets/frames.jpg";

const categories = [
  {
    name: "Resin Art",
    image: resinImg,
    slug: "resin-art",
  },
  {
    name: "Handmade Gifts",
    image: giftsImg,
    slug: "handmade-gifts",
  },
  {
    name: "Home Decor",
    image: decorImg,
    slug: "home-decor",
  },
  {
    name: "Customized Frames",
    image: framesImg,
    slug: "custom-frames",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      
      {/* Heading */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide">
          Explore Our Categories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover beautifully handcrafted collections designed with passion and creativity.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer"
          >
            <Link to={`/shop?category=${category.slug}`}>
              
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-80 object-cover 
                           transform group-hover:scale-110 
                           transition duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 
                              group-hover:bg-black/60 
                              transition duration-500" />

              {/* Text */}
              <div className="absolute inset-0 flex flex-col 
                              justify-center items-center text-white text-center px-4">
                <h3 className="text-2xl font-semibold tracking-widest uppercase">
                  {category.name}
                </h3>
                <span className="mt-4 text-sm tracking-[3px] text-amber-300">
                  Shop Now →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;