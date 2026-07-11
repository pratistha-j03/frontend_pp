import { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard.jsx";
import { fetchServices } from "../../api.js";

function Services() {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetchServices()
      .then((data) => setServicesData(data))
      .catch((err) =>
        console.error("Could not fetch active services:", err)
      );
  }, []);

  return (
    <section className="w-full bg-white py-10 px-3 sm:px-6 md:px-12 lg:px-16">
      
      <div className="text-center mb-12">
        <h4 className="text-[#1A49C9] font-semibold uppercase text-3xl">
          What We Offer
        </h4>

        <h4 className="text-[#021335] text-5xl md:text-6xl font-bold mt-1 mb-4 tracking-tight">
          Our Services
        </h4>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 mt-16">
        {servicesData.map((service) => (
          <ServiceCard
            key={service._id}
            image={service.image}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>

    </section>
  );
}

export default Services;