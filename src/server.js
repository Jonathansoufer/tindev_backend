const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes.js");
const server = express();

/* String to connect into mongoose */

mongoose.connect(
  "mongodb+srv://omnistack:criticall23@cluster0-bktdr.mongodb.net/omnistack8?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
server.use(cors());
server.use(express.json()); /* Setup to turn on the json feature on express. */
server.use(routes);

server.listen(3333);
