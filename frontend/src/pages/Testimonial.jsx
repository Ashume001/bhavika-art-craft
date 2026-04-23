import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Rampal yogi",
    text: "Absolutely loved the craftsmanship. The detailing is stunning and packaging was beautiful!",
  },
  {
    name: "Anjali Verma",
    text: "Perfect gift for my sister. The quality exceeded my expectations.",
  },
  {
    name: "Ritika Jain",
    text: "You can truly feel the passion in every handmade piece. Highly recommended!",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-950 via-black to-gray-900">
      
      {/* Heading */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl font-bold text-white mb-4 tracking-wide">
          What Our Customers Say
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Trusted by hundreds of happy customers who cherish handmade elegance.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="relative bg-white/10 backdrop-blur-lg 
                       border border-white/20 
                       rounded-3xl p-8 shadow-2xl"
          >
            {/* Stars */}
            <div className="flex mb-4 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Text */}
            <p className="text-gray-200 leading-relaxed mb-6">
              "{item.text}"
            </p>

            {/* Name */}
            <h4 className="text-white font-semibold tracking-wide">
              — {item.name}
            </h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;