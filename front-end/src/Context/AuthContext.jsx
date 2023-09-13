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
    if (Object.keys(user).length == 0) {
      const option = {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        credentials: "include"
      };
      fetch("http://localhost:4000/users/whoami", option)
        .then(response => {
          if ( response.status == 401){
            setUser({});
          }
          return response.json()})
        .then(data => {
          if (Object.keys(data).length > 1){
            setUser(data);

          }
        })
        .catch(e => console.log(e));
    }
  }

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};
