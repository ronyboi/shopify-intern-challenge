const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");

// Uploading an image!
// @route POST api/posts
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("caption", "a caption is required!").not().isEmpty(),
      check("image", "please add your image").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const currentUser = await User.findOne({ id: req.user.id });

      const { caption, image } = req.body;

      newPost = {};

      newPost.user = req.user.id;
      newPost.image = image;
      newPost.caption = caption;
      newPost.name = currentUser.name;

      post = new Post(newPost);

      await post.save();

      await currentUser.save();

      return res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  }
);

// Deleting an image!
// @route DELETE api/posts/:id
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Correspond with the appropriate user as well.
    let post = await Post.findOne({ _id: req.params.id });

    if (req.user.id != post.user) {
      return res.json({
        msg: "You do not have the permission to delete this image!",
      });
    }

    await Post.findOneAndDelete({ _id: req.params.id });
    res.json({ msg: "Post removed!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// Get all images!
// @route GET api/posts
// @access Public
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate();
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error!");
  }
});

module.exports = router;
