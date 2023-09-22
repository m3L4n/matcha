
import { useContext, useEffect } from "react";
import { Navigate, useNavigate} from "react-router-dom";
import { useAuth } from 'src/Context/AuthContext';
export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && Object.keys(user).length == 0 ){
      navigate("/")
    }
  }, [loading, user])

  return (
    <>
      { !loading && children}
    </>
  )
}
