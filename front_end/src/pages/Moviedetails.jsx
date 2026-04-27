import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { dummyShowsData, dummyDateTimeData } from '../assets/assets'
import { CalendarIcon, ClockIcon, StarIcon } from 'lucide-react'

export const Moviedetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const movie = dummyShowsData.find((m) => String(m.id) === String(id))

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400 text-xl">
        Movie not found.
      </div>
    )
  }

  const dates = Object.keys(dummyDateTimeData)
  const times = selectedDate ? dummyDateTimeData[selectedDate] : []

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      navigate(`/movie/${id}/${selectedTime.showId}`)
    }
  }

  const formatRuntime = (minutes) => {
    if (!minutes && minutes !== 0) return 'N/A'
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}h ${m}m`
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (isoStr) => {
    return new Date(isoStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-16 lg:px-36 -mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-48 md:w-56 rounded-xl shadow-2xl flex-shrink-0 self-start"
          />

          {/* Info */}
          <div className="flex flex-col gap-4 pt-4 md:pt-20">
            <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>

            {movie.tagline && (
              <p className="text-gray-400 italic text-lg">{movie.tagline}</p>
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {(movie.genres ?? []).map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{movie.vote_average != null ? movie.vote_average.toFixed(1) : 'N/A'} ({(movie.vote_count ?? 0).toLocaleString()} votes)</span>
              </div>
              <span className="uppercase text-xs bg-white/10 px-2 py-1 rounded">
                {movie.original_language}
              </span>
            </div>

            {/* Overview */}
            <p className="text-gray-300 leading-relaxed max-w-2xl">{movie.overview}</p>
          </div>
        </div>

        {/* Cast */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {(movie.casts ?? []).map((cast, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-shrink-0 w-20">
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                />
                <span className="text-xs text-gray-300 text-center leading-tight">{cast.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Date & Time Selection */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Select Date</h2>
          <div className="flex gap-3 flex-wrap">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => { setSelectedDate(date); setSelectedTime(null) }}
                className={`px-4 py-2 rounded-lg border transition-colors cursor-pointer ${
                  selectedDate === date
                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                    : 'border-white/20 text-gray-300 hover:border-[var(--color-primary)]'
                }`}
              >
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </button>
            ))}
          </div>

          {selectedDate && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Select Time</h2>
              <div className="flex gap-3 flex-wrap">
                {times.map((show) => (
                  <button
                    key={show.showId}
                    onClick={() => setSelectedTime(show)}
                    className={`px-4 py-2 rounded-lg border transition-colors cursor-pointer ${
                      selectedTime?.showId === show.showId
                        ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                        : 'border-white/20 text-gray-300 hover:border-[var(--color-primary)]'
                    }`}
                  >
                    {formatTime(show.time)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <button
              onClick={handleBooking}
              className="mt-8 px-8 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition-colors rounded-full font-semibold text-white cursor-pointer"
            >
              Book Seats
            </button>
          )}
        </div>

        <div className="mt-16" />
      </div>
    </div>
  )
}
