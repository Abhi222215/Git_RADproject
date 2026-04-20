import './App.css'
import Hero from './component/Hero/Hero.jsx'
import Navbar from './component/Navbar.jsx'
import { lazy, Suspense, useCallback, useState } from "react";
import Footer from "./component/Footer/footer.jsx";
import { Route, Routes } from 'react-router-dom';
import { Movie } from './pages/Movie.jsx';
import { Moviedetails } from './pages/Moviedetails.jsx';
import { Mybooking } from './pages/Mybooking.jsx';
import { Seatlayout } from './pages/Seatlayout.jsx';
import { Favorite } from './pages/Favorite.jsx';

const Login = lazy(() => import('./component/Login/login.jsx'));

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = useCallback(() => {
    setShowLogin(prev => !prev);
  }, []);

  return (
    <div className="app">
      <Navbar onLoginClick={handleLoginClick} />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/moviedetails" element={<Moviedetails />} />
        <Route path="/mybooking" element={<Mybooking />} />
        <Route path="/seatlayout" element={<Seatlayout />} />
        <Route path="/favorite" element={<Favorite />} />

      </Routes>
      <Footer />

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
