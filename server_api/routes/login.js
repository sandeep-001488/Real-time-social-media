const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const multer = require('multer');
const upload = multer();


router.post('/login',upload.none(), async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("Login request received with email:", email); // Debug logging
    
    const existingUser = await User.findOne({ email });
  
    if (!existingUser) {
      return res.status(404).json({ message: "Invalid email" });
    }
    
    console.log("Found user:", existingUser); // Debug logging
    
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    console.log("Password is valid"); // Debug logging
    
    // If you intend to save the user session or token, handle it here
    // const user = await existingUser.save();
    
    res.status(200).json({ message: "Login successful", user: existingUser });
    
  } catch (error) {
    console.error("Login error:", error); // Debug logging
    
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
