import React, { useEffect } from "react"
import {
  RecordingTimer,
  VisualIndicator,
  PermissionMessage,
  RecordingControls,
} from "./AudioRecorder/components"
import { useAudioRecorder, useMicrophonePermission } from "./AudioRecorder/hooks"
import { RECORDING_STATES } from "./AudioRecorder/constants"

export default function AudioRecorder() {
  const {
    stream,
    error: permissionError,
    requestPermission,
    releaseStream,
  } = useMicrophonePermission()

  const {
    recordingState,
    currentTime,
    audioBlobUrl,
    error: recordingError,
    startRecording,
    stopRecording,
    playRecording,
    stopPlayback,
    deleteRecording,
  } = useAudioRecorder()

  const handleStartRecording = async () => {
    let audioStream = stream

    if (!audioStream) {
      audioStream = await requestPermission()
    }

    if (audioStream) {
      await startRecording(audioStream)
    }
  }

  const handleDeleteRecording = () => {
    deleteRecording()
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      releaseStream()
    }
  }, [releaseStream])

  const error = permissionError || recordingError
  const hasRecording = audioBlobUrl !== null

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
      <h2 className="text-3xl font-bold text-green-400 mb-8">Audio Recorder</h2>

      <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full shadow-2xl border border-gray-800">
        {/* Visual Indicator */}
        <div className="mb-8">
          <VisualIndicator recordingState={recordingState} />
        </div>

        {/* Timer - Only show during recording or if there's a recording */}
        {(recordingState === RECORDING_STATES.RECORDING || hasRecording) && (
          <div className="mb-8 text-center">
            <RecordingTimer currentTime={currentTime} />
          </div>
        )}

        {/* Controls */}
        <div className="mb-8">
          <RecordingControls
            recordingState={recordingState}
            hasRecording={hasRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={stopRecording}
            onPlayRecording={playRecording}
            onStopPlayback={stopPlayback}
            onDeleteRecording={handleDeleteRecording}
          />
        </div>

        {/* Error Messages */}
        {error && (
          <div className="mb-6">
            <PermissionMessage error={error} />
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gray-800 text-green-400 font-mono p-3 rounded-lg text-sm text-left">
          <div className="font-bold mb-3">📝 Instructions:</div>
          <ul className="space-y-2 text-gray-300">
            <li>• Click <span className="text-green-400 font-bold">Record</span> to start recording (max 30 seconds)</li>
            <li>• Click <span className="text-red-400 font-bold">Stop</span> to end recording early</li>
            <li>• Use <span className="text-blue-400 font-bold">Play</span> to listen to your recording</li>
            <li>• Click <span className="text-orange-400 font-bold">Delete</span> to remove and record again</li>
            <li>• Recording stops automatically at 30 seconds</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
