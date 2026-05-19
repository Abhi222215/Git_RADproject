
import Navbar from './component/Navbar.jsx'
import Footer from './component/Footer/footer.jsx'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Movie } from './pages/Movie.jsx'
import { Moviedetails } from './pages/Moviedetails.jsx'
import { Mybooking } from './pages/Mybooking.jsx'
import { Seatlayout } from './pages/Seatlayout.jsx'
import { Favorite } from './pages/Favorite.jsx'
import { Toaster } from 'react-hot-toast'
import Home from './pages/home.jsx'
import Login from './component/Login/login.jsx'
import { useState } from 'react'


const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <Toaster position="top-right" />
      {!isAdminRoute && <Navbar onLoginClick={handleLoginClick} />}

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Login onClose={closeLoginModal} />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id" element={<Moviedetails />} />
        <Route path="/mybooking" element={<Mybooking />} />
        <Route path="/movie/:id/:date" element={<Seatlayout />} />
        <Route path="/favorite" element={<Favorite />} />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}
export default App
