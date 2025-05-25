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
const rideroutes=require("./routes/ride.routes")

const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use("/users", userRoute);
app.use("/captains", captainroutes);
app.use("/maps", mapRoutes);
app.use("/ride",rideroutes)

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

module.exports = app;
