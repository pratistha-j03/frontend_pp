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
    </div>
  );
}

export default Hero;