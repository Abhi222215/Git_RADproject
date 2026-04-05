import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className='navbar'>
        <img src="" alt="" />
     
     <ul className="nav-menu">
  <li><a href="/Home">Home</a></li>
  <li><a href="/about">About</a></li>

  {/* Movies with dropdown */}
  <li className="dropdown">
    <a href="/movies">Movies ▼</a>
    <ul className="dropdown-menu">
      <li><a href="/movies/action">Action</a></li>
      <li><a href="/movies/adventure">Adventure</a></li>
      <li><a href="/movies/thriller">Thriller</a></li>
    </ul>
  </li>

  <li><a href="/contact">Contact</a></li>
  <li>
    <button className="login-btn" onClick={() => console.log('Login clicked')}>Login</button>
  </li>
</ul>
    </nav>
  )
}

export default Navbar