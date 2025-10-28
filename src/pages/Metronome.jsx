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
    <div
      style={{
        textAlign: "center",
        marginTop: 28,
        padding: 24,
      }}
    >
      <h2 className="text-3xl font-bold text-green-400 mb-8">Metronome</h2>

      <div
        style={{
          marginTop: 18,
          display: "flex",
          gap: 32,
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
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
  )
}
