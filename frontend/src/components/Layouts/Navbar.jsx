import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("adminToken");
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-4 group">

          {/* Bigger Logo */}
          <div className="h-16 w-16 md:h-18 md:w-18 rounded-full border border-gray-300 bg-white shadow-md flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="Bhavika Art & Craft"
              className="h-14 w-14 object-contain group-hover:scale-105 transition duration-300"
            />
          </div>

          <span className="text-2xl font-semibold text-gray-800 tracking-wide">
            Bhavika Art & Craft
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10 text-gray-700 font-medium">

          {["Home", "Shop", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative group"
            >
              <span className="hover:text-black transition duration-300">
                {item}
              </span>

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300 font-medium"
          >
            Cart
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs min-w-[22px] h-[22px] px-1 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* Admin */}
          {token ? (
            <Link
              to="/admin/dashboard"
              className="text-sm text-gray-600 hover:text-black transition"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="text-sm text-gray-600 hover:text-black transition"
            >
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-3xl text-gray-700 hover:text-black transition"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <nav className="flex flex-col px-6 py-6 gap-5 text-gray-700 font-medium">

              {["Home", "Shop", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={toggleMenu}
                  className="hover:text-black transition"
                >
                  {item}
                </Link>
              ))}

              <Link
                to="/cart"
                onClick={toggleMenu}
                className="border border-gray-300 px-4 py-2 rounded-full text-center hover:bg-gray-100 transition"
              >
                Cart ({totalQuantity})
              </Link>

              {token ? (
                <Link
                  to="/admin/dashboard"
                  onClick={toggleMenu}
                  className="hover:text-black"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={toggleMenu}
                  className="hover:text-black"
                >
                  Admin
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;