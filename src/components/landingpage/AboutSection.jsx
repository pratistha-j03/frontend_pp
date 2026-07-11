import aboutImage from "../../assets/printers.png";

function AboutSection() {
  const bulletPoints = [
    "Business Cards, Brochures & Flyers",
    "Wedding Cards & Invitation Printing",
    "High-Quality Printing with Sharp & Vibrant Results",
  ];

  return (
    <section className="pt-4 pb-16 px-6 md:px-16 lg:px-24 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Image */}
        <div className="relative w-full aspect-square max-w-md mx-auto">
          <div className="absolute top-0 left-0 w-1/3 aspect-square rounded-3xl bg-[#FFC107]"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-1/2 w-[90%] aspect-[4/3] rounded-3xl bg-[#E0E0E0] shadow-sm z-10 overflow-hidden">
            <img
              src={aboutImage}
              alt="Our Printing Workshop"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-1/2 aspect-[2/1] rounded-3xl bg-[#1A49C9] z-20"></div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-start text-left">
          <h2 className="text-[#021335] text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-lg mb-6">
            Your Trusted <br />
            <span className="text-[#1A49C9]">Printing Partner</span>
          </h2>

          <p className="text-black text-lg md:text-base leading-relaxed mb-6 max-w-md">
            We help businesses and individuals bring their ideas to life through
            premium printing services.
          </p>

          <ul className="space-y-4 mb-8">
            {bulletPoints.map((point, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-[#1A49C9]"></div>
                <span className="text-black text-base md:text-lg">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {/* Button */}
          <div className="w-full flex justify-center lg:justify-start">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-[#1A49C9] text-white text-lg md:text-xl font-bold px-6 py-3 rounded-xl hover:bg-blue-900 transition-colors duration-200 shadow-md"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;