import React from 'react'
import { dummyShowsData } from '../assets/assets'
import { Moviecard } from '../component/Moviecard'
import { Blurcircal } from '../component/Blurcircal'

export const Favorite = () => {

  return dummyShowsData.length > 0 ? (
    <div className='relative my-40 mb-60 px-6
    md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <Blurcircal bottom='50px' right='50px' />
      <Blurcircal top='50px' left='50px' />  

       <h1 className='text-lg font-medium my-4'>
        Your Favorite Movies
       </h1>
         <div className='flex flex-wrap max:sm:justify-center gap-8'>
          {dummyShowsData.map((movie) => (
            <Moviecard Movie={movie} key={movie.id}/>
          ))}
               
         </div>
    </div>
  ) : (

       <div className='
       flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold text-center'>
          No Movies available
        </h1>

       </div>
  )
}