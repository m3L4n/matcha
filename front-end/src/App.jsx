import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Router";
import { socket } from "src/socket/socket";
import { useAuth } from "./Context/AuthContext";
export default function App() {
  // const { user } = useAuth();
  // useEffect(() => {
  //   socket.connect();
  //   // socket.on("hello", (arg, callback) => {
  //   //   console.log(arg); // "world"
  //   //   callback("got it");
  //   // });
  //   socket.on("chat", (msg) => {
  //     console.log("chat msg :");
  //   });
  //   // socket.on("some-event", (callback) => {
  //   //   //to know if personne is connected
  //   //   callback("ok"); // only one argument is expected
  //   // });
  //   socket.emit("login", { userId: user.id });
  //   return () => {
  //     socket.off("chat message", (reason) => {
  //       console.log(reason);
  //     });
  //     socket.off("some-event", (reason) => {
  //       console.log(reason);
  //     });
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
