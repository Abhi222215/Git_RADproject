
import React from 'react'
import Herosection from '../component/Herosection.jsx'
import { Featuresection } from '../component/Featuresection.jsx'
import { Trailersection } from '../component/Trailersection.jsx'
export default function Home() {
  return (
    <>
      <Herosection />
      <Featuresection />
      <div className='mt-14 mb-12'>
        <Trailersection />
      </div>
    </>
  )
}

