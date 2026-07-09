import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/pujaprinters.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "HOME", link: "/" },
    { name: "SERVICES", link: "/services" },
    { name: "ABOUT", link: "/about" },
    { name: "CONTACT", link: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#02152E]/70 backdrop-blur-lg border-b border-white/10 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 relative">
          <div className="flex items-center">
            <img src={Logo} alt="Puja Printers" className="h-11 w-auto object-contain"/>
          </div>
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a key={link.name} href={link.link} className="text-white text-[20px] font-semibold tracking-wide hover:text-blue-300 transition duration-300">
                {link.name}
              </a>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-[#02152E]/90 backdrop-blur-xl border-t border-white/10 shadow-xl">
          <div className="flex flex-col px-6 py-5 space-y-5">
            {navLinks.map((link) => (
              <a key={link.name} href={link.link} className="text-white font-medium hover:text-blue-300 transition duration-300" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;