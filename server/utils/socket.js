const { Server } = require("socket.io");

// class io {
//   constructor(server) {

//   }
// }

module.exports = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    // console.log(socket)
    console.log("new user connected");
    socket.on("join-room", (payLoad) => {
      socket.join(payLoad.room);
      console.log(socket.id, "joined room", payLoad);
    });
    socket.on("new-msg", (payLoad) => {
      socket.broadcast.to(payLoad.to).emit("receive-msg", payLoad);
      // io.emit("receive-msg", payLoad);
      console.log("new-message", payLoad);
    });
  });
};
