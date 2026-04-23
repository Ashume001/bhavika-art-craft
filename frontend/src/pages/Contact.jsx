import { useState } from "react";
import api from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/orders", {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.message,
        totalAmount: 0,
        orderItems: [],
      });

      alert("Message sent successfully! 🎉");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#2a0610] via-[#3a0a14] to-black text-white overflow-hidden">

      {/* Soft Glow Effects */}
      <div className="absolute top-[-150px] left-[-120px] w-[400px] h-[400px] bg-amber-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-150px] right-[-120px] w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative py-28 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          We'd love to hear from you. Whether it’s a custom order or a simple question,
          our team is here to assist you.
        </p>
      </section>

      {/* Contact Section */}
      <section className="relative max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-16">

        {/* Info Cards */}
        <div className="space-y-8">
          {[
            { title: "Email Us", value: "support@bhavikaart.com" },
            { title: "Call Us", value: "+91 9521376243" },
            { title: "Visit Us", value: "Jaipur, Rajasthan, India" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-xl hover:border-amber-400 hover:shadow-amber-400/20 hover:scale-[1.03] transition duration-500"
            >
              <h3 className="text-2xl font-semibold mb-3 text-amber-400">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl flex flex-col gap-6"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="bg-black/40 border border-white/20 px-4 py-3 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 outline-none transition duration-300"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="bg-black/40 border border-white/20 px-4 py-3 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 outline-none transition duration-300"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Contact Number"
            required
            className="bg-black/40 border border-white/20 px-4 py-3 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 outline-none transition duration-300"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            rows="6"
            className="bg-black/40 border border-white/20 px-4 py-3 rounded-xl focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 outline-none transition duration-300"
          ></textarea>

          <button
            type="submit"
            className="relative overflow-hidden bg-gradient-to-r from-amber-400 to-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition duration-300 shadow-lg"
          >
            Send Message
          </button>
        </form>

      </section>
    </div>
  );
};

export default Contact;