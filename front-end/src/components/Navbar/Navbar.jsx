import { useState } from 'react';
import './Navbar.scoped.css';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const pages = ['match', 'profile', 'message', 'disconnect'];
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => (setSidebar(!sidebar));

  return (
    <nav className={sidebar ? 'navbar navbar-deployed' : 'navbar' }>
    <div className="burger-icon">
      <a className={sidebar ? 'sidebar-toggle nav-open' : 'sidebar-toggle'} 
      onClick={toggleSidebar}
      >
      <span className="burger menu-toggle-bar--top"></span>
      <span className="burger menu-toggle-bar--middle"></span>
      <span className="burger menu-toggle-bar--bottom"></span>
      </a>
    </div>
      <ul>
      {pages.map((page) => (
        <li key={pages.indexOf(page)}>
        {sidebar && <NavLink className={`body`} to={page}>{page}</NavLink>}
        </li>
      ))}
      </ul>
    </nav>
  );
}
