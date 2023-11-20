import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "src/Context/AuthContext";
import { socket } from "src/socket/socket";
export function PrivateRoute({ children }) {
  const { user, loading, userAskDisconnect, authorize, setUser, setUserAskDisconnect, setTriggerReload } = useAuth();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    socket.connect();

    return () => {
      // socket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (userAskDisconnect && !authorize) {
      socket.disconnect();
      setUser({});
      setTriggerReload(false);
      setTriggerReload(true);
      setUserAskDisconnect(false);
      navigate("/");
      return;
    }
    if (!loading && Object.keys(user).length == 0 && !authorize) {
      navigate("/");
    }
    if (!loading && Object.keys(user).length > 0 && authorize) {
      if (!userAskDisconnect) {
        socket.emit("login-reload", { userId: user.id });
      }
      if (
        user.age < 0 ||
        user.beverage?.length == 0 ||
        user.firstname?.length == 0 ||
        user.lastname?.length == 0 ||
        user.email?.length == 0 ||
        user.sexual_preference?.length == 0 ||
        user.description?.length == 0 ||
        !user.profile_picture
      ) {
        navigate(`/profile/${user.id}`);
      }
    }
    return () => {
      if (userAskDisconnect) {
        setUserAskDisconnect(false);
      }
    };
  }, [loading, location, user, userAskDisconnect, authorize]);

  useEffect(() => {}, []);

  return <>{!loading && children}</>;
}
