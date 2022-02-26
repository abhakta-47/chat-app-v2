const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const cors = require("cors");
const { constants } = require("buffer");

const server = http.createServer(app);

app.use(cors());

const io = require("./utils/socket")(server);

const PORT = process.env.PORT || 5000;

app.use("/", express.static(path.join(__dirname, "client", "build")));

server.listen(PORT, () => {
  console.log("server started at ", PORT);
});
