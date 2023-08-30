// import { useState } from 'react';
import './Navbar.scoped.css';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  // const [sidebar, toggleSidebar] = useState(false);
  const pages = ['match', 'profile', 'messages', 'disconnect'];

  return (
    <nav className="nav-icon">
      <button className='sidebar-toogle'>
        <span className="burger">-</span>
        <span className="burger">-</span>
        <span className="burger">-</span>
      </button>
      <ul>
        {pages.map((page) => (
          <li key={pages.indexOf(page)}>
            <NavLink to={page}>{page}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
