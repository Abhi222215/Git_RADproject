import { dummyShowsData } from '../assets/assets'

export const Featuresection = () => {
  const featured = dummyShowsData.slice(0, 3)

  return (
    <section className='px-6 py-16 md:px-16 lg:px-36'>
      <h2 className='mb-6 text-2xl font-semibold'>Featured Movies</h2>
      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {featured.map((movie) => (
          <article key={movie.id} className='overflow-hidden rounded-xl bg-white/5'>
            <img src={movie.backdrop_path} alt={movie.title} className='h-40 w-full object-cover' />
            <div className='p-4'>
              <h3 className='font-medium'>{movie.title}</h3>
              <p className='mt-1 text-sm text-gray-400'>
                {movie.genres?.slice(0, 2).map((genre) => genre.name).join(' | ')}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
