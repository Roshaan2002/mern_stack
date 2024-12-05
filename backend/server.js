require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const adminContactRoute = require("./router/admin-router");
const servicesRouter = require("./router/service-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

// handling cors policy
const corsOptions = {
  origin: "http://localhost:5174", // my frontend URL
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());

// Mount the router
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// Admin route
app.use("/api/admin", adminRoute);
app.use("/api/admin", adminContactRoute);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/admin", servicesRouter); // Prefix routes with /api/admin

// Error middleware
app.use(errorMiddleware);

connectDB().then(() => {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
