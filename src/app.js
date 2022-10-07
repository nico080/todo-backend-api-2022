// Import express
const express = require('express');
// Import Body parser
const bodyParser = require('body-parser');
// Import Mongoose
const mongoose = require('mongoose');
// Import routes
const apiRoutes = require("../api-routes");
// Import config
const cfg = require("../configs.json");

// Initialize the app
const app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// Use Api routes in the App
app.use('/api', apiRoutes);

// Connect to Mongoose and set connection variable
mongoose.connect(cfg.DB_CONN, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// Added check for DB connection
const db = mongoose.connection;
if (!db)
  console.log("Error connecting db")
else
console.log("Db connected successfully")


module.exports = app