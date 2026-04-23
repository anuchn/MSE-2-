const express = require("express");
const router = express.Router();
const Grievance = require("../models/Grievance");
const auth = require("../middleware/auth");

// CREATE
router.post("/grievances", auth, async (req, res) => {
  const data = new Grievance(req.body);
  await data.save();
  res.json(data);
});

// GET ALL
router.get("/grievances", auth, async (req, res) => {
  const data = await Grievance.find();
  res.json(data);
});

// GET BY ID
router.get("/grievances/:id", auth, async (req, res) => {
  const data = await Grievance.findById(req.params.id);
  res.json(data);
});

// UPDATE
router.put("/grievances/:id", auth, async (req, res) => {
  const updated = await Grievance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/grievances/:id", auth, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// SEARCH
router.get("/grievances/search", auth, async (req, res) => {
  const { title } = req.query;
  const result = await Grievance.find({
    title: { $regex: title, $options: "i" }
  });
  res.json(result);
});

module.exports = router;