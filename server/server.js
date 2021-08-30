const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // console.log(socket)
  console.log("new user connected");
  socket.on("new-msg", (payload) => {
    console.log("new message : ", payload);
    socket.broadcast.emit("receive-msg", payload);
  });
});

server.listen(PORT, () => {
  console.log("server started at ", PORT);
});
