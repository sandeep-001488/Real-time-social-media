const express = require("express");
require("./db/conn");
const { createAdminAccount } = require("./scripts/admin");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const authRoute = require("./routes/auth");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const conversationRoute=require('./routes/conversation')
const messageRoute=require("./routes/message")
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Middleware to parse JSON bodies                      
app.use(bodyParser.json());

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Helmet for HTTP headers security
app.use(helmet());

// Morgan for request logging (optional)
app.use(morgan("common"));

// CORS for handling Cross-Origin Resource Sharing
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.originalname;

    cb(null, fileName);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res
      .status(200)
      .json({
        message: "file uploaded successfully",
        fileName: req.file.filename,
      });
  } catch (error) {
    console.log(`Error while uploading file ${error}`);
    res.status(500).send("Error while uploading file");
  }
});

createAdminAccount();


app.use("/api/auth", authRoute);
app.use("/api/auth", loginRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversation",conversationRoute)
app.use("/api/messages",messageRoute)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error from app.js");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
