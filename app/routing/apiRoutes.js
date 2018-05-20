// Basic route that sends the user first to the AJAX Page
app.get("/api/friends", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });
  
  // Create New Friend - takes in JSON input
app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newfriend = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newfriend);
  
    characters.push(newfriend);
  
    res.json(newfriend);
  });
  
  