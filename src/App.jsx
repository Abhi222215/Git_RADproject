import './App.css'
import Hero from './component/Hero/Hero.jsx'
import Navbar from './component/Navbar.jsx'
import { useEffect, useState } from "react";
import Footer from "./component/Footer/footer.jsx";/* i change the footer file name to lowercase as it is a convention to have component file names start with uppercase letters. I also added the import statement for the Footer component in the App.jsx file.*/
import Login from './component/Login/login.jsx';



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
      <Login />

    </div>
  );
}
export default App
