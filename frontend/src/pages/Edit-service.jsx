import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditService = () => {
  const { id } = useParams(); // Fetch the ID from the URL
  const navigate = useNavigate();

  const [service, setService] = useState({
    service: "",
    provider: "",
    price: "",
    description: "",
    image: null,
    videoLink: "",
  });

  // Fetch service details by ID
  const getServiceDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch service details");
      }

      const data = await response.json();
      setService({
        service: data.service,
        provider: data.provider,
        price: data.price,
        description: data.description,
        image: null, // Reset image to null, as it will be uploaded fresh
        videoLink: data.videoLink || "", // Populate video link if it exists
      });
    } catch (error) {
      console.error("Error fetching service details:", error);
      toast.error("Failed to load service details");
    }
  };

  // Update service handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("service", service.service);
    formData.append("provider", service.provider);
    formData.append("price", service.price);
    formData.append("description", service.description);
    formData.append("videoLink", service.videoLink); // Add video link to form data
    if (service.image) {
      formData.append("image", service.image);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/update/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update service");
      }

      toast.success("Service updated successfully!");
      navigate("/admin/services");
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
    }
  };

  useEffect(() => {
    getServiceDetails();
  }, []);

  return (
    <div className="edit-service-container">
      <h1>Edit Service</h1>
      <form className="admin-services-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Service Name</label>
          <input
            className="admin-services-input"
            type="text"
            value={service.service}
            onChange={(e) =>
              setService({ ...service, service: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Provider</label>
          <input
            className="admin-services-input"
            type="text"
            value={service.provider}
            onChange={(e) =>
              setService({ ...service, provider: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="admin-services-input"
            value={service.price}
            onChange={(e) => setService({ ...service, price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="admin-services-textarea"
            value={service.description}
            onChange={(e) =>
              setService({ ...service, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="form-group">
          <label>Video Link</label>
          <input
            className="admin-services-input"
            type="url"
            placeholder="Enter YouTube video link"
            value={service.videoLink}
            onChange={(e) =>
              setService({ ...service, videoLink: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            className="admin-services-input"
            type="file"
            onChange={(e) =>
              setService({ ...service, image: e.target.files[0] })
            }
          />
        </div>
        <button type="submit" className="update-button">
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditService;
