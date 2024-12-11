import React from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom"; // Import Link for navigation

const Service = () => {
  const { services } = useAuth();

  return (
    <section className="section-services">
      <div>
        <h1 className="main-heading">Our Services</h1>
        {services && services.length > 0 ? (
          <div className="service-container grid grid-three-cols">
            {services.map((curService, index) => {
              const { id, price, provider, service, description, image } =
                curService;

              // Dynamically construct the image URL or use the fallback
              const imageUrl =
                image && image.startsWith("/uploads")
                  ? `http://localhost:5000${image}`
                  : "/images/service-admin.png";

              return (
                <div className="card" key={index}>
                  <div className="card-image">
                    <img src={imageUrl} alt={service} width="400" />
                  </div>
                  <div className="card-details">
                    <div className="grid grid-two-cols">
                      <p className="service-provider">{provider}</p>
                      <p className="service-price">{price}</p>
                    </div>
                    <h2>{service}</h2>
                    <p className="service-description">{description}</p>
                    <Link to={`/services/${id}`} className="read-more-button">
                      Read More
                    </Link>
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
