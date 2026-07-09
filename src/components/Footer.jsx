import {
  MapPin,
  Phone,
  Mail,
  Heart,
  Copyright,
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import Logo from "../assets/pujaprinters.png";

const Footer = () => {
  return (
    <footer className="bg-[#02152E] text-white">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 py-10">

        {/* Top Section */}
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-16">

          {/* Left Section */}
          <div>
            {/* Logo */}
            <img
              src={Logo}
              alt="Puja Printers"
              className="h-10 mb-6"
            />

            {/* Address */}
            <div className="flex gap-3 mb-5">
              <MapPin size={24} className="mt-1 flex-shrink-0" />
              <p className="text-base">
                Rajendra Prasad Colony (West),
                <br />
                Gorakhnath, Gorakhpur - 273010 (U.P)
              </p>
            </div>

            {/* Phone */}
            <div className="flex gap-3 mb-5">
              <Phone size={24} />
              <p className="text-base">+91 8127918160</p>
            </div>

            {/* Email */}
            <div className="flex gap-3">
              <Mail size={24} />
              <p className="text-base">pujaprinters@gmail.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:pl-8">
            <h3 className="text-xl font-bold mb-6 text-white">
              QUICK LINKS
            </h3>

            <ul className="space-y-4 text-base">
              <li>
                <a href="/" className="hover:text-blue-300">
                  HOME
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-blue-300">
                  ABOUT
                </a>
              </li>

              <li>
                <a href="/services" className="hover:text-blue-300">
                  SERVICES
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-blue-300">
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">
              SOCIAL MEDIA
            </h3>

            <div className="space-y-5 text-base">

              <a
                href="#"
                className="flex items-center gap-3 hover:text-blue-300"
              >
                <FaInstagram size={28} />
                INSTAGRAM
              </a>

              <a
                href="#"
                className="flex items-center gap-3 hover:text-blue-300"
              >
                <FaFacebookF size={28} />
                FACEBOOK
              </a>

              <a
                href="#"
                className="flex items-center gap-3 hover:text-blue-300"
              >
                <FaYoutube size={28} />
                YOUTUBE
              </a>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 mt-8 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">

            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Copyright size={18} />
              <span>
                2026 Puja Printers. All Rights Reserved
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-300 mt-3 md:mt-0 text-sm">
              <span>Developed with</span>
              <Heart size={16} fill="white" />
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;