import React, { useState, useEffect } from "react"
import AudioPlayer from "./AudioPlayer"
import AnswerOptions from "./AnswerOptions"
import ScoreTracker from "./ScoreTracker"

const PracticeExercise = ({ title, question, onBack }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [feedback, setFeedback] = useState("")

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isSubmitted) return

      // Number keys 1-4 for answer selection
      const num = parseInt(e.key)
      if (num >= 1 && num <= question.options.length) {
        setSelectedAnswer(question.options[num - 1])
      }

      // Enter to submit
      if (e.key === "Enter" && selectedAnswer) {
        handleSubmit()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedAnswer, isSubmitted, question])

  const handleSubmit = () => {
    if (!selectedAnswer) return

    setIsSubmitted(true)
    const isCorrect = selectedAnswer === question.correctAnswer

    if (isCorrect) {
      setScore((prev) => ({
        correct: prev.correct + 1,
        total: prev.total + 1,
      }))
      setFeedback("✅ Correct! Great job!")
    } else {
      setScore((prev) => ({
        correct: prev.correct,
        total: prev.total + 1,
      }))
      setFeedback(
        `❌ Incorrect. The correct answer is: ${question.correctAnswer}`
      )
    }
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setIsSubmitted(false)
    setFeedback("")
    question.onNext?.()
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="btn-secondary">
          ← Back to Practice Room
        </button>
        <h2 className="text-3xl font-bungee text-green-400">{title}</h2>
      </div>

      {/* Score Tracker */}
      <ScoreTracker correct={score.correct} total={score.total} />

      {/* Question */}
      <div className="box-green mb-8 text-center">
        <h3 className="text-2xl text-white mb-6">{question.question}</h3>

        {/* Audio Player */}
        <AudioPlayer audioUrl={question.audioUrl} autoPlay={false} />
      </div>

      {/* Answer Options */}
      <AnswerOptions
        options={question.options}
        selectedAnswer={selectedAnswer}
        correctAnswer={question.correctAnswer}
        onSelect={setSelectedAnswer}
        disabled={isSubmitted}
      />

      {/* Feedback */}
      {feedback && (
        <div className="mt-6 text-center">
          <p className="text-xl font-mono text-white">{feedback}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="btn-primary px-8 py-3"
          >
            Submit Answer
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary px-8 py-3">
            Next Question →
          </button>
        )}
      </div>

      {/* Keyboard Hints */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400 font-mono">
          Keyboard: 1-4 to select • Enter to submit • Space to replay audio
        </p>
      </div>
    </div>
  )
}

export default PracticeExercise
