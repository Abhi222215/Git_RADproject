
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


function App() {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');
  return (
    <div className="app">
      <Toaster position="top-right" />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id" element={<Moviedetails />} />
        <Route path="/mybooking" element={<Mybooking />} />
        <Route path="/movie/:id/:date" element={<Seatlayout />} />
        <Route path="/favorite" element={<Favorite />} />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
export default App
