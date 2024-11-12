import React from "react";
import { useAuth } from "../store/auth";

const Service = () => {
  const { services } = useAuth();

  return (
    <section className="section-services">
      <div>
        <h1 className="main-heading">Our Services</h1>
        {services && services.length > 0 ? (
          <div className="service-container grid grid-three-cols">
            {services.map((curService, index) => {
              const { price, provider, service, description, image } = curService;
              const imageUrl = image
                ? `http://localhost:5000${image}` // Full URL for image
                : "/uploads/service-admin.png"; // Fallback to default image

              return (
                <div className="card" key={index}>
                  <div className="card-image">
                    <img
                      src={imageUrl} // Use the dynamic image URL
                      alt={service}
                      width="400"
                    />
                  </div>
                  <div className="card-details">
                    <div className="grid grid-two-cols">
                      <p>{provider}</p>
                      <p>{price}</p>
                    </div>
                    <h2>{service}</h2>
                    <p>{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h4>No services available.</h4>
        )}
      </div>
    </section>
  );
};

export default Service;