import './App.css'
import Hero from './component/Hero/Hero.jsx'
import Navbar from './component/Navbar.jsx'
import { useEffect, useState } from "react";
  
import Footer from './component/Footer.jsx';


function App() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 300); // small delay for smooth effect
  }, []);

  return (
    <div className={loaded ? "app show" : "app"}>
      <Navbar />
      <Hero />
      <Footer />

    </div>
  );
}
export default App
