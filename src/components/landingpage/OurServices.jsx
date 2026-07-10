import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard.jsx';
import { fetchServices } from '../../api.js';
// import icon1 from '../../assets/icon4.png';
// import icon2 from '../../assets/icon3.png';
// import icon3 from '../../assets/icon2.png';
// import icon4 from '../../assets/icon1.png';

function Services() {
  // const servicesData = [
  //   {
  //     id: 1,
  //     icon: icon1,
  //     title: "Brochure Printing",
  //     description: "High quality brochures for your business promotions",
  //   },
  //   {
  //     id: 2,
  //     icon: icon2,
  //     title: "Visiting Cards",
  //     description: "High quality brochures for your business promotions",
  //   },
  //   {
  //     id: 3,
  //     icon: icon3,
  //     title: "Calendar",
  //     description: "High quality brochures for your business promotions",
  //   },
  //   {
  //     id: 4,
  //     icon: icon4,
  //     title: "Poster Printing",
  //     description: "High quality brochures for your business promotions",
  //   },
  //   {
  //     id: 5,
  //     icon: icon1,
  //     title: "Custom Stickers",
  //     description: "High quality brochures for your business promotions",
  //   },
  // ];

  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetchServices()
      .then(data => setServicesData(data))
      .catch(err => console.error("Could not fetch active services:", err));
  }, []);

  return (
    <section className="w-screen bg-white py-10 px-16 md:px-12 lg:px-16">
      <div className="text-center mb-12">
        <h4 className="text-[#1A49C9] font-semibold uppercase text-3xl">
          What We Offer
        </h4>
        <h4 className="text-[#021335] md:text-6xl text-5xl font-bold mt-1 mb-4 tracking-tight">
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