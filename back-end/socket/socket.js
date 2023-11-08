const {
  notificationsController,
} = require("../controller/notificationsController");
const { socketController } = require("./socketController/socketController");
const { MessageModel } = require("../models/MessageModel");
const { MatchModel } = require("../models/MatchModel");
function socket_broadcast(io) {
  io.on("connect", (socket) => {
    socket.on("login", async function (data) {
      await socketController.login(data.userId, socket.id);
      console.log("a user " + data.userId + " connected");
      socket.broadcast.emit("alert-connect", { userId: data.userId });
    });

    socket.on("user_profile", async function (data) {
      if (data.userId != null && data.currentUserId != null) {
        if (!data.ourProfile) {
          await notificationsController.createNotification(
            data.userId,
            data.currentUserId,
            "view",
            "view",
          );
          socket.broadcast.emit("alert-new-notif", {
            userReciver: data.userId,
          });
        }
      }
    });

    // socket.on("response_connected", async (data) => {
    //   const result = await socketController.userIsConnected(data.userId);
    //   socket.emit("isConnect", { ...result });
    // });

    // when use trigger the button likety
    socket.on("userLike", async (msg) => {
      const like = msg.like ? true : false;
      socket.broadcast.emit("alert-new-notif", { userReciver: msg.userId });

      await notificationsController.createNotification(
        msg.userId,
        msg.currentUserId,
        `${like ? "like" : "unlike"}  your profile`,
        "like",
        msg.like,
      );
    });
    // the notificatins not seen
    socket.on("notifications", async function (data) {
      const notif = await notificationsController.findNotifByNoneView(
        data.userId,
      );
      socket.emit("number-notif-not-seen", {
        data: notif.data,
        number: notif.number,
      });
    });

    // socket.on("view-notif", (msg) => {
    //   // console.log(msg);
    // });
    // user view his notifications
    socket.on("user-view-notif", async (msg) => {
      const result = await notificationsController.updateNotification(
        msg.userId,
      );
    });

    // user is deconnected so everybody need to be notice
    socket.on("listener-button-deconnection", async (data) => {
      const result = await socketController.disconnect(socket.id);
      socket.broadcast.emit("alert-disconnect", { userId: data.userId });
    });
    socket.on("disconnect", async (reason) => {});
    // event pour savoir quand on like / unlike
    // event pour savoir quand on voit
    // event pour savoir le rate frame qui s'actualiser ?

    socket.on("message_sended", async (message) => {
      try {
        const response = await MessageModel.createMessage(
          message.idUserRequester,
          message.idUserReceiver,
          message.messageContent,
          message.conversationId,
        );
        io.emit("receive_message", response.rows[0]);
        await notificationsController.createNotification(
          message.idUserRequester,
          message.idUserReceiver,
          "You got a new message!",
          "messages",
        );
        return response.rows;
      } catch (e) {
        return e.message;
      }
    });
  });
}
module.exports = {
  socket_broadcast,
};
