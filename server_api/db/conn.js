const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.URL || 'mongodb://localhost:27017/data_info';

mongoose.connect(DB, {
})
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("No connection", err);
  });
