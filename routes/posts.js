const router = require("express").Router();
const bcrypt = require("bcrypt");
// const Post = require("../modals/Post");
const APost = require("../modals/AnotherPost");

const User = require("../modals/User");

// ADD POSTS
router.post("/create", async (req, res) => {
  const newPost = new APost(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json("ss", err);
  }
});

//  UPDATE POSTS

router.put("/:id", async (req, res) => {
  try {
    const post = await APost.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await APost.findByIdAndUpdate(
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
    const selectedPost = await APost.findById(req.params.id);
    if (selectedPost.username === req.body.username) {
      try {
        await APost.findByIdAndDelete(req.params.id);
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
    const postt = await APost.findById(req.params.id);
    res.status(200).json();
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
      posts = await APost.find({ username: userName });
    } else if (catName) {
      posts = await APost.find({
        category: catName,
      });
    } else {
      posts = await APost.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
