import { useState } from 'react';
import './Navbar.scoped.css';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const pages = ['match', 'profile', 'messages', 'disconnect'];

  const toggleSidebar = () => (setSidebar(!sidebar));

  return (
    <nav className={sidebar ? 'navbar navbar-deployed' : 'navbar' }>
      <button className='sidebar-toogle' onClick={toggleSidebar}>
        <span className="burger">-</span>
        <span className="burger">-</span>
        <span className="burger">-</span>
      </button>
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
