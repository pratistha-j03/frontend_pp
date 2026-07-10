function ServiceCard({ icon, image, title, description }) {
  return (
    <div className="flex flex-col h-full group">
      <div className="relative w-full h-44 sm:h-48 md:h-52 rounded-2xl overflow-hidden bg-gray-200 shadow-sm">
        <div className="absolute -top-5 left-6 w-11 h-11 z-10">
          <img
            src={icon}
            alt={`${title} icon`}
            className="w-full h-full object-contain"
          />
        </div>
        <img src={image || "/src/assets/pujaprinters.png"} alt={`${title} banner`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/src/assets/pujaprinters.png";
          }}
        />
      </div>
      <div className="flex flex-col flex-1 mt-4 text-center">
        <h3 className="text-xl font-extrabold text-[#0A1931] mb-2">
          {title}
        </h3>
        <p className="text-gray-500 text-justify tracking-tight font-semibold text-base px-2 flex-1">
          {description}
        </p>
        <a href="#" className="mt-4 text-blue-600 font-semibold inline-flex items-center gap-1 hover:gap-3 transition-all duration-200">
          Learn More <span className="text-lg">➔</span>
        </a>
      </div>
    </div>
  );
}

export default ServiceCard;