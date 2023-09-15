import { useEffect, useContext } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserConnected()
    setLoading(false);
    return () => {
    // getUserConnected();
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
             return {}
          }
          return response.json()})
        .then(data => {
            if (Object.keys(data)?.length > 0){
              setUser(data);
          }
        })
        .catch(e => {
          console.log(e);
          setLoading(false);
        });
    }
  }

  return <AuthContext.Provider value={{user, loading}}>{children}</AuthContext.Provider>;
};
