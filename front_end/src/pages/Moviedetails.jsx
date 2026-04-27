import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { Blurcircal } from '../component/Blurcircal';

export const Moviedetails = () => {
   const {id} = useParams();
   const [show, setShow] = useState(null);

   const getShow = async () => {
       const show = dummyShowsData.find((showItem) => String(showItem.id) === String(id));

       if (!show) {
         setShow(null);
         return;
       }

       setShow({
        movie: show,
        dateTime: dummyDateTimeData,
       });
   }
  useEffect(() => {
    getShow();
  }, [id])



  return show?.movie ? (

    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>
       <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img src={show.movie.poster_path} alt='' className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'/>
            <div className='flex flex-col gap-6'>
                  <Blurcircal top='-100px' right='-100px' />
              </div>
       </div>
    </div>
  ) : (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>Movie not found.</div>
  )
}
