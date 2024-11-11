import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [serviceData, setServiceData] = useState({
    service: "",
    provider: "",
    price: "",
    description: "",
    image: null,
  });
  const { authorizationToken } = useAuth();

  // Fetch all services
  const getAllServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/services", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    setServiceData({ ...serviceData, image: e.target.files[0] });
  };

  // Add a new service
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("service", serviceData.service);
    formData.append("provider", serviceData.provider);
    formData.append("price", serviceData.price);
    formData.append("description", serviceData.description);
    if (serviceData.image) formData.append("image", serviceData.image);

    try {
      const response = await fetch("http://localhost:5000/api/admin/services/add", {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });
      if (response.ok) {
        toast.success("Service added successfully!");
        getAllServices(); // Refresh services list
        setServiceData({ service: "", provider: "", price: "", description: "", image: null });
      } else {
        toast.error("Failed to add service");
      }
    } catch (error) {
      toast.error("Error adding service");
      console.error("Error:", error);
    }
  };

  // Delete service
  const deleteService = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/services/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        toast.success("Service deleted successfully!");
        getAllServices(); // Refresh services list
      } else {
        toast.error("Failed to delete service");
      }
    } catch (error) {
      toast.error("Error deleting service");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <div className="admin-services-container">
      <h1 className="admin-services-header">Admin Services Panel</h1>
      <form className="admin-services-form" onSubmit={handleSubmit}>
        <input
          className="admin-services-input"
          type="text"
          placeholder="Service Name"
          value={serviceData.service}
          onChange={(e) => setServiceData({ ...serviceData, service: e.target.value })}
        />
        <input
          className="admin-services-input"
          type="text"
          placeholder="Provider"
          value={serviceData.provider}
          onChange={(e) => setServiceData({ ...serviceData, provider: e.target.value })}
        />
        <input
          className="admin-services-input"
          type="text"
          placeholder="Price"
          value={serviceData.price}
          onChange={(e) => setServiceData({ ...serviceData, price: e.target.value })}
        />
        <textarea
          className="admin-services-textarea"
          placeholder="Description"
          value={serviceData.description}
          onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
        />
        <input
          className="admin-services-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button className="admin-services-button" type="submit">Add Service</button>
      </form>

      <div>
        <h2 className="admin-services-list-header">Manage Services</h2>
        <ul className="admin-services-list">
          {services.map((service) => (
            <li className="admin-services-list-item" key={service._id}>
              <p>{service.service}</p>
              {service.image && <img src={`http://localhost:5000${service.image}`} alt={service.service} width="100" />}
              <button
                className="admin-services-delete-button"
                onClick={() => deleteService(service._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminServices;