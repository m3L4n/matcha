import { useContext, useState } from "react";
import "./Navbar.scoped.css";
import { NavLink, useNavigate } from "react-router-dom";
import { disconnect } from "components/Authentification/disconnect/disconnect";
import { AuthContext, useAuth } from "src/Context/AuthContext";

export default function Navbar() {
  const { setTriggerReload } = useAuth();
  const navigate = useNavigate();
  let pages = ["match", "profile", "message"];
  const [sidebar, setSidebar] = useState(false);
  const store = useContext(AuthContext);

  if (Object.keys(store?.user)?.length == 0) {
    pages = ['login', 'register']
  }

  const toggleSidebar = () => setSidebar(!sidebar);
  const handleDisconnect = async () => {
    disconnect();
    setTriggerReload(true);
    navigate("/");
  }

  return (
    <nav className={sidebar ? "navbar navbar-deployed" : "navbar"}>
      <div className="burger-icon">
        <a
          className={sidebar ? "sidebar-toggle nav-open" : "sidebar-toggle"}
          onClick={toggleSidebar}
        >
          <span className="burger menu-toggle-bar--top"></span>
          <span className="burger menu-toggle-bar--middle"></span>
          <span className="burger menu-toggle-bar--bottom"></span>
        </a>
      </div>
      <ul className={sidebar ? "navbar-content navbar-content-visible" : "navbar-content"}>
        {pages.map(page => (
          <li key={pages.indexOf(page)}>
            {sidebar && (
              <NavLink className={`body`} to={page}>
                {page}
              </NavLink>
            )}
          </li>
        ))}
        <li>
          {(sidebar && Object.keys(store?.user)?.length > 0) && <button onClick={handleDisconnect}> Disconnect </button>}
        </li>
      </ul>
    </nav>
  );
}
