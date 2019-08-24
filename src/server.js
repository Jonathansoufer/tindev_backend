const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes.js");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

/* String to connect into mongoose */
mongoose.connect(
  "mongodb+srv://omnistack:criticall23@cluster0-bktdr.mongodb.net/omnistack8?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json()); /* Setup to turn on the json feature on express. */
app.use(routes);

server.listen(3333);
