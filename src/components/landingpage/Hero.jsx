import { useState, useEffect } from 'react';
import { fetchBanners } from '../../api.js';
import hero1 from '../../assets/hero1.png';
import hero2 from '../../assets/hero2.png';
import hero3 from '../../assets/hero3.png';

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([hero1, hero2, hero3]);
  useEffect(() => {
    fetchBanners()
      .then((data) => {
        if (data && data.images && data.images.length > 0) setImages(data.images);
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

  return (
    <div className="w-full flex flex-col m-0 p-0 overflow-x-hidden">
      <section className="relative w-full min-h-150 md:min-h-140 flex items-center px-6 md:px-16 lg:px-24 py-12 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          {images.map((imgUrl, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={imgUrl} alt={`Background slide ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]"></div>
            </div>
          ))}
        </div>
        <div className="relative z-20 flex flex-col items-start text-left max-w-3xl">
          <span className="text-[#FFC107] font-bold text-xl mb-3">
            WE PRINT YOUR IMNAGINATIONS
          </span>
          <h1 className="text-white text-5xl md:text-7xl font-black tracking-wide mb-6 leading-tight drop-shadow-sm">
            PUJA <span className="text-[#3B82F6]">PRINTERS</span>
          </h1>
          <p className="text-slate-100 text-lg md:text-2xl font-medium leading-relaxed max-w-xl mb-10 drop-shadow-sm">
            Quality printing services for every need.<br />
            <span className="text-white-300 text-base md:text-xl font-normal">Fast. Reliable. Affordable.</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#1A49C9] text-white text-lg font-bold px-5 py-2.5 rounded-xl flex items-center hover:bg-[#153eb2] transition-colors duration-200 shadow-lg cursor-pointer md:text-lg">
              <a href="/services">Our Services</a>
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white font-bold px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors border border-white/20 shadow-md cursor-pointer text-lg md:text-lg">
              <a href="/contact">Contact Us</a>
            </button>
          </div>
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
    </div>
  );
}

export default Hero;