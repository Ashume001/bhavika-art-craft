import { Link } from "react-router-dom";
import aboutImg from "../assets/frames.jpg";

const About = () => {
  const features = [
    {
      title: "Handmade with Love",
      desc: "Every product is crafted carefully with passion and creativity.",
      icon: "💖",
    },
    {
      title: "Premium Quality",
      desc: "We use high-quality materials ensuring durability and elegance.",
      icon: "🏆",
    },
    {
      title: "Customer First",
      desc: "Your happiness is our priority. We value every customer deeply.",
      icon: "🤝",
    },
  ];

  return (
    <div className="bg-[#2c2c2c] text-gray-100">

      {/* 🔥 Hero Section */}
      <section className="relative py-28 text-center bg-gradient-to-r from-[#1b1b1b] to-[#3e2723] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">
            About Bhavika Art & Craft
          </h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            Where creativity meets elegance. Handmade pieces crafted
            with passion to add warmth and beauty to your space.
          </p>
        </div>
      </section>

      {/* 📖 Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="overflow-hidden rounded-3xl shadow-2xl">
          <img
            src={aboutImg}
            alt="About Us"
            className="w-full h-full object-cover hover:scale-105 transition duration-700"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold mb-6 text-gray-100">Our Story</h2>
          <div className="w-20 h-1 bg-[#6d4c41] mb-6"></div>

          <p className="leading-relaxed mb-6 text-gray-300">
            Bhavika Art & Craft started with a dream — to create meaningful handmade products that tell a story. Every item is designed and crafted with love and precision.
          </p>

          <p className="leading-relaxed text-gray-300">
            From elegant home décor to personalized creations, we believe art should inspire joy and reflect personality.
          </p>
        </div>
      </section>

      {/* 🎯 Mission & Vision */}
      <section className="bg-[#1f1f1f] py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">

          <div className="bg-[#2c2c2c] p-12 rounded-3xl shadow-lg hover:shadow-2xl transition duration-500 border border-gray-700 hover:border-rose-500">
            <h3 className="text-2xl font-semibold mb-4 text-[#e0c097]">
              Our Mission
            </h3>
            <p className="text-gray-300 leading-relaxed">
              To deliver handcrafted products that spread happiness
              and showcase creativity in every detail.
            </p>
          </div>

          <div className="bg-[#2c2c2c] p-12 rounded-3xl shadow-lg hover:shadow-2xl transition duration-500 border border-gray-700 hover:border-rose-500">
            <h3 className="text-2xl font-semibold mb-4 text-[#e0c097]">
              Our Vision
            </h3>
            <p className="text-gray-300 leading-relaxed">
              To become a trusted handmade brand known for
              quality, elegance, and customer satisfaction.
            </p>
          </div>

        </div>
      </section>

      {/* ⭐ Why Choose Us */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-100">Why Choose Us?</h2>

        <div className="grid md:grid-cols-3 gap-10">

          {features.map((item, index) => (
            <div
              key={index}
              className="relative p-10 rounded-3xl border border-transparent bg-white/10 backdrop-blur-md shadow-md hover:shadow-2xl hover:border-rose-500 transition duration-500 flex flex-col items-center text-center"
            >
              <div className="text-4xl mb-6">{item.icon}</div>
              <h4 className="text-xl font-semibold mb-4 text-[#e0c097]">
                {item.title}
              </h4>
              <p className="text-gray-200 leading-relaxed">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* 🚀 Call To Action */}
      <section className="bg-gradient-to-r from-[#3e2723] to-[#1b1b1b] text-white py-24 text-center">
        <h2 className="text-4xl font-bold mb-8">
          Discover Our Handmade Collection
        </h2>
        <Link
          to="/shop"
          className="bg-[#e0c097] text-[#3e2723] px-10 py-4 rounded-full font-semibold hover:bg-[#f5deb3] transition duration-300 shadow-lg"
        >
          Visit Shop
        </Link>
      </section>

    </div>
  );
};

export default About;