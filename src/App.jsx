import './App.css'
import Hero from './component/Hero/Hero.jsx'
import Navbar from './component/Navbar.jsx'
import { useEffect, useState } from "react";
import Footer from "./component/Footer/footer.jsx";
import Login from './component/Login/login.jsx';



function App() {

  const [loaded, setLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 300); // small delay for smooth effect
  }, []);

  return (
    <div className={loaded ? "app show" : "app"}>
      <Navbar
        onLoginClick={() => {
          setShowLogin((current) => !current);
        }}
      />

      <Hero />
      <Footer />

      {showLogin ? (
        <div
          className="login-modal-backdrop"
          onClick={() => {
            setShowLogin(false);
          }}
        >
          <div
            className="login-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Login
              onClose={() => {
                setShowLogin(false);
              }}
            />
          </div>
        </div>
      ) : null}

    </div>
  );
}
export default App
