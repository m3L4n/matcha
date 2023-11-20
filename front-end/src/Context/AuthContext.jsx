import { useEffect, useContext } from "react";
import { createContext, useState } from "react";
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [authorize, setAuthorized] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const [userAskDisconnect, setUserAskDisconnect] = useState(false);
  // const { data, isLoading, refetch, isInitialLoading, isSuccess, isError } = useQuery(["user"], async function () {
  //   const option = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //     credentials: "include",
  //   };
  //   const res = await fetch("http://localhost:4000/users/whoami", option);
  //   return await res.json();
  // });
  // console.log(data, isLoading, isInitialLoading, isSuccess, isError);

  useEffect(() => {
    getUserConnected();
  }, [triggerReload]);

  // useEffect(() => {
  //   console.log("triger reload", user, triggerReload);
  //   if (triggerReload) {
  //     console.log("triger reload");
  //   }
  // }, [triggerReload]);
  useEffect(() => {
    console.log(authorize);
  }, [authorize]);
  async function getUserConnected() {
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
    };
    fetch("http://localhost:4000/users/whoami", option)
      .then((response) => {
        if (response.status == 401) {
          setUser({});
          setAuthorized(false);
          setUserAskDisconnect(false);
          return {};
        }
        return response.json();
      })
      .then((data) => {
        if (Object.keys(data)?.length > 0) {
          setUser(data);
          setAuthorized(true);
        }
        setLoading(false);
        setTriggerReload(false);
      })
      .catch(() => {
        setUser({});
        setLoading(false);
        setTriggerReload(false);
      });
  }

  return (
    <AuthContext.Provider value={{ user, loading, setLoading, setAuthorized, authorize, setUserAskDisconnect, userAskDisconnect, setUser, setTriggerReload }}>{children}</AuthContext.Provider>
  );
};
