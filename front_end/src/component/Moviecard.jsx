import { StarIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Timeformater from './lib/Timeformat'

export const Moviecard = ({ Movie }) => {
  const navigate = useNavigate()

  const movieId = Movie?.id ?? Movie?._id

  const goToMovie = () => {
    if (!movieId) return
    navigate(`/movie/${movieId}`)
    scrollTo(0, 0)
  }

  return (
    <div className='flex w-66 flex-col justify-between rounded-2xl bg-gray-800 p-3 transition duration-300 hover:-translate-y-1'>
      <img
        onClick={goToMovie}
        src={Movie.backdrop_path}
        alt={Movie.title}
        className='h-52 w-full cursor-pointer rounded-lg object-cover object-bottom-right'
      />

      <p className='mt-2 truncate font-semibold'>{Movie.title}</p>
      <p className='mt-2 text-sm text-gray-400'>
        {new Date(Movie.release_date).getFullYear()} • {Movie.genres?.slice(0, 2).map((genre) => genre.name).join(' | ')} •{' '}
        {Timeformater(Movie.runtime)}
      </p>
      <div className='mt-4 flex items-center justify-between pb-3'>
        <button
          onClick={goToMovie}
          className='cursor-pointer rounded-full bg-yellow-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-500'
        >
          Buy Ticket
        </button>
        <p className='mt-1 flex items-center gap-1 pr-1 text-sm text-gray-400'>
          <StarIcon className='h-4 w-4 fill-red-500 text-red-500' fill='currentColor' />
          {Number.isFinite(Movie?.vote_average) ? Movie.vote_average.toFixed(1) : '0.0'}
        </p>
      </div>
    </div>
  )
}
