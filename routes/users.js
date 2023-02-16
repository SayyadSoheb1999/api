const router = require("express").Router();
const bcrypt = require("bcrypt");
const Post = require("../modals/Post");

const User = require("../modals/User");

// UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only Your Account!");
  }
});

//  DELETE

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(500).json("User has been deleted!");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(400).json("User not found");
    }
  } else {
    res.status(401).json("You can delete only Your Account!");
  }
});

// GET USERS

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
    console.log("reg user in callled");
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
