import React from "react"
import { Link } from "react-router"

const FeatureCard = ({ title, description, link, icon }) => (
  <Link
    to={link}
    className="bg-slate-700 p-6 rounded-lg shadow-lg hover:bg-slate-600 hover:shadow-green-500/20 transform hover:-translate-y-1 transition-all duration-300"
  >
    <div className="flex items-center mb-4">
      <div className="p-2 bg-green-500 rounded-full mr-4">{icon}</div>
      <h3 className="text-xl font-bold text-green-400">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </Link>
)

const Home = () => {
  const iconClass = "w-6 h-6 text-white"
  const features = [
    {
      title: "Metronome",
      description: "Keep your rhythm tight with our interactive metronome.",
      link: "/metronome",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconClass}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "Chord Finder",
      description:
        "Identify chords from your MIDI keyboard or our virtual piano in real-time.",
      link: "/chord-finder",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconClass}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "Theory Tools",
      description:
        "Explore scales, chords, progressions, and the Circle of Fifths. (Coming Soon)",
      link: "/scales",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconClass}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 4.804A7.968 7.968 0 0010 4c3.314 0 6 2.686 6 6s-2.686 6-6 6a7.968 7.968 0 00-1-.196v1.996c.33.04.662.06 1 .06 4.418 0 8-3.582 8-8s-3.582-8-8-8c-.338 0-.67.02-1 .06v1.996z" />
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path d="M3 6a4 4 0 115.874 3.126 2.001 2.001 0 00-5.023 5.023A4 4 0 013 6z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bungee mb-4">
        Welcome to <span className="text-green-400">TheTritone.com</span>
      </h1>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
        Your digital companion for mastering music theory. Interactive tools
        designed for musicians, by musicians. Dive in and start your journey.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  )
}

export default Home
