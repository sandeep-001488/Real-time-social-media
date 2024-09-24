const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer();

//create post

router.post("/", upload.none(), async (req, res) => {
  const { userId, desc, likes, img } = req.body;

  try {
    const newPost = await new Post({
      likes,
      desc,
      userId,
      img,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(201).json("the post has been updated");
    } else {
      res.status(403).json("u can update only ur post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(201).json({ message: "post deleted successfully" });
    } else {
      res.status(403).json("u can only delete ur post ur post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//like or dislike a post
// router.put("/:id/like", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post.likes.includes(req.body.userId)) {
//       await Post.updateOne({ $push: { likes: req.body.userId } });
//       res.status(201).json({message:"post has been liked"});
//     } else {
//       await Post.updateOne({ $pull: { likes: req.body.userId } });
//       res.status(201).json({ message:"post has been disliked" });
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });


//like or dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      // If the user has not liked the post yet, add the user's ID to the likes array
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(201).json({ message: "post has been liked" });
    } else {
      // If the user has already liked the post,  remove the user's ID from the likes array
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(201).json({ message: "post has been disliked" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


//get post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currUser._id });
    const friendPosts = await Promise.all(
      currUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(201).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
});

// get user's all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });

    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
