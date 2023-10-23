const { UserModel } = require("../../models/Usermodel");
const { socketModel } = require("../socketModel/socketModel");

class socketController {
  static login = async (idUser, idSocket) => {
    try {
      const result = await socketModel.create(idSocket, idUser);
      await UserModel.handleConnected(idUser, "true");
      console.log("connexion etablished");
    } catch (error) {
      console.log("connexion cant be etablished", error);
    }
  };

  static disconnect = async (idSocket) => {
    try {
      let socket = {
        id_socket: "",
        id_user: "",
      };
      socket = await socketModel.findByIdsocket(idSocket);
      const result = await socketModel.deletebySocketId(idSocket);
      await UserModel.handleConnected(socket.id_user, "false");
      console.log("user disconnect", idUser);
    } catch (error) {
      console.log("user cant be disconnected");
    }
  };

  static userIsConnected = async (idUser) => {
    try {
      const result = await UserModel.isUserConnected(idUser);
      return result;
    } catch (error) {}
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
