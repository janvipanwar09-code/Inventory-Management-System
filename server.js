const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const inventoryRoutes = require("./routes/inventoryRoutes");

app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

app.get("/", (req, res) => {
  res.send("Inventory Management System API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
