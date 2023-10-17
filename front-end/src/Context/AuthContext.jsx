import { useEffect, useContext } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [triggerReload, setTriggerReload] = useState(true);

  useEffect(() => {
    getUserConnected();
  }, [triggerReload]);

  async function getUserConnected() {
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      credentials: "include"
    };
    fetch("http://localhost:4000/users/whoami", option)
      .then(response => {
        if (response.status == 401) {
          setUser({});
          setLoading(false);
          return {};
        }
        return response.json();
      })
      .then(data => {
        if (Object.keys(data)?.length > 0) {
          setUser(data);
          setLoading(false);
        }
        setTriggerReload(false);
      })
      .catch(() => {
        setUser({});
        setLoading(false);
        setTriggerReload(false);
      });
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, setLoading, setUser, setTriggerReload }}
    >
      {children}
    </AuthContext.Provider>
  );
};
