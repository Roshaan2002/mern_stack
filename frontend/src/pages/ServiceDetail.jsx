import React from "react";
import { useParams } from "react-router-dom";

const ServiceDetail = () => {
  const { id } = useParams();
  // Fetch detailed service data using the id, if needed

  return (
    <section className="service-detail">
      <h1>Service Details</h1>
      <p>Details for service ID: {id}</p>
      {/* Add more detailed information */}
    </section>
  );
};

export default ServiceDetail;
