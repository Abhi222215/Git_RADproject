import { dummyTrailers } from '../assets/assets'

export const Trailersection = () => {
  return (
    <section className='px-6 pb-20 md:px-16 lg:px-36'>
      <h2 className='mb-6 text-2xl font-semibold'>Trailers</h2>
      <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {dummyTrailers.map((trailer, index) => (
          <a
            key={index}
            href={trailer.videoUrl}
            target='_blank'
            rel='noreferrer'
            className='group overflow-hidden rounded-xl bg-white/5'
          >
            <img
              src={trailer.image}
              alt='Movie trailer thumbnail'
              className='h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105'
            />
          </a>
        ))}
      </div>
    </section>
  )
}
