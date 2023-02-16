const router = require("express").Router();
const bcrypt = require("bcrypt");
const Post = require("../modals/Post");

const User = require("../modals/User");

// CREATE USER
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  UPDATE POSTS

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your POSTS");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POSTS

router.delete("/:id", async (req, res) => {
  try {
    const selectedPost = await Post.findById(req.params.id);
    // console.log(`${post} this is not available`);
    if (selectedPost.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("POST has been Deleted succesfull");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can DELETE only your POSTS");
    }
  } catch (err) {
    res.status(500).json(`${err} `);
  }
});

//  GET POSTS

router.get("/:id", async (req, res) => {
  try {
    const postt = await Post.findById(req.params.id);
    res.status(200).json(postt);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POSTS

router.get("/", async (req, res) => {
  const userName = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (userName) {
      posts = await Post.find({ username: userName });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
