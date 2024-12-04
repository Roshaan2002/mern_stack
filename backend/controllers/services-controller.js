const { default: mongoose } = require('mongoose');
const Service = require('../models/service-model'); // Assuming you have a Service model

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};

// Controller to add a new service
exports.addService = async (req, res) => {
  try {
    const { service, provider, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Store image path

    const newService = new Service({
      service,
      provider,
      price,
      description,
      image,
    });
    await newService.save();

    res.status(200).json(newService); // Send the newly added service
  } catch (error) {
    res.status(500).json({ message: "Error adding service" });
  }
};
// Update service by ID
exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { service, provider, price, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        service,
        provider,
        price,
        description,
        ...(image && { image }), // Update the image if provided
      },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error); // Log for debugging
    res.status(500).json({ message: "Error updating service", error });
  }
};

// Delete service by ID
exports.deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error });
  }
};

// Get service by ID

exports.getServiceById = async (req, res) => {
  const { id } = req.params;
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
    console.error("Error fetching service:", error); // Log for debugging
    res.status(500).json({ message: "Error fetching service", error });
  }
};



