import { useContext } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeContext } from "src/Context/Theme";

export default function NavbarWrapper() {
  const currentPath = useLocation().pathname;
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`container ${theme}`}>
      {currentPath !== "/" && <Navbar />}
      <section className="content">
        <Outlet />
        {currentPath !== "/" && currentPath !== "/message" && <Footer />}
      </section>
    </div>
  );
}
