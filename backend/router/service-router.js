const express = require("express");
const multer = require("multer");
const servicesController = require("../controllers/services-controller"); // Ensure this path is correct
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to get all services
router.get("/services", servicesController.getAllServices);

// Route to add a new service with image upload
router.post("/services/add", upload.single("image"), servicesController.addService);

// Route to update an existing service
router.patch("/services/update/:id", upload.single("image"), servicesController.updateService);

// Route to delete a service
router.delete("/services/delete/:id", servicesController.deleteService);

// Route to get service by ID
router.get("/services/:id", servicesController.getServiceById);


module.exports = router;
