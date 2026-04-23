import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#2a0610] via-[#3a0a14] to-black text-gray-300 mt-1">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            
            {/* Circular Logo */}
            <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg shadow-amber-400/20">
              <img
                src={logo}
                alt="Bhavika Logo"
                className="h-full w-full object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Bhavika Art & Craft
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-gray-400 mb-6">
            Discover handcrafted treasures made with passion and creativity.
            Every piece tells a story of tradition and elegance.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/bhavika_artcraft?igsh=NnNzdmx0amZtdDh2"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 p-3 rounded-full hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-500/30 hover:scale-110 transition duration-300"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/919636004265?text=Hello%20The%20Bhavika%20Art%20And%20Craft!,%20I%20want%20to%20enquire"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 p-3 rounded-full hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/30 hover:scale-110 transition duration-300"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.facebook.com/share/1FYyxHcW13/"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 p-3 rounded-full hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-110 transition duration-300"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-amber-400 mb-6">
            Explore
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-amber-400 hover:pl-2 transition-all duration-300">Home</Link></li>
            <li><Link to="/shop" className="hover:text-amber-400 hover:pl-2 transition-all duration-300">Shop</Link></li>
            <li><Link to="/about" className="hover:text-amber-400 hover:pl-2 transition-all duration-300">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-amber-400 hover:pl-2 transition-all duration-300">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-amber-400 mb-6">
            Get in Touch
          </h3>
          <p className="text-sm text-gray-400 mb-2">
             Address - Rajawss bus stand near R.S hospital jaipur Rajasthan pincode 302013
          </p>

          <p className="text-sm text-gray-400 mb-2">
            📧 support@bhavikaart.com
          </p>
          
          <p className="text-sm text-gray-400 mb-2">
            📞 +91 9636004265 / 9521376243
          </p>
          <p className="text-sm text-gray-500 mt-4">
            We respond within 24 hours.
          </p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 text-center py-6 text-sm text-gray-500 bg-black/40 backdrop-blur-md">
        <p>
          © {new Date().getFullYear()} Bhavika Art & Craft. All Rights Reserved.
        </p>
        <p className="mt-1 text-gray-600">
          Crafted with ❤️ in India.
        </p>
      </div>

    </footer>
  );
};

export default Footer;