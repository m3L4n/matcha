const app = require("./app");
const socketIo = require("socket.io");

const { socket_broadcast } = require("./socket/socket");
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
const io = socketIo(server, {
  cors: {
    origin: process.env.URL_FRONT,
  },
});
socket_broadcast(io);

module.exports = {
  closeServer: () => {
    server.close();
  },
  io,
};
