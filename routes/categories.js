const router = require("express").Router();
const bcrypt = require("bcrypt");
const Category = require("../modals/Category");

const User = require("../modals/User");

// ADD CATOGRIES
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
// ALL CATOGRIES
router.get("/", async (req, res) => {
  try {
    const allCategory = await Category.find();
    res.status(200).json(allCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
