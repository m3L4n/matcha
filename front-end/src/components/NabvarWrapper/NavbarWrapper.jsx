import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function NavbarWrapper(){
    const currentPath = window.location.pathname;

    return (
    <div className='container'>
      { currentPath !== '/' && <Navbar/>}
      <section className="content">
        <Outlet/>
        { currentPath !== '/' && <Footer />}
      </section>
    </div>
    )
}
