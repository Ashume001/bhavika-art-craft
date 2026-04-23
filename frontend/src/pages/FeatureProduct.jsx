import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const safeProducts = Array.isArray(products) ? products : [];

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 8 }));
  }, [dispatch]);

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950">

      {/* Glow Background */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-rose-800/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-amber-700/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            Featured Creations
          </h2>
          <p className="text-gray-400 mt-3">
            Handcrafted pieces made with love & creativity
          </p>
        </div>

        {/* Slider */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            {[...safeProducts, ...safeProducts].map((product, index) => {
             const price = product.sizes?.[0]?.price || 0;
             const originalPrice = price + 500;

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="group min-w-[320px]
                    bg-white
                    rounded-3xl p-6
                    shadow-xl
                    hover:shadow-2xl
                    transition-all duration-500"
                >
                  <Link to={`/products/${product._id}`}>
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={`https://bhavikaartandcraft.com${product.images[0]}`}
                        alt={product.name}
                        className="w-full h-56 object-cover 
                          group-hover:scale-105 
                          transition duration-500"
                      />
                    </div>
                  </Link>

                  {/* Content */}
                  <div>
                    <h3 className="mt-5 text-lg font-semibold text-gray-800 group-hover:text-rose-600 transition">
                      {product.name}
                    </h3>

          
        {/* Price */}
        <div className="flex items-center gap-3 mt-3">
         <span className="text-xl font-bold text-grey-600">
          ₹ {price}
         </span>

         <span className="text-black-400 font-bold line-through text-sm">
           ₹ {originalPrice}
          </span>
          </div>

          <button
           onClick={() => navigate(`/products/${product._id}`)}
           className="mt-6 w-full 
              bg-gray-900 
              text-white py-2.5 rounded-full 
              font-medium
              hover:bg-amber-500
              hover:text-black
              transition duration-300"
          >
           Buy now
         </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;