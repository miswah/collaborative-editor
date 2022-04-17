const express = require("express");
const app = express();
const redis = require("redis");
require("dotenv").config();

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

// Multiple files under progress
// app.get("/(:id)", function (req, res) {
//   res.render("pad");
// });

// set up redis server for heroku
// let redisClient;
// console.log(process.env.REDISTOGO_URL);
// if (process.env.REDISTOGO_URL) {
//   let rtg = require("url").parse(process.env.REDISTOGO_URL);
//   redisClient = require("redis").createClient(rtg.port, rtg.hostname);
//   redisClient.auth(rtg.auth.split(":")[1]);
// } else {
//   redisClient = require("redis").createClient();
// }

// Using Free tier db from redis lab
const client = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

client.on("connect", () => {
  console.log("Connected to our redis instance!");
});

client.on("error", (err) => {
  global.console.log(err.message);
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
