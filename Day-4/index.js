const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Backend Class");
});
app.get("/hi", (req, res) => {
  res.send("Hello, I am Ashwani Pandita ");
});

app.listen(3000, () => {
  console.log("Server listenging on port 3000.");
});