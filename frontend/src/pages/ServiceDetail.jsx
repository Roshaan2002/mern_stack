import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  console.log("Captured ID:", id); // Check if the id is being captured

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/services/${id}`);
      if (!response.ok) {
        throw new Error("Service not found");
      }
      const data = await response.json();
      setService(data);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  if (!service) return <p className="main-heading">Loading...</p>;

  return (
    <div>
      <h1>Service Details</h1>
      <h2>{service.name}</h2>
      <p>{service.description}</p>
      <p>Price: {service.price}</p>
    </div>
  );
};

export default ServiceDetail;
