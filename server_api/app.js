const express = require('express');
require('./db/conn'); 
const {createAdminAccount}=require("./scripts/admin")
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const authRoute = require('./routes/auth'); 
const loginRoute = require('./routes/login');
const userRoute = require('./routes/users'); 
const postRoute = require('./routes/posts');

const app = express();
const port = process.env.PORT || 5000;



// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Helmet for HTTP headers security
app.use(helmet());

// Morgan for request logging (optional)
app.use(morgan('common'));

// CORS for handling Cross-Origin Resource Sharing
app.use(cors()); 
createAdminAccount()
// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRoute);
app.use('/api/auth', loginRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error from app.js');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const express = require('express');
// require('./db/conn'); 
// const morgan = require('morgan');
// const cors = require('cors');
// const helmet = require('helmet');
// const bodyParser = require('body-parser');
// const path = require('path');
// const fs = require('fs');

// const authRoute = require('./routes/auth'); 
// const loginRoute = require('./routes/login');
// const userRoute = require('./routes/users'); 
// const postRoute = require('./routes/posts');

// const app = express();
// const port = process.env.PORT || 5000;

// // Create the uploads directory if it doesn't exist
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Middleware to parse URL-encoded form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Helmet for HTTP headers security
// app.use(helmet());

// // Morgan for request logging (optional)
// app.use(morgan('common'));

// // CORS for handling Cross-Origin Resource Sharing
// app.use(cors()); 

// // Serve static files from the uploads directory
// // app.use('/uploads', express.static('uploads'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.use('/api/auth', authRoute);
// app.use('/api/auth', loginRoute);
// app.use('/api/users', userRoute);
// app.use('/api/posts', postRoute);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Internal Server Error');
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
