// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var express = require("express");
var apiRouter = express.Router();

var friendsData = require("../data/friends");

// API GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
apiRouter.get("/api/friends", function(req, res) {
  res.json(friendsData);
});

// API POST Requests
// Below code handles when a user submits a form and thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the appropriate JavaScript array
apiRouter.post("/api/friends", function(req, res) {
    var newFriend = req.body;
    
    for (var j = 0; j < newFriend.scores.length; j++) {
      if (newFriend.scores[j] == "1 (Strongly Disagree)") {
        newFriend.scores[j] = 1;
      }
      else if (newFriend.scores[j] == "5 (Strongly Agree)") {
        newFriend.scores[j] = 5;
      } 
      else {
        newFriend.scores[j] = parseInt(newFriend.scores[j]);
      }
    }//End for loop

    var bestMatch = {};
    var matchedFriend = 0;
    var bestMatchedScore = 40;

    //Loop through all friends array
    for (var friend = 0; friend < friendsData.length; friend++) {
      var totalScoresDiff = 0;
      //Loop through individual's friend scores
      for (var score = 0; score < friendsData[friend].scores.length; score++) {
        var diff = Math.abs(friendsData[friend].scores[score] - newFriend.scores[score]);
        totalScoresDiff += diff;
      }//End of inner loop

      if (totalScoresDiff < bestMatchedScore) {
        matchedFriend = friend;
        bestMatchedScore = totalScoresDiff;
      }
    }//End of outter loop


    //bestMatch found
    bestMatch = friendsData[matchedFriend];
    //Push new friend to friends array
    friendsData.push(newFriend);
    //Return best match friend
    res.json(bestMatch);
});


 module.exports = apiRouter;
