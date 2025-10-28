import React from "react"
import MicIcon from "@mui/icons-material/Mic"
import StopIcon from "@mui/icons-material/Stop"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import DeleteIcon from "@mui/icons-material/Delete"
import PauseIcon from "@mui/icons-material/Pause"
import { RECORDING_STATES } from "../constants"

export function RecordingControls({
  recordingState,
  hasRecording,
  onStartRecording,
  onStopRecording,
  onPlayRecording,
  onStopPlayback,
  onDeleteRecording,
}) {
  const isRecording = recordingState === RECORDING_STATES.RECORDING
  const isPlaying = recordingState === RECORDING_STATES.PLAYING
  const isStopped = recordingState === RECORDING_STATES.STOPPED

  return (
    <div className="flex gap-4 justify-center items-center">
      {/* Record/Stop Button */}
      {!isRecording ? (
        <button
          onClick={onStartRecording}
          disabled={isPlaying || isStopped}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-bold transition-all ${
            isPlaying || isStopped
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/50"
          }`}
        >
          <MicIcon />
          Record
        </button>
      ) : (
        <button
          onClick={onStopRecording}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-bold transition-all bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/50 animate-pulse"
        >
          <StopIcon />
          Stop
        </button>
      )}

      {/* Play/Pause Button */}
      {hasRecording && (
        <>
          {!isPlaying ? (
            <button
              onClick={onPlayRecording}
              disabled={isRecording}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-bold transition-all ${
                isRecording
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/50"
              }`}
            >
              <PlayArrowIcon />
              Play
            </button>
          ) : (
            <button
              onClick={onStopPlayback}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-bold transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/50"
            >
              <PauseIcon />
              Pause
            </button>
          )}

          {/* Delete Button */}
          <button
            onClick={onDeleteRecording}
            disabled={isRecording}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-bold transition-all ${
              isRecording
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-500 text-white shadow-lg hover:shadow-orange-500/50"
            }`}
          >
            <DeleteIcon />
            Delete
          </button>
        </>
      )}
    </div>
  )
}
