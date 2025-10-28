import { useState, useRef, useCallback, useEffect } from "react"
import {
  MAX_RECORDING_DURATION,
  RECORDING_STATES,
  ERROR_MESSAGES,
} from "../constants"

export function useAudioRecorder() {
  const [recordingState, setRecordingState] = useState(RECORDING_STATES.IDLE)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioBlobUrl, setAudioBlobUrl] = useState(null)
  const [error, setError] = useState(null)

  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const timerIntervalRef = useRef(null)
  const autoStopTimeoutRef = useRef(null)
  const audioElementRef = useRef(null)

  const startRecording = useCallback(async (stream) => {
    if (!stream) {
      setError(ERROR_MESSAGES.RECORDING_FAILED)
      return false
    }

    try {
      // Clear previous recording
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl)
        setAudioBlobUrl(null)
      }
      setAudioBlob(null)
      chunksRef.current = []
      setCurrentTime(0)
      setError(null)

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        setAudioBlob(blob)
        const url = URL.createObjectURL(blob)
        setAudioBlobUrl(url)
        setRecordingState(RECORDING_STATES.STOPPED)
      }

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event.error)
        setError(ERROR_MESSAGES.RECORDING_FAILED)
        stopRecording()
      }

      // Start recording
      mediaRecorder.start()
      setRecordingState(RECORDING_STATES.RECORDING)

      // Start timer
      const startTime = Date.now()
      timerIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000
        setCurrentTime(elapsed)
      }, 100)

      // Auto-stop after 30 seconds
      autoStopTimeoutRef.current = setTimeout(() => {
        stopRecording()
      }, MAX_RECORDING_DURATION * 1000)

      return true
    } catch (err) {
      console.error("Failed to start recording:", err)
      setError(ERROR_MESSAGES.RECORDING_FAILED)
      return false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlobUrl])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }

    if (autoStopTimeoutRef.current) {
      clearTimeout(autoStopTimeoutRef.current)
      autoStopTimeoutRef.current = null
    }
  }, [])

  const playRecording = useCallback(() => {
    if (!audioBlobUrl) return

    try {
      if (audioElementRef.current) {
        audioElementRef.current.pause()
        audioElementRef.current.currentTime = 0
      }

      const audio = new Audio(audioBlobUrl)
      audioElementRef.current = audio

      audio.onplay = () => {
        setRecordingState(RECORDING_STATES.PLAYING)
      }

      audio.onended = () => {
        setRecordingState(RECORDING_STATES.STOPPED)
      }

      audio.onerror = () => {
        setError(ERROR_MESSAGES.PLAYBACK_FAILED)
        setRecordingState(RECORDING_STATES.STOPPED)
      }

      audio.play()
    } catch (err) {
      console.error("Failed to play recording:", err)
      setError(ERROR_MESSAGES.PLAYBACK_FAILED)
    }
  }, [audioBlobUrl])

  const stopPlayback = useCallback(() => {
    if (audioElementRef.current) {
      audioElementRef.current.pause()
      audioElementRef.current.currentTime = 0
      setRecordingState(RECORDING_STATES.STOPPED)
    }
  }, [])

  const deleteRecording = useCallback(() => {
    stopRecording()

    if (audioElementRef.current) {
      audioElementRef.current.pause()
      audioElementRef.current = null
    }

    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl)
    }

    setAudioBlob(null)
    setAudioBlobUrl(null)
    setCurrentTime(0)
    setRecordingState(RECORDING_STATES.IDLE)
    setError(null)
  }, [audioBlobUrl, stopRecording])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording()
      if (audioElementRef.current) {
        audioElementRef.current.pause()
      }
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl)
      }
    }
  }, [audioBlobUrl, stopRecording])

  return {
    recordingState,
    currentTime,
    audioBlob,
    audioBlobUrl,
    error,
    startRecording,
    stopRecording,
    playRecording,
    stopPlayback,
    deleteRecording,
  }
}
