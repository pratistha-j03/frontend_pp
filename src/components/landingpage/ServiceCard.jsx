function ServiceCard({ icon, image, title, description }) {
  return (
    <div className="flex flex-col items-center text-center group mx-auto">
      <div className="relative w-full aspect-4/3 bg-gray-200 rounded-2xl mb-4 overflow-visible shadow-sm">
        <div className="absolute -top-5 left-6 w-11 h-11 drop-shadow-md">
          <img src={icon} alt={`${title} icon`} className="w-full h-full object-contain"/>
        </div>
        <img 
          src={image || '/src/assets/pujaprinters.png'} 
          alt={`${title} banner`} 
          className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
          onError={(e) => {
            e.target.src = '/src/assets/pujaprinters.png';
          }}
        />
      </div>
      <div>
        <h3 className="text-xl font-extrabold text-[#0A1931] mb-2">{title}</h3>
        <p className="text-gray-500 text-justify tracking-tight font-semibold text-base mb-3 px-2">
          {description}
        </p>
        <a href="#" className="text-blue-600 font-semibold -ml-28 text-base gap-1 hover:gap-3 transition-all duration-200"> Learn More <span className="text-lg">➔</span>
        </a>
      </div>
    </div>
  );
}

export default ServiceCard;