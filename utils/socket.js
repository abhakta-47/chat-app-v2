const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on("join-room", (payLoad) => {
      socket.join(payLoad.room);
      socket.broadcast.to(payLoad.room).emit("new-peer", payLoad);
    });
    socket.on("new-msg", (payLoad) => {
      socket.broadcast.to(payLoad.to).emit("receive-msg", payLoad);
    });
  });
};
