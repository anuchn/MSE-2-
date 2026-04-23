const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth");
const grievanceRoutes = require("./routes/grievance");

app.use("/api", authRoutes);
app.use("/api", grievanceRoutes);

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// Test
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);