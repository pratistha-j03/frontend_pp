function FeatureCard({ icon, title }) {
  return (
    <div className="bg-[#1C2A44] border border-slate-700/20 rounded-3xl py-7 px-3 flex flex-col items-center justify-center text-center min-h-37.5 transition-transform duration-200 hover:scale-105">
      <div className="w-14 h-14 rounded-full bg-[#1A49C9]/20 flex items-center justify-center mb-4">
        <img src={icon} alt={title} className="w-2xl h-2xl object-contain"/>
      </div>
      <h4 className="text-white font-medium text-sm md:text-base px-2 max-w-37.5 leading-snug">
        {title}
      </h4>
    </div>
  );
} 

export default FeatureCard;