import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    return () => {
      getUserConnected();
    };
  }, []);

  async function getUserConnected() {
    console.log("HERE ici", Object.keys(user));
    if (Object.keys(user).length == 0) {
      const option = {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        credentials: "include"
      };
      fetch("http://localhost:4000/users/whoami", option)
        .then(response => response.json())
        .then(data => {
          setUser(data);
        })
        .catch(e => console.log(e));
    }
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
