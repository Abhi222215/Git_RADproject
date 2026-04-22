import { useState } from 'react'
import ReactPlayer from 'react-player'
import { dummyTrailers } from '../assets/assets'

export default function TrailerSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [selectedTrailer, setSelectedTrailer] = useState(null)

  return (
    <section className="px-6 md:px-16 lg:px-36 py-12">
      <h2 className="text-3xl font-semibold mb-6">Trailer Preview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyTrailers.map((trailer, index) => (
          <button
            key={trailer.videoUrl}
            type="button"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedTrailer(trailer.videoUrl)}
            className="relative text-left rounded-lg overflow-hidden group"
          >
            <img
              src={trailer.image}
              alt={`Trailer ${index + 1}`}
              className="w-full h-52 object-cover transition-transform duration-200 group-hover:scale-105"
            />

            <span className="absolute inset-0 bg-black/35 flex items-end p-3 text-sm font-medium">
              Watch trailer
            </span>

            {hoveredIndex === index && (
              <span className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                Preview
              </span>
            )}
          </button>
        ))}
      </div>

      {selectedTrailer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setSelectedTrailer(null)}
              className="absolute top-2 right-2 z-10 bg-white text-black px-2 py-1 rounded text-sm"
            >
              Close
            </button>
            <ReactPlayer
              url={selectedTrailer}
              controls
              playing
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
    </section>
  )
}
