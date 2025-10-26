import React, { useRef, useState, useEffect } from "react"

const AudioPlayer = ({ audioUrl, autoPlay = false }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (audioUrl && autoPlay) {
      playAudio()
    }
  }, [audioUrl, autoPlay])

  const playAudio = async () => {
    if (!audioRef.current || !audioUrl) return

    try {
      setIsLoading(true)
      audioRef.current.currentTime = 0
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (error) {
      console.error("Error playing audio:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleEnded}
        preload="auto"
      />

      <button
        onClick={playAudio}
        disabled={!audioUrl || isLoading}
        className="btn-primary w-48"
      >
        {isLoading ? (
          "Loading..."
        ) : isPlaying ? (
          <>
            <span className="inline-block mr-2">🔊</span>
            Playing...
          </>
        ) : (
          <>
            <span className="inline-block mr-2">▶️</span>
            Play Audio
          </>
        )}
      </button>

      <p className="text-sm text-gray-400 font-mono">
        Press Space to replay
      </p>
    </div>
  )
}

export default AudioPlayer
