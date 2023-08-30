import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import BrowsingPage from './components/BrowsingPage/BrowsingPage';
import './index.css'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/browsing',
    element: <BrowsingPage />,
  }
]);
function App() {
  const currentPath = window.location.pathname;

  return (
    <div className='container'>
      <section className="content">
        { currentPath !== '/' && <Navbar />}
        <RouterProvider router={router} />
        { currentPath !== '/' && <Footer />}
      </section>
    </div>
  );
}

export default App
