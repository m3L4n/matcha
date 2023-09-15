
import { useState } from "react";
import { useContext, useEffect } from "react";
import { Navigate} from "react-router-dom";
import { AuthContext } from "src/Context/AuthContext";
import { useAuth } from 'src/Context/AuthContext';
import { Outlet, useLocation } from "react-router-dom";
export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const [auth, setAuth ] = useState(false)

  // console.log(user);
  useEffect(() => {
    if (Object.keys(user).length > 0){
      console.log('here')
      setAuth(true);
    }
  }, [loading])

  if (loading) {
    return <div>Chargement...</div>;
  }

  return  auth ? <>
  children </> :<Navigate to={"/"}/>; 
}
