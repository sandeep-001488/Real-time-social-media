
const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
      } catch (error) {
        return res.status(500).json({ message: "Error hashing password", error });
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json({ message: "Account updated successfully", user });
    } catch (error) {
      return res.status(500).json({ message: "Error updating user", error });
    }
  } else {
    res.status(403).json({ message: "You can update only your account" });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting user", error });
    }
  } else {
    res.status(403).json({ message: "You can delete only your account" });
  }
});

// Get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const { password, updatedAt, createdAt, ...others } = user._doc || {};
    res.status(200).json(others);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving user", error });
  }
});

// Get all friends
router.get("/friends/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friends = await Promise.all(
      user.followings
        .filter((friendId) => friendId) // Filter out undefined values
        .map(async (friendId) => {
          const friend = await User.findById(friendId);
          if (friend) {
            const { _id, username, profilePicture } = friend;
            return { _id, username, profilePicture };
          }
          return null;
        })
    );

    const friendList = friends.filter(friend => friend !== null);

    res.status(200).json(friendList);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!userToFollow.followers.includes(req.body.userId)) {
        await userToFollow.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({ message: "User has been followed" });
      } else {
        res.status(403).json({ message: "You already follow this user" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error following user", error });
    }
  } else {
    res.status(403).json({ message: "You can't follow yourself" });
  }
});

// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToUnfollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (userToUnfollow.followers.includes(req.body.userId)) {
        await userToUnfollow.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({ message: "User has been unfollowed" });
      } else {
        res.status(403).json({ message: "You don't follow this user" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error unfollowing user", error });
    }
  } else {
    res.status(403).json({ message: "You can't unfollow yourself" });
  }
});

module.exports = router;

