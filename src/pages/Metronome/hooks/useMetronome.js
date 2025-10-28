import { useEffect, useRef } from "react"

export function useMetronome({
  isPlaying,
  bpm,
  beatsPerMeasure,
  accentBeat,
  audioCtx,
  setCurrentBeat,
}) {
  const metronomeInterval = useRef(null)

  useEffect(() => {
    const playClick = (isAccent = false) => {
      if (!audioCtx.current) return
      const osc = audioCtx.current.createOscillator()
      const env = audioCtx.current.createGain()
      osc.frequency.value = isAccent ? 1500 : 1000
      env.gain.setValueAtTime(isAccent ? 1 : 0.6, audioCtx.current.currentTime)
      env.gain.exponentialRampToValueAtTime(
        0.001,
        audioCtx.current.currentTime + 0.1
      )
      osc.connect(env)
      env.connect(audioCtx.current.destination)
      osc.start(audioCtx.current.currentTime)
      osc.stop(audioCtx.current.currentTime + 0.1)
    }

    if (isPlaying) {
      if (!audioCtx.current)
        audioCtx.current = new (window.AudioContext ||
          window.webkitAudioContext)()
      const startMetronome = async () => {
        if (audioCtx.current.state === "suspended")
          await audioCtx.current.resume()
        let beat = 0
        const interval = (60 / bpm) * 1000
        metronomeInterval.current = setInterval(() => {
          beat = (beat % beatsPerMeasure) + 1
          setCurrentBeat(beat)
          playClick(beat === accentBeat)
        }, interval)
      }
      startMetronome()
    } else {
      clearInterval(metronomeInterval.current)
      setCurrentBeat(0)
    }
    return () => clearInterval(metronomeInterval.current)
  }, [isPlaying, bpm, beatsPerMeasure, accentBeat, audioCtx, setCurrentBeat])

  return null
}
