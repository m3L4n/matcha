import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({children}) => {

  const [user, setUser] = useState({});

  useEffect(() =>{
    if (Object.keys(user).length == 0){
      getUserConnected()
    }
  }, [])

  async function getUserConnected() {
    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      credentials: 'include',
    };
    fetch("http://localhost:4000/users/whoami", option)
      .then(response =>  response.json())
      .then(data => {
        console.log("data", data);
        setUser(data);
      })
      .catch(e => console.log(e))
  }

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>

  )
}