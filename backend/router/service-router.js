const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const servicesController = require("../controllers/services-controller"); // Ensure this path is correct
const router = express.Router();

// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg, .png, and .gif files are allowed!"), false);
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 },
});

// Route to get all services
router.get("/services", servicesController.getAllServices);

// Route to add a new service with image upload
router.post(
  "/services/add",
  upload.single("image"),
  servicesController.addService
);

// Route to update an existing service
router.patch(
  "/services/update/:id",
  upload.single("image"),
  servicesController.updateService
);

// Route to delete a service
router.delete("/services/delete/:id", servicesController.deleteService);

// Route to get service by ID
router.get("/services/:id", servicesController.getServiceById);

module.exports = router;
