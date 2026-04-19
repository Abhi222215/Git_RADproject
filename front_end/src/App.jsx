import './App.css'
import Hero from './component/Hero/Hero.jsx'
import Navbar from './component/Navbar.jsx'
import { lazy, Suspense, useCallback, useState } from "react";
import Footer from "./component/Footer/footer.jsx";

const Login = lazy(() => import('./component/Login/login.jsx'));

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = useCallback(() => {
    setShowLogin(prev => !prev);
  }, []);

  return (
    <div className="app">
      <Navbar onLoginClick={handleLoginClick} />

      <Hero />
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
