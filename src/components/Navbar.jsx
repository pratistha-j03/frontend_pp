// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import Logo from "../assets/logoPP.png";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = [
//     { name: "HOME", link: "/" },
//     { name: "SERVICES", link: "/services" },
//     { name: "ABOUT", link: "/about" },
//     { name: "CONTACT", link: "/contact" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-[#02152E]/70 backdrop-blur-lg border-b border-white/10 shadow-lg z-50">
//       <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-14 relative">
//           <div className="flex items-center">
//             <img src={Logo} alt="Puja Printers" className="h-11 w-auto object-contain"/>
//           </div>
//           <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
//             {navLinks.map((link) => (
//               <a key={link.name} href={link.link} className="text-white text-[20px] font-semibold tracking-wide hover:text-blue-300 transition duration-300">
//                 {link.name}
//               </a>
//             ))}
//           </div>
//           <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={30} /> : <Menu size={30} />}
//           </button>
//         </div>
//       </div>
//       <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
//         <div className="bg-[#02152E]/90 backdrop-blur-xl border-t border-white/10 shadow-xl">
//           <div className="flex flex-col px-6 py-5 space-y-5">
//             {navLinks.map((link) => (
//               <a key={link.name} href={link.link} className="text-white font-medium hover:text-blue-300 transition duration-300" onClick={() => setIsOpen(false)}>
//                 {link.name}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState, useEffect } from "react";
import {
  Menu,
  X,
  CalendarDays,
  Phone,
  Mail,
} from "lucide-react";
import Logo from "../assets/logoPP.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const navLinks = [
    { name: "HOME", link: "/" },
    { name: "SERVICES", link: "/services" },
    { name: "ABOUT", link: "/about" },
    { name: "CONTACT", link: "/contact" },
  ];

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">

        {/* Top Info Bar */}
        <div className="hidden lg:flex justify-between items-center bg-[#FFC107] text-black text-sm px-8 py-1">

          {/* Left */}
          <div className="flex items-center gap-2">
            <CalendarDays size={14} />
            <span className="font-medium">
              {currentDate} | {currentTime}
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-8">

            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+91 8127918160</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>pujaprinters@gmail.com</span>
            </div>

            <span>
              <strong>GSTIN:</strong> 09AMZPC3750E1ZU
            </span>

          </div>
        </div>

        {/* Navbar */}
        <nav className="w-full bg-[#02152E]/90 backdrop-blur-lg border-b border-white/10 shadow-lg">

          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

            <div className="flex items-center justify-between h-12 relative">

              {/* Logo */}
              <div className="flex items-center">
                <img
                  src={Logo}
                  alt="Puja Printers"
                  className="h-9 w-auto object-contain"
                />
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.link}
                    className="text-white text-[20px] font-semibold tracking-wide hover:text-blue-300 transition duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Mobile Button */}
              <button
                className="md:hidden text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>

            </div>

          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-[#02152E]/90 backdrop-blur-xl shadow-xl">

              <div className="flex flex-col px-6 py-5 space-y-5">

                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.link}
                    onClick={() => setIsOpen(false)}
                    className="text-white font-medium hover:text-blue-300 transition duration-300"
                  >
                    {link.name}
                  </a>
                ))}

                <hr className="border-white/20" />

                <span className="text-white text-sm">
                  ☎ +91 8127918160
                </span>

                <span className="text-white text-sm">
                  ✉ pujaprinters@gmail.com
                </span>

                <span className="text-white text-sm">
                  GSTIN: 09AMZPC3750E1ZU
                </span>

                <span className="text-white text-sm">
                  📅 {currentDate}
                </span>

                <span className="text-white text-sm">
                  🕒 {currentTime}
                </span>

              </div>

            </div>
          </div>

        </nav>

      </div>

      <div className="h-12 lg:h-17" />
    </>
  );
};

export default Navbar;

