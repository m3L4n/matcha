import { useState } from "react";
import "./Navbar.scoped.css";
import { NavLink, useNavigate } from "react-router-dom";
import { disconnect } from "components/Authentification/disconnect/disconnect";
import { useAuth } from "src/Context/AuthContext";

export default function Navbar() {
  const { setTriggerReload, user } = useAuth();
  const navigate = useNavigate();
  let pages = ["match", "profile", "message", "notifications"];
  const [sidebar, setSidebar] = useState(false);

  if (Object.keys(user)?.length == 0) {
    pages = ["login", "register"];
  }

  const toggleSidebar = () => setSidebar(!sidebar);
  const handleDisconnect = async () => {
    disconnect();
    setTriggerReload(true);
    navigate("/");
  };

  return (
    <nav className={sidebar ? "navbar navbar-deployed" : "navbar"}>
      <div className="burger-icon">
        <button
          className={sidebar ? "sidebar-toggle nav-open" : "sidebar-toggle"}
          onClick={toggleSidebar}
        >
          <span className="burger menu-toggle-bar--top"></span>
          <span className="burger menu-toggle-bar--middle"></span>
          <span className="burger menu-toggle-bar--bottom"></span>
        </button>
      </div>
      <ul
        className={
          sidebar ? "navbar-content navbar-content-visible" : "navbar-content"
        }
      >
        {pages.map(page => (
          <li key={pages.indexOf(page)}>
            {sidebar &&
              (page != "profile" ? (
                <NavLink className={`body`} to={page}>
                  {page}
                </NavLink>
              ) : (
                <NavLink className={`body`} to={`/profile/${user.id}`}>
                  {page}
                </NavLink>
              ))}
          </li>
        ))}
        <li>
          {sidebar && Object.keys(user)?.length > 0 && (
            <button
              className="disconnect-button body"
              onClick={handleDisconnect}
            >
              Disconnect{" "}
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
