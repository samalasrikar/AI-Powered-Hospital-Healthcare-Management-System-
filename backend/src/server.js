require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/patients", patientRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Hospital API Running");
});

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error.message
    );
  }
};

startServer();