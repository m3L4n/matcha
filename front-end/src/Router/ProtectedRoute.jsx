import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "src/Context/AuthContext";
import { socket } from "src/socket/socket";
export function PrivateRoute({ children }) {
  const { user, loading, userAskDisconnect, setUserAskDisconnect } = useAuth();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("herrrre", userAskDisconnect);
    // if (userAskDisconnect) {
    //   navigate("/");
    // }
  }, [userAskDisconnect]);
  useEffect(() => {
    if (userAskDisconnect) {
      navigate("/");
      setUserAskDisconnect(false);
    }
    if (!loading && Object.keys(user).length == 0) {
      navigate("/");
    }
    if (!loading && Object.keys(user).length > 0) {
      // socket.emit("login", { userId: user.id });
      if (!user.gender || !user.beverage || !user.sexual_preference) {
        navigate(`/profile/${user.id}`);
      }
    }
    console.log(user, loading, location);
    // return () => {};
  }, [loading, location, user, userAskDisconnect]);

  useEffect(() => {}, []);

  return <>{!loading && children}</>;
}
