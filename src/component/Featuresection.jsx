import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { dummyShowsData } from '../assets/assets'
import { Blurcircal } from './Blurcircal'
import { Moviecard } from './Moviecard'

export const Featuresection = () => {
  const navigate = useNavigate()
  const featured = dummyShowsData.slice(0, 8)

  return (
    <div className='overflow-hidden px-6 md:px-16 lg:px-24 xl:px-44'>
      <div className='relative pt-20'>
        <Blurcircal bottom='0' right='-80px' />

        <div className='scroll-reveal flex items-center justify-between' data-scroll-reveal>
          <p className='text-lg font-medium text-gray-300'>Now Showing</p>
          <button
            onClick={() => navigate('/movie')}
            className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'
          >
            View All
            <ArrowRight className='h-4 w-4 transition group-hover:translate-x-0.5'/>
          </button>
        </div>

        <div className='mt-6 flex flex-wrap gap-8 max-sm:justify-center'>
          {featured.map((movie, index) => (
            <Moviecard
              Movie={movie}
              key={movie.id ?? movie._id}
              className='scroll-reveal scroll-reveal-card'
              data-scroll-reveal
              style={{ '--reveal-delay': `${index * 55}ms` }}
            />
          ))}
        </div>

        <div className='scroll-reveal mt-20 flex justify-center' data-scroll-reveal>
          <button
            onClick={() => navigate('/movie')}
            className='cursor-pointer rounded-md bg-(--color-primary) px-10 py-3 text-sm font-medium transition hover:bg-(--color-primary-dull)'
          >
            Show more
          </button>
        </div>
      </div>
    </div>
  
  )
}
