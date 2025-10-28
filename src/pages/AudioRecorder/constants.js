export const MAX_RECORDING_DURATION = 30 // seconds
export const WARNING_THRESHOLD = 10 // seconds left
export const CRITICAL_THRESHOLD = 5 // seconds left
export const TIMER_UPDATE_INTERVAL = 100 // milliseconds

export const RECORDING_STATES = {
  IDLE: "idle",
  RECORDING: "recording",
  STOPPED: "stopped",
  PLAYING: "playing",
}

export const PERMISSION_STATES = {
  PROMPT: "prompt",
  GRANTED: "granted",
  DENIED: "denied",
}

export const ERROR_MESSAGES = {
  PERMISSION_DENIED:
    "Microphone access is required to record audio. Please allow access in your browser settings.",
  NOT_SUPPORTED: "Audio recording is not supported in your browser.",
  RECORDING_FAILED: "Failed to start recording. Please try again.",
  PLAYBACK_FAILED: "Failed to play the recording. Please try again.",
}

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}
