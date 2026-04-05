import React from 'react'
import './Hero.css'
import posterImg from '../../assets/61r5oqD3diL.jpg' // 👈 import this

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-card">
        <div className="hero-poster">
          <img
            src={posterImg}   // 👈 use this
            alt="Mission: Impossible - Dead Reckoning Part One poster"
          />
        </div>

        <div className="hero-details">
          <h1>
            Mission: Impossible - Dead Reckoning <span>Part One</span>
          </h1>

          <p>
            Mission: Impossible – Dead Reckoning is an adrenaline-fueled thriller
            where IMF agent Ethan Hunt chases a destabilizing rogue weapon of
            global destruction.
A global race against time to stop a powerful AI threat, filled with action, suspense, and unexpected twists.
          </p>

          <div className="hero-tags">
            <span>Action</span>
            <span>Adventure</span>
            <span>Thriller</span>
          </div>

          <div className="hero-meta">
            <span>Duration: 2h 43m</span>
              <div className="hero-rating">
                <span>⭐️⭐️⭐️⭐️☆</span> {/* Example: 4 out of 5 stars */}
                 <span className="rating-score">4.0/5</span>
              </div>
         
            
            <button className="btn">Buy Tickets</button> {/* fixed */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero