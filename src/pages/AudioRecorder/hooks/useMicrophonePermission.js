import { useState, useCallback } from "react"
import { PERMISSION_STATES, ERROR_MESSAGES } from "../constants"

export function useMicrophonePermission() {
  const [permissionStatus, setPermissionStatus] = useState(
    PERMISSION_STATES.PROMPT
  )
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)

  const requestPermission = useCallback(async () => {
    setError(null)

    // Check if MediaRecorder is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError(ERROR_MESSAGES.NOT_SUPPORTED)
      setPermissionStatus(PERMISSION_STATES.DENIED)
      return null
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
      setStream(mediaStream)
      setPermissionStatus(PERMISSION_STATES.GRANTED)
      return mediaStream
    } catch (err) {
      console.error("Microphone permission error:", err)
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setError(ERROR_MESSAGES.PERMISSION_DENIED)
      } else {
        setError(err.message || ERROR_MESSAGES.RECORDING_FAILED)
      }
      setPermissionStatus(PERMISSION_STATES.DENIED)
      return null
    }
  }, [])

  const releaseStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }, [stream])

  return {
    permissionStatus,
    stream,
    error,
    requestPermission,
    releaseStream,
  }
}
