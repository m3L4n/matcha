
import { useContext, useEffect } from "react";
import { Navigate, useNavigate} from "react-router-dom";
import { useAuth } from 'src/Context/AuthContext';
export function NoneConnectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && Object.keys(user).length != 0 ){
      navigate("/match")
    }
  }, [loading, user])

  return (
    <>
      { !loading && children}
    </>
  )
}
