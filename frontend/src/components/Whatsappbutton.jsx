import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919521376243"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppButton;