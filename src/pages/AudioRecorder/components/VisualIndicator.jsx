import React from "react"
import { RECORDING_STATES } from "../constants"

export function VisualIndicator({ recordingState }) {
  const getIndicatorStyle = () => {
    switch (recordingState) {
      case RECORDING_STATES.RECORDING:
        return {
          color: "bg-red-500",
          glow: "shadow-[0_0_20px_rgba(239,68,68,0.8)]",
          animation: "animate-pulse",
        }
      case RECORDING_STATES.PLAYING:
        return {
          color: "bg-blue-500",
          glow: "shadow-[0_0_20px_rgba(59,130,246,0.8)]",
          animation: "",
        }
      case RECORDING_STATES.STOPPED:
        return {
          color: "bg-green-500",
          glow: "",
          animation: "",
        }
      default:
        return {
          color: "bg-gray-500",
          glow: "",
          animation: "",
        }
    }
  }

  const getStatusText = () => {
    switch (recordingState) {
      case RECORDING_STATES.RECORDING:
        return "Recording..."
      case RECORDING_STATES.PLAYING:
        return "Playing..."
      case RECORDING_STATES.STOPPED:
        return "Ready to play"
      default:
        return "Ready to record"
    }
  }

  const style = getIndicatorStyle()

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`w-8 h-8 rounded-full ${style.color} ${style.glow} ${style.animation}`}
      />
      <div className="text-green-400 font-mono text-sm">{getStatusText()}</div>
    </div>
  )
}
