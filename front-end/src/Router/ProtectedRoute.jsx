import { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate} from "react-router-dom";
import { useAuth } from 'src/Context/AuthContext';
export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    if (!loading && Object.keys(user).length == 0 ){
      navigate("/")
    }
    if (!loading && Object.keys(user).length > 0 ){
      if (!user.gender || !user.beverage || !user.position || !user.sexual_preference){
        navigate(`/profile/${user.id}`)
        console.log(user);
      }
    }
  }, [loading, user, location])

  useEffect(() => {

  }, [])

  return (
    <>
      { !loading && children}
    </>
  )
}
