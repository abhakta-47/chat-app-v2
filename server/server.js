const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const io = require("./utils/socket")(server);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(PORT, () => {
  console.log("server started at ", PORT);
});
