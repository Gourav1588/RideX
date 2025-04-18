const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoute = require("./routes/user.routes");
const captainroutes = require("./routes/captain.routes");
const mapRoutes = require("./routes/maps.routes");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use("/users", userRoute);
app.use("/captains", captainroutes);
app.use("/maps", mapRoutes);
require('dotenv').config();  // This loads the .env file

const mongoose = require('mongoose');

// Use the MONGO_URI from the environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Test route
app.get("/", (req, res) => {
  res.send("hello");
});

// The `app.listen` part that starts the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
