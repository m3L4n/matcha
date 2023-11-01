import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/Context/AuthContext";
export function NoneConnectedRoute({ children }) {
  const { user, loading, userAskDisconnect } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && Object.keys(user).length != 0 && !userAskDisconnect) {
      navigate("/match");
    }
  }, [loading, user, userAskDisconnect]);

  return <>{!loading && children}</>;
}
