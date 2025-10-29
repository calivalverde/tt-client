import React, { useState, useEffect, useRef } from "react"
import { MIN_BPM, MAX_BPM } from "./Metronome/constants"
import {
  TempoDial,
  MetronomeControls,
  BeatIndicator,
  ControlsInfoBox,
} from "./Metronome/components"
import { useMetronome, useDrone, useKeyboardShortcuts } from "./Metronome/hooks"

export default function Metronome() {
  const [bpm, setBpm] = useState(120)
  const [bpmInput, setBpmInput] = useState(String(bpm))
  const [isPlaying, setIsPlaying] = useState(false)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4)
  const [accentBeat, setAccentBeat] = useState(1)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [isDroneOn, setIsDroneOn] = useState(false)
  const [droneFreq, setDroneFreq] = useState(220)

  const audioCtx = useRef(null)

  // Custom hooks for metronome logic
  useMetronome({
    isPlaying,
    bpm,
    beatsPerMeasure,
    accentBeat,
    audioCtx,
    setCurrentBeat,
  })

  useDrone({ isDroneOn, droneFreq, audioCtx })

  useKeyboardShortcuts({
    setIsPlaying,
    setIsDroneOn,
    setBpm,
    MIN_BPM,
    MAX_BPM,
  })

  // Keep the text input synced when bpm changes from other controls (e.g. dial)
  useEffect(() => {
    setBpmInput(String(bpm))
  }, [bpm])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Metronome</h1>
        <p className="text-gray-300 mb-8">
          Keep perfect time with adjustable tempo and time signatures
        </p>

        <div className="flex gap-8 justify-center items-start flex-wrap mt-8">
          <TempoDial bpm={bpm} setBpm={setBpm} />

          <MetronomeControls
            bpm={bpm}
            bpmInput={bpmInput}
            setBpm={setBpm}
            setBpmInput={setBpmInput}
            beatsPerMeasure={beatsPerMeasure}
            setBeatsPerMeasure={setBeatsPerMeasure}
            accentBeat={accentBeat}
            setAccentBeat={setAccentBeat}
            droneFreq={droneFreq}
            setDroneFreq={setDroneFreq}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isDroneOn={isDroneOn}
            setIsDroneOn={setIsDroneOn}
          />
        </div>

        {isPlaying && (
          <BeatIndicator
            beatsPerMeasure={beatsPerMeasure}
            currentBeat={currentBeat}
            accentBeat={accentBeat}
          />
        )}

        <ControlsInfoBox />
      </div>
    </div>
  )
}
