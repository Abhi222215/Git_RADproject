import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { assets } from '../assets/assets'
import backgroundImage from '../assets/backgroundImage.png'
import { useNavigate } from 'react-router-dom'


export default function HeroSection () {

  const navigate = useNavigate()

  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

      <div className="relative z-10 flex min-h-screen flex-col items-start justify-center gap-6 px-6 md:px-16 lg:px-36">
        <img src={assets.marvelLogo} alt="" className="mt-20 max-h-11 lg:h-11" />

        <h1 className="max-w-2xl text-5xl font-semibold leading-tight md:text-[70px]">
          Guardians <br /> of the Galaxy
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-300">
          <span>Action | Adventure | Sci-Fi</span>

          <div className="flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5" />
            <span>2018</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4.5 w-4.5" />
            <span>2h 8m</span>
          </div>
        </div>

        <p className="max-w-md text-gray-300 ">
          In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people
          meet in London and try to stop a conspiracy.
        </p>

        <button
          onClick={() => navigate('/movie')}
          className="flex items-center gap-1 rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600 cursor-pointer"
        >
          Explore Movies
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}
