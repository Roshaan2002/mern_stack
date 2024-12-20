require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const authRoute = require("./router/auth-router");
const messageRoute = require("./router/message-router");
const userRoute = require("./router/user-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const adminContactRoute = require("./router/admin-router");
const servicesRouter = require("./router/service-router");
const errorMiddleware = require("./middlewares/error-middleware");

const connectDB = require("./utils/db");

// handling cors policy
const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:5173"], // my frontend URL
  methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.json());

//express-session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Mount the router
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);
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
