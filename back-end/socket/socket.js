const { notificationsController } = require("../controller/notificationsController");
const { socketController } = require("./socketController/socketController");
const { MessageModel } = require("../models/MessageModel");
const { MatchModel } = require("../models/MatchModel");
const { UserModel } = require("../models/Usermodel");

function socket_broadcast(io) {
  io.on("connect", (socket) => {
    socket.on("login-reload", async function (data) {
      try {
        await socketController.login(data.userId, socket.id);
      } catch (err) {
        return err.message;
      }
    });
    socket.on("login", async function (data) {
      await UserModel.handleConnected(data.userId, "true");
      socket.broadcast.emit("alert-connect", { userId: data.userId });
    });

    socket.on("user_profile", async function (data) {
      try {
        if (data.userId != null && data.currentUserId != null) {
          if (!data.ourProfile) {
            await notificationsController.createNotification(data.userId, data.currentUserId, "view", "view");
            socket.broadcast.emit("alert-new-notif", {
              userReciver: data.userId,
            });
          }
        }
      } catch (err) {
        return err.message;
      }
    });

    socket.on("userLike", async (msg) => {
      const like = msg.like ? true : false;
      try {
        await notificationsController.createNotification(msg.userId, msg.currentUserId, `${like ? "like" : "unlike"}  your profile`, "like", msg.like);
        socket.broadcast.emit("alert-new-notif", { userReciver: msg.userId });
      } catch (err) {
        return err.message;
      }
    });
    socket.on("notifications", async function (data) {
      try {
        const notif = await notificationsController.findNotifByNoneView(data.userId);
        socket.emit("number-notif-not-seen", {
          data: notif.data,
          number: notif.number,
        });
      } catch (err) {
        return err.message;
      }
    });

    // socket.on("view-notif", (msg) => {
    //   // console.log(msg);
    // });
    // user view his notifications
    socket.on("user-view-notif", async (msg) => {
      try {
        await notificationsController.updateNotification(msg.userId);
      } catch (err) {
        return err.message;
      }
    });

    // user is deconnected so everybody need to be notice
    socket.on("listener-button-deconnection", async (data) => {
      try {
        await socketController.disconnect(socket.id);
        socket.broadcast.emit("alert-disconnect", { userId: data.userId });
      } catch (err) {
        return err.message;
      }
    });
    socket.on("disconnect", async (reason) => {});

    socket.on("message_sended", async (message) => {
      try {
        const response = await MessageModel.createMessage(message.idUserRequester, message.idUserReceiver, message.messageContent, message.conversationId);
        await notificationsController.createNotification(message.idUserReceiver, message.idUserRequester, "You got a new message!", "messages");
        io.emit("receive_message", response.rows[0]);

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
