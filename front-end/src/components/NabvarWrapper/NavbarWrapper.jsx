import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'

export default function NavbarWrapper() {
    const currentPath = useLocation().pathname
    return (
        <div className="container">
            {currentPath !== '/' && <Navbar />}
            <section className="content">
                <Outlet />
                {currentPath !== '/' && currentPath !== '/message' && (
                    <Footer />
                )}
            </section>
        </div>
    )
}
