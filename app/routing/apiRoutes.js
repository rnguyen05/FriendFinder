// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var express = require("express");
var apiRouter = express.Router();
// var path = require("path");
var bodyParser = require("body-parser");

var friendsData = require("../data/friends");

// Sets up the Express app to handle data parsing
apiRouter.use(bodyParser.urlencoded({ extended: true }));
apiRouter.use(bodyParser.json());

// API GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
apiRouter.get("/api/survey", function(req, res) {
  res.json(friendsData);
});

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array

  apiRouter.post("/api/survey", function(req, res) {
      friendsData.push(req.body);
      res.json(friendsData);
      console.log(req.body);  
  });


 module.exports = apiRouter;
