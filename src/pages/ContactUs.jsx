import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { fetchBanners, sendContactMessage } from "./../api.js";
import hero1 from "./../assets/hero1.png";
import hero2 from "./../assets/hero2.png";
import hero3 from "./../assets/hero3.png";

const validate = (name, value) => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required.";
      if (value.trim().length < 2) return "Name must be at least 2 characters.";
      if (value.trim().length > 60) return "Name must be under 60 characters.";
      if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return "Name can only contain letters, spaces, hyphens and apostrophes.";
      return "";

    case "email":
      if (!value.trim()) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Please enter a valid email address.";
      return "";

    case "phone":
      if (!value.trim()) return "";                       
      if (!/^[+]?[\d\s\-().]{7,15}$/.test(value.trim())) return "Please enter a valid phone number.";
      return "";

    case "subject":
      if (!value.trim()) return "Subject is required.";
      if (value.trim().length < 3) return "Subject must be at least 3 characters.";
      if (value.trim().length > 100) return "Subject must be under 100 characters.";
      return "";

    case "message":
      if (!value.trim()) return "Message is required.";
      if (value.trim().length < 10) return "Message must be at least 10 characters.";
      if (value.trim().length > 1000) return "Message must be under 1000 characters.";
      return "";

    default:
      return "";
  }
};

const validateAll = (formData) => ({
  name: validate("name", formData.name),
  email: validate("email", formData.email),
  phone: validate("phone", formData.phone),
  subject: validate("subject", formData.subject),
  message: validate("message", formData.message),
});

const ContactUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([hero1, hero2, hero3]);

  useEffect(() => {
    fetchBanners()
      .then((data) => {
        if (data && data.images && data.images.length > 0)
          setImages(data.images);
      })
      .catch((err) => console.error("Could not load database banners:", err));
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false,
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = { name: true, email: true, phone: true, subject: true, message: true };
    setTouched(allTouched);
    const errors = validateAll(formData);
    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some(Boolean);
    if (hasErrors) return;

    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    try {
      const data = await sendContactMessage(formData);

      if (data?.error) throw new Error(data.error);

      setStatusMessage({
        type: "success",
        text: "Message sent successfully! We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTouched({ name: false, email: false, phone: false, subject: false, message: false });
      setFieldErrors({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full border rounded-lg px-4 py-3 outline-none transition focus:ring-2 ${
      touched[field] && fieldErrors[field]
        ? "border-red-400 focus:ring-red-300 bg-red-50"
        : "border-gray-300 focus:ring-blue-500"
    }`;

  const ErrorMsg = ({ field }) =>
    touched[field] && fieldErrors[field] ? (
      <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors[field]}</p>
    ) : null;

  return (
    <div className="w-full bg-white mx-auto text-left">

      {/* Hero Section */}
      <section className="relative w-full min-h-120 md:min-h-130 flex items-center px-6 md:px-16 lg:px-24 py-12 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          {images.map((imgUrl, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={imgUrl} alt={`Background slide ${index + 1}`} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-slate-950/40"></div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 h-2.5 rounded-full cursor-pointer ${index === currentSlide ? 'w-8 bg-[#FFC107]' : 'w-2.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Side */}
          <div>
            <h2 className="text-4xl font-bold mb-4 text-black">GET IN TOUCH</h2>
            <p className="text-gray-600 mb-8 pb-6">
              Need high-quality printing services or have a custom printing
              requirement? Contact Puja Printers, and we will be happy to assist
              you.
            </p>

            <div className="border rounded-2xl p-5 flex items-center gap-4 mb-6 shadow-sm">
              <div className="bg-red-100 p-4 rounded-xl">
                <FaMapMarkerAlt className="text-red-500 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Our Location</h3>
                <p className="text-gray-500 text-sm">
                  Rajendra Prasad Colony (West), Gorakhnath, Gorakhpur - 273010 (U.P)
                </p>
              </div>
            </div>

            <div className="border rounded-2xl p-5 flex items-center gap-4 mb-6 shadow-sm">
              <div className="bg-green-100 p-4 rounded-xl">
                <FaEnvelope className="text-green-500 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Mail Us</h3>
                <p className="text-gray-500 text-sm">pujaprinters@gmail.com</p>
              </div>
            </div>

            <div className="border rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-blue-100 p-4 rounded-xl">
                <FaPhoneAlt className="text-blue-500 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Call Us</h3>
                <p className="text-gray-500 text-sm">+91 8127918160</p>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="border rounded-3xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold mb-6">SEND US A MESSAGE</h2>

            {statusMessage.text && (
              <div
                className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
                  statusMessage.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>

              {/* Name + Email row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your Name"
                    className={inputClass("name")}
                  />
                  <ErrorMsg field="name" />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@example.com"
                    className={inputClass("email")}
                  />
                  <ErrorMsg field="email" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Phone No. 
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 98765 43210"
                  className={inputClass("phone")}
                />
                <ErrorMsg field="phone" />
              </div>

              {/* Subject */}
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="What is this regarding?"
                  className={inputClass("subject")}
                />
                <ErrorMsg field="subject" />
              </div>

              {/* Message */}
              <div>
                <label className="mb-1 text-sm font-medium flex justify-between">
                  <span>Message <span className="text-red-500">*</span></span>
                  <span className={`text-xs font-normal ml-auto ${formData.message.length > 950 ? "text-red-500" : "text-gray-400"}`}>
                    {formData.message.length}/1000
                  </span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell us how we can help you…"
                  rows="5"
                  maxLength={1000}
                  className={`${inputClass("message")} resize-none`}
                />
                <ErrorMsg field="message" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;