const mongoose = require("mongoose");
const Service = require("../models/service-model");

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res
      .status(500)
      .json({ message: "Error fetching services", error: error.message });
  }
};

// Add a new service
exports.addService = async (req, res) => {
  try {
    const { service, provider, price, description, videoLink } = req.body;

    // Validation
    if (!service || !provider || !price) {
      return res
        .status(400)
        .json({ message: "Service, provider, and price are required." });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newService = new Service({
      service,
      provider,
      price,
      description,
      image,
      videoLink,
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error("Error adding service:", error);
    res
      .status(500)
      .json({ message: "Error adding service", error: error.message });
  }
};

// Update a service by ID
exports.updateService = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid service ID" });
  }

  // Extract fields from the request body
  const { service, provider, price, description, videoLink } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    // Create an object with only the fields that have values
    const updatedData = {};

    if (service) updatedData.service = service;
    if (provider) updatedData.provider = provider;
    if (price) updatedData.price = price;
    if (description) updatedData.description = description;
    if (videoLink) updatedData.videoLink = videoLink;
    if (image !== undefined) updatedData.image = image;

    // Update service in the database
    const updatedService = await Service.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    res
      .status(500)
      .json({ message: "Error updating service", error: error.message });
  }
};

// Delete a service by ID
exports.deleteService = async (req, res) => {
  const { id } = req.params;

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid service ID" });
  }

  try {
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res
      .status(500)
      .json({ message: "Error deleting service", error: error.message });
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  const { id } = req.params; // The ID comes from the URL parameter
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid service ID" });
  }

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res
      .status(500)
      .json({ message: "Error fetching service", error: error.message });
  }
};
