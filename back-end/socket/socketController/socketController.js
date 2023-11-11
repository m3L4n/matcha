const { NotificationsModel } = require("../../models/notificationsModel");
const { UserModel } = require("../../models/Usermodel");
const { socketModel } = require("../socketModel/socketModel");

class socketController {
  static login = async (idUser, idSocket) => {
    try {
      const result = await socketModel.create(idSocket, idUser);
    } catch (error) {
      return error.message;
    }
  };

  static disconnect = async (idSocket) => {
    try {
      let socket = {
        id_socket: "",
        id_user: "",
      };
      socket = await socketModel.findByIdsocket(idSocket);
      // const result = await UserModel.handleDisconnected(socket.id_user, "false");
      // console.log(result);
      await socketModel.deletebySocketId(idSocket);
      return socket.id_user;
    } catch (error) {
      return error.msg;
    }
  };

  static userIsConnected = async (idUser) => {
    try {
      const result = await UserModel.isUserConnected(idUser);
      return result;
    } catch (error) {
      return error.message;
    }
  };

  static show = async (idUser) => {
    try {
      const result = await socketModel.findByIdUser(idUser);
      return result;
    } catch (e) {
      return e;
    }
  };
}
module.exports = {
  socketController,
};
