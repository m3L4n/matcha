const { notificationsController } = require("../controller/notificationsController");
const { socketController } = require("./socketController/socketController");

function socket_broacast(io) {
  io.on("connect", (socket) => {
    socket.on("login", async function (data) {
      await socketController.login(data.userId, socket.id);
      console.log("a user " + data.userId + " connected");
    });

    socket.on("user_profile", async function (data) {
      if (!data.ourProfile) {
        await notificationsController.createNotification(data.currentUserId, data.userId, "view our profile", "view");
      }
    });
    socket.on("response_connected", async (data) => {
      const result = await socketController.userIsConnected(data.userId);
      socket.emit("isConnect", { ...result });
    });

    socket.on("notifications", async function (data) {
      socket.emit("number-notif-not-seen", { user: "cc" });
    });

    // event pour savoir quand on like / unlike
    // event pour savoir quand on voit
    // event pour savoir le rate frame qui s'actualiser ?

    socket.on("disconnect", (reason) => {
      socketController.disconnect(socket.id);
    });
  });
}
module.exports = {
  socket_broacast,
};
