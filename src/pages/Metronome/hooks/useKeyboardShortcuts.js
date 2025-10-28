import { useEffect } from "react"

export function useKeyboardShortcuts({
  setIsPlaying,
  setIsDroneOn,
  setBpm,
  MIN_BPM,
  MAX_BPM,
}) {
  useEffect(() => {
    const onKeyDown = (e) => {
      const active = document.activeElement
      const tag = active && active.tagName
      const isTyping =
        active &&
        (tag === "INPUT" ||
          tag === "TEXTAREA" ||
          tag === "SELECT" ||
          active.isContentEditable)
      if (isTyping) return

      const isSpace =
        e.code === "Space" || e.key === " " || e.key === "Spacebar"
      if (isSpace) {
        e.preventDefault()
        setIsPlaying((s) => !s)
        return
      }

      if (e.key === "Enter") {
        e.preventDefault()
        // Toggle both metronome and drone simultaneously
        setIsPlaying((s) => !s)
        setIsDroneOn((s) => !s)
        return
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        setBpm((prev) => Math.min(MAX_BPM, prev + 1))
        return
      }

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setBpm((prev) => Math.max(MIN_BPM, prev - 1))
        return
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [MIN_BPM, MAX_BPM, setBpm, setIsPlaying, setIsDroneOn])

  return null
}
