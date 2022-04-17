const express = require("express");
const app = express();

// Set view engine to ejs
app.set("view engine", "ejs");

// Public folder to store assets
app.use(express.static(__dirname + "/public"));

// Routes for app
app.get("/", function (req, res) {
  res.render("pad");
});

// Listen to port 8080 or the port define by heroku
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is runnin on port ${port}`);
});
