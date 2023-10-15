import { useContext, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "src/Context/AuthContext";
import { socket } from "src/socket/socket";
export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!loading && Object.keys(user).length == 0) {
      navigate("/");
    }
    if (!loading && Object.keys(user).length > 0) {
      socket.emit("login", { userId: user.id });
      if (!user.gender || !user.beverage || !user.sexual_preference) {
        navigate(`/profile/${user.id}`);
        console.log(user);
      }
    }
    return () => {};
  }, [loading, user, location]);

  useEffect(() => {}, []);

  return <>{!loading && children}</>;
}
