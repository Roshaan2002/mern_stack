import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

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
    formData.append("videoLink", serviceData.videoLink);
    if (serviceData.image) formData.append("image", serviceData.image);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/services/add",
        {
          method: "POST",
          headers: {
            Authorization: authorizationToken,
          },
          body: formData,
        }
      );
      if (response.ok) {
        toast.success("Service added successfully!");
        getAllServices();
        setServiceData({
          service: "",
          provider: "",
          price: "",
          description: "",
          image: null,
          videoLink: "",
        });
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
      const response = await fetch(
        `http://localhost:5000/api/admin/services/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
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
          onChange={(e) =>
            setServiceData({ ...serviceData, service: e.target.value })
          }
        />
        <input
          className="admin-services-input"
          type="text"
          placeholder="Provider"
          value={serviceData.provider}
          onChange={(e) =>
            setServiceData({ ...serviceData, provider: e.target.value })
          }
        />
        <input
          className="admin-services-input"
          type="text"
          placeholder="Price"
          value={serviceData.price}
          onChange={(e) =>
            setServiceData({ ...serviceData, price: e.target.value })
          }
        />
        <textarea
          className="admin-services-textarea"
          placeholder="Description"
          value={serviceData.description}
          onChange={(e) =>
            setServiceData({ ...serviceData, description: e.target.value })
          }
        />
        <input
          className="admin-services-input"
          type="text"
          placeholder="Video URL"
          value={serviceData.videoLink}
          onChange={(e) =>
            setServiceData({ ...serviceData, videoLink: e.target.value })
          }
        />
        <input
          className="admin-services-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button className="admin-services-button" type="submit">
          Add Service
        </button>
      </form>

      <div>
        <h2 className="admin-services-list-header">Manage Services</h2>
        <div className="admin-services-grid">
          {/* Grid Header */}
          <div className="grid-header">Service</div>
          <div className="grid-header">Provider</div>
          <div className="grid-header">Price</div>
          <div className="grid-header">Description</div>
          <div className="grid-header">Image</div>
          <div className="grid-header">Actions</div>

          {/* Grid Rows */}
          {services.map((service) => (
            <>
              <div className="grid-item">{service.service}</div>
              <div className="grid-item">{service.provider}</div>
              <div className="grid-item">${service.price}</div>
              <div className="grid-item">{service.description}</div>
              <div className="grid-item">
                {service.image && (
                  <img
                    src={`http://localhost:5000${service.image}`}
                    alt={service.service}
                    style={{ width: "100px" }}
                  />
                )}
              </div>
              <div className="grid-item">
                <Link to={`/admin/services/edit/${service._id}`}>
                  <button className="admin-services-edit-button">Edit</button>
                </Link>
                <button
                  className="admin-services-delete-button"
                  onClick={() => deleteService(service._id)}
                >
                  Delete
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminServices;
