const app = require("./app");
const socketIo = require("socket.io");
const { socketController } = require("./socket/socketController/socketController");
const { UserController } = require("./controller/users/userControllers");
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
const io = socketIo(server, {
  cors: {
    origin: process.env.URL_FRONT,
  },
});

io.on("connect", (socket) => {
  socket.on("login", async function (data) {
    const test = await socketController.login(data.userId, socket.id);
    console.log("a user " + data.userId + " connected");
  });
  console.log("client connected: ", socket.id);
  socket.on("user_profile", async function (data) {
    console.log(data);
    setInterval(async () => {
      const result = await socketController.userIsConnected(data.userId);
      socket.emit("connected", result);
    }, 1000);
  });

  socket.on("notifications", async function (data) {
    console.log("cc", data);
    socket.emit("number-notif-not-seen", { user: "cc" });
  });

  socket.on("disconnect", (reason) => {
    socketController.disconnect(socket.id);
    console.log(reason);
  });
});

module.exports = {
  closeServer: () => {
    server.close();
  },
  io,
};
