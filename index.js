const express = require("express");
const app = express();
const redis = require("redis");

// get sharejs dependencies
const sharejs = require("share").server;

// Set view engine to ejs
app.set("view engine", "ejs");

// Public folder to store assets
app.use(express.static(__dirname + "/public"));

// Routes for app
app.get("/", function (req, res) {
  res.render("pad");
});
app.get("/(:id)", function (req, res) {
  res.render("pad");
});

// options for sharejs
const options = {
  db: { type: "redis" },
};

// attach the express server to sharejs
sharejs.attach(app, options);

// Listen to port 8080 or the port define by heroku
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is runnin on port ${port}`);
});
