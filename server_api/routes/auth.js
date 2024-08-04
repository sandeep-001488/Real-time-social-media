const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer();

router.post('/register',upload.none(), async (req, res) => {
 

  const { username, email, password,profilePicture,coverPicture } = req.body;
  const existingUser=await User.findOne({email})
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }

  // Validate input fields
  if (!username) {
    return res.status(400).json({ message: 'username is required' });
  }
  if (!email) {
    return res.status(400).json({ message: 'email is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'password is required' });
  }
  

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // console.log('Salt:', salt);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);
    // console.log('Hashed Password:', hashedPassword);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture,
      coverPicture
    });

    // Save user to the database
    const user = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;

// const router = require('express').Router();
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure the 'uploads' directory exists
// const uploadsDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // Configure multer for file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadsDir); // Save to the 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Save with a timestamp prefix
//   }
// });
// const upload = multer({ storage: storage });

// router.post('/register', upload.fields([{ name: 'coverPicture', maxCount: 1 }, { name: 'profilePicture', maxCount: 1 }]), async (req, res) => {
 

//   const { username, email, password ,desc,city,from,relationship} = req.body;

//   // Validate input fields
//   if (!username) {
//     return res.status(400).json({ message: 'username is required' });
//   }
//   if (!email) {
//     return res.status(400).json({ message: 'email is required' });
//   }
//   if (!password) {
//     return res.status(400).json({ message: 'password is required' });
//   }
//   if (!req.files.coverPicture) {
//     return res.status(400).json({ message: 'coverPicture is required' });
//   }
//   if (!req.files.profilePicture) {
//     return res.status(400).json({ message: 'profilePicture is required' });
//   }

//   try {
//     // Generate salt
//     const salt = await bcrypt.genSalt(10);
//     console.log('Salt:', salt);

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, salt);
//     console.log('Hashed Password:', hashedPassword);

//     // Create new user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       desc,
//       city,
//       from,
//       relationship,
//       coverPicture: req.files.coverPicture[0].path, // Save the coverPicture file path
//       profilePicture: req.files.profilePicture[0].path // Save the profilePicture file path
//     });

//     // Save user to the database
//     const user = await newUser.save();
//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });

// module.exports = router;

