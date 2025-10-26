import React, { useState } from "react"
import IntervalsPractice from "./components/IntervalsPractice"
import ChordTypesPractice from "./components/ChordTypesPractice"
import RhythmPractice from "./components/RhythmPractice"

const PracticeRoom = () => {
  const [selectedMode, setSelectedMode] = useState(null)

  const practiceModes = [
    {
      id: "intervals",
      title: "Intervals",
      description: "Train your ear to recognize musical intervals",
      icon: "🎵",
    },
    {
      id: "chord-types",
      title: "Chord Types",
      description: "Identify different chord qualities by ear",
      icon: "🎹",
    },
    {
      id: "rhythm",
      title: "Rhythm",
      description: "Practice recognizing rhythmic patterns",
      icon: "🥁",
    },
  ]

  if (selectedMode === "intervals") {
    return <IntervalsPractice onBack={() => setSelectedMode(null)} />
  }

  if (selectedMode === "chord-types") {
    return <ChordTypesPractice onBack={() => setSelectedMode(null)} />
  }

  if (selectedMode === "rhythm") {
    return <RhythmPractice onBack={() => setSelectedMode(null)} />
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bungee text-green-400 mb-4">
        Practice Room
      </h1>
      <p className="text-xl font-mono text-gray-300 mb-12">
        Sharpen your ear training skills
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {practiceModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            className="box-clickable text-left"
          >
            <div className="text-5xl mb-4">{mode.icon}</div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">
              {mode.title}
            </h3>
            <p className="text-gray-300">{mode.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PracticeRoom
