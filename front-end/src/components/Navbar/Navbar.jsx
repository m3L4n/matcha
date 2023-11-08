import { useState, useEffect } from "react";
import "./Navbar.scoped.css";
import { NavLink } from "react-router-dom";
import { socket } from "src/socket/socket";
import disconnect from "components/Authentification/disconnect/disconnect";
import { useAuth } from "src/Context/AuthContext";
import { ThemeContext } from "src/Context/Theme";
import { useContext } from "react";

export default function Navbar() {
  const { setTriggerReload, user, setUserAskDisconnect } = useAuth();
  // const navigate = useNavigate();
  let pages = ["match", "profile", "message", "notifications", "view history", "horoscope", "blockView"];
  const [sidebar, setSidebar] = useState(false);
  const [numberNotif, setNumberNotif] = useState(0);
  const { theme, toggleTheme } = useContext(ThemeContext);

  if (Object.keys(user)?.length == 0) {
    pages = ["login", "register"];
  }

  const isUserReceiveNotif = () => {
    socket.emit("notifications", { userId: user.id });
    socket.on("number-notif-not-seen", (msg) => {
      setNumberNotif(msg.number);
    });
  };
  useEffect(() => {
    const intervalId = setInterval(isUserReceiveNotif, 5000);
    return () => {
      clearInterval(intervalId);
      socket.off("number-notif-not-seen", (reason) => {
        console.log(reason);
      });
    };
  }, [user]);

  const toggleSidebar = () => setSidebar(!sidebar);
  const handleDisconnect = async () => {
    const id = user.id;
    socket.emit("listener-button-deconnection", { userId: id });
    console.log("data", user.id);
    await disconnect();
    setTriggerReload(true);
    setUserAskDisconnect(true);
    // navigate("/");
  };

  return (
    <nav className={sidebar ? "navbar navbar-deployed" : "navbar"}>
      <div className="burger-icon">
        <button className={sidebar ? "sidebar-toggle nav-open" : "sidebar-toggle"} onClick={toggleSidebar}>
          <span className="burger menu-toggle-bar--top"></span>
          <span className="burger menu-toggle-bar--middle"></span>
          <span className="burger menu-toggle-bar--bottom"></span>
        </button>
      </div>
      <ul className={sidebar ? "navbar-content navbar-content-visible" : "navbar-content"}>
        {pages.map((page) => (
          <li key={pages.indexOf(page)}>
            {sidebar &&
              (page == "profile" ? (
                <NavLink className={`body`} to={`/profile/${user.id}`}>
                  {page}
                </NavLink>
              ) : page == "notifications" ? (
                <div>
                  <NavLink className={`body navbar-notif`} to={page}>
                    {numberNotif > 0 && <div className="notifications-indicator"> {numberNotif} </div>}
                    {page}
                  </NavLink>
                </div>
              ) : page == "view history" ? (
                <NavLink className={`body`} to={"/HistoryView"}>
                  {page}
                </NavLink>
              ) : (
                <NavLink className={`body`} to={page}>
                  {page}
                </NavLink>
              ))}
          </li>
        ))}
        <li>
          {sidebar && Object.keys(user)?.length > 0 && (
            <button className="disconnect-button body" onClick={handleDisconnect}>
              Disconnect{" "}
            </button>
          )}
        </li>
        <li>
          {sidebar && Object.keys(user)?.length > 0 && (
            <button className="disconnect-button body" onClick={toggleTheme}>
              Switch to {theme === "light-theme" ? "Coffee" : "Matcha"}
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
