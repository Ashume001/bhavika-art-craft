import { FaInstagram } from "react-icons/fa";

const InstagramButton = () => {
  return (
    <a
      href="https://www.instagram.com/bhavika_artcraft?igsh=NnNzdmx0amZtdDh2" 
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
    >
      <FaInstagram size={22} />
    </a>
  );
};

export default InstagramButton;