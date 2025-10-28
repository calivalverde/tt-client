import { useEffect, useRef } from "react"

export function useDrone({ isDroneOn, droneFreq, audioCtx }) {
  const droneOsc = useRef(null)
  const droneGain = useRef(null)

  useEffect(() => {
    const handleDrone = async () => {
      if (!audioCtx.current)
        audioCtx.current = new (window.AudioContext ||
          window.webkitAudioContext)()
      if (audioCtx.current.state === "suspended")
        await audioCtx.current.resume()
      if (isDroneOn && !droneOsc.current) {
        droneOsc.current = audioCtx.current.createOscillator()
        droneGain.current = audioCtx.current.createGain()
        droneOsc.current.type = "sine"
        droneOsc.current.frequency.setValueAtTime(
          droneFreq,
          audioCtx.current.currentTime
        )
        droneGain.current.gain.setValueAtTime(0.1, audioCtx.current.currentTime)
        droneOsc.current.connect(droneGain.current)
        droneGain.current.connect(audioCtx.current.destination)
        droneOsc.current.start()
      } else if (!isDroneOn && droneOsc.current) {
        try {
          droneOsc.current.stop()
        } catch {
          // Ignore errors if oscillator is already stopped
        }
        droneOsc.current.disconnect()
        droneGain.current.disconnect()
        droneOsc.current = null
        droneGain.current = null
      } else if (isDroneOn && droneOsc.current) {
        droneOsc.current.frequency.setValueAtTime(
          droneFreq,
          audioCtx.current.currentTime
        )
      }
    }
    handleDrone()
  }, [isDroneOn, droneFreq, audioCtx])

  return null
}
