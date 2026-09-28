const express = require("express");
const Inventory = require("../models/Inventory");

const router = express.Router();

// GET all inventory items
router.get("/", async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
});

// GET single inventory item
router.get("/:id", async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch item" });
  }
});

// ADD inventory item
router.post("/", async (req, res) => {
  try {
    const item = new Inventory(req.body);
    const savedItem = await item.save();

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to add item" });
  }
});

// UPDATE inventory item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to update item" });
  }
});

// DELETE inventory item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item" });
  }
});

module.exports = router;
