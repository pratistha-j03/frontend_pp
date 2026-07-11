function ServiceCard({ image, title, description }) {
  return (
    <div className="flex flex-col w-full h-full rounded-2xl overflow-hidden group bg-white shadow-[0_8px_25px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)] transition-all duration-300">
      <div className="relative w-full h-40 sm:h-40 md:h-44 overflow-hidden bg-gray-200 shrink-0">
        <img
          src={image || "/src/assets/pujaprinters.png"}
          alt={`${title} banner`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "/src/assets/pujaprinters.png";
          }}
        />
      </div>

      <div className="flex flex-col mt-4 overflow-hidden">
        <h3 className="text-xl font-extrabold text-[#0A1931] mb-2 truncate px-2 text-center">
          {title}
        </h3>

        <p className="text-gray-500 text-justify tracking-tight font-semibold text-base px-2 line-clamp-3 h-18">
          {description}
        </p>

        <div className="text-center w-full mt-3 mb-4">
          <a
            href={`/contact?source=${encodeURIComponent(title)}`}
            className="text-blue-600 font-semibold inline-flex items-center gap-1 hover:gap-3 transition-all duration-200"
          >
            Send Enquiry
          </a>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
