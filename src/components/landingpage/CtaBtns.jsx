import { Link } from "react-router-dom";

const CTAButtons = () => {
  return (
    <section className="py-4">
      <div className="flex flex-row justify-center items-center gap-4">
        {/* Our Services */}
        <Link to="/services">
          <button className="group bg-[#02152E] border-2 border-[#02152E] text-white text-base md:text-lg font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:bg-[#FFD200] hover:border-[#FFD200] hover:text-black transition-all duration-300 cursor-pointer">
            Our Services
            
          </button>
        </Link>

        {/* Contact Us */}
        <Link to="/contact">
          <button className="group bg-[#02152E] border-2 border-[#02152E] text-white text-base md:text-lg font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:bg-[#FFD200] hover:border-[#FFD200] hover:text-black transition-all duration-300 cursor-pointer">
            Contact Us
            
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CTAButtons;