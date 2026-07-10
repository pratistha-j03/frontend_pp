
function FeatureCard({ icon, title }) {
  return (
    <div className="bg-[#122247]/60 border border-slate-700/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-[#122247]/90 hover:-translate-y-1 group">
      
      {/* Dynamic Blue Circle Container */}
      <div className="w-16 h-16 rounded-full bg-[#1A49C9] flex items-center justify-center mb-5 shadow-lg shadow-blue-600/10 transition-transform duration-300 group-hover:scale-110">
        {/* Render the Lucide icon directly inside the node */}
        {icon}
      </div>

      {/* Feature Text Header */}
      <h3 className="text-white font-bold text-base md:text-lg tracking-wide group-hover:text-blue-400 transition-colors duration-200">
        {title}
      </h3>

    </div>
  );
}

export default FeatureCard;