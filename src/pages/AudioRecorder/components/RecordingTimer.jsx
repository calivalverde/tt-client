import React from "react"
import {
  formatTime,
  MAX_RECORDING_DURATION,
  WARNING_THRESHOLD,
  CRITICAL_THRESHOLD,
} from "../constants"

export function RecordingTimer({ currentTime }) {
  const timeRemaining = MAX_RECORDING_DURATION - currentTime

  const getTimerColor = () => {
    if (timeRemaining <= CRITICAL_THRESHOLD) {
      return "text-red-400"
    } else if (timeRemaining <= WARNING_THRESHOLD) {
      return "text-yellow-400"
    }
    return "text-green-400"
  }

  const shouldBlink = timeRemaining <= CRITICAL_THRESHOLD

  return (
    <div
      className={`font-mono text-4xl font-bold ${getTimerColor()} ${
        shouldBlink ? "animate-pulse" : ""
      }`}
    >
      {formatTime(currentTime)} / {formatTime(MAX_RECORDING_DURATION)}
    </div>
  )
}
