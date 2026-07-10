function ServiceCard({ icon, image, title, description }) {
  return (
    // Removed h-95. Let the card hug its content naturally. 
    // If you are using a CSS grid, h-full works best here.
    <div className="flex flex-col w-full h-full group overflow-hidden">
      
      {/* Image Container */}
      <div className="relative w-full h-36 sm:h-40 md:h-44 rounded-2xl overflow-hidden bg-gray-200 shadow-sm shrink-0">
        <div className="absolute top-3 left-4 w-12 h-12 z-10">
          <img src={icon} alt={`${title} icon`} className="w-full h-full object-contain drop-shadow-md"/>
        </div>
        <img src={image || "/src/assets/pujaprinters.png"} alt={`${title} banner`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/src/assets/pujaprinters.png";
          }}
        />
      </div>
      
      {/* Text Container */}
      <div className="flex flex-col mt-4 overflow-hidden">
        <h3 className="text-xl font-extrabold text-[#0A1931] mb-2 truncate px-2 text-center">
          {title}
        </h3>
        
        {/* CHANGED to a strict height: h-[4.5rem]. 
            This locks the text box to exactly 3 lines tall. */}
        <p className="text-gray-500 text-justify tracking-tight font-semibold text-base px-2 line-clamp-3 h-[4.5rem]">
          {description}
        </p>
        
        {/* REMOVED mt-auto. Replaced with mt-3 for a tight, fixed gap. */}
        <div className="text-left w-full px-2 mt-3 mb-2">
          <a href="#" className="text-blue-600 font-semibold inline-flex items-center gap-1 hover:gap-3 transition-all duration-200">
            Learn More <span className="text-lg">➔</span>
          </a>
        </div>
      </div>
      
    </div>
  );
}

export default ServiceCard;