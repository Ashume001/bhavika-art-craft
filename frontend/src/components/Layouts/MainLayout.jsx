
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "../Whatsappbutton";
import InstagramButton from "../Instagrambutton";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#fff5f2] via-[#fffaf7] to-[#fdf6f0]">
      <Navbar />
      {/* OFFER BAR */}
      <div className="bg-black text-white overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex gap-16 py-2 text-sm font-medium">
          <span>📞 Call Now: 9521376243</span>
          <span>🎁 Use Code: WELCOME10 & Get ₹100 OFF</span>
          <span>🚚 Free Delivery on Orders Above ₹500</span>
          <span>📞 Call Now: 9636004265</span>
          <span>🎁 Use Code: WELCOME10 & Get ₹100 OFF</span>
        </div>
      </div>

      <main className="flex-grow">
        {children}
      </main>

     <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
       <WhatsAppButton />
       <InstagramButton />
     </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
