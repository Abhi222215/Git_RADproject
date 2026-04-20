import './App.css'
import Hero from './component/Hero/Hero.jsx'
import Navbar from './component/Navbar.jsx'
import { lazy, Suspense, useCallback, useState } from "react";
import Footer from "./component/Footer/footer.jsx";
import { Route, Routes, useLocation } from 'react-router-dom';
import { Movie } from './pages/Movie.jsx';
import { Moviedetails } from './pages/Moviedetails.jsx';
import { Mybooking } from './pages/Mybooking.jsx';
import { Seatlayout } from './pages/Seatlayout.jsx';
import { Favorite } from './pages/Favorite.jsx';
import { Toaster } from 'react-hot-toast';
import { Home } from 'lucide-react';

const Login = lazy(() => import('./component/Login/Login.jsx'));      

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = useCallback(() => {
    setShowLogin(prev => !prev);
  }, []);
 const isAdminRoute = useLocation().pathname.startsWith('/admin');
  return (
    <div className="app">
      <Toaster position="top-right" />
     { !isAdminRoute && <Navbar onLoginClick={handleLoginClick} /> }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id " element={<Moviedetails />} />
        <Route path="/mybooking" element={<Mybooking />} />
        <Route path="/movie/:id/:date" element={<Seatlayout />} />
        <Route path="/favorite" element={<Favorite />} />

      </Routes>
      { !isAdminRoute && <Footer /> }

      {showLogin && (
        <Suspense fallback={null}>
          <div
            className="login-modal-backdrop"
            onClick={() => setShowLogin(false)}
          >
            <div
              className="login-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <Login
                onClose={() => setShowLogin(false)}
              />
            </div>
          </div>
        </Suspense>
      )}

    </div>
  );
}
export default App
