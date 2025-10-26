import React, { useState, useEffect } from "react"
import PracticeExercise from "./PracticeExercise"

// Mock data - will be replaced with API calls
const mockChordQuestions = [
  {
    id: 1,
    audioUrl: null, // Will come from API
    question: "What chord type do you hear?",
    options: ["Major", "Minor", "Diminished", "Augmented"],
    correctAnswer: "Major",
  },
  {
    id: 2,
    audioUrl: null,
    question: "What chord type do you hear?",
    options: ["Major 7th", "Minor 7th", "Dominant 7th", "Major"],
    correctAnswer: "Minor 7th",
  },
  {
    id: 3,
    audioUrl: null,
    question: "What chord type do you hear?",
    options: ["Major", "Minor", "Suspended 4th", "Suspended 2nd"],
    correctAnswer: "Suspended 4th",
  },
]

const ChordTypesPractice = ({ onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState(mockChordQuestions)
  const [isLoading, setIsLoading] = useState(false)

  // TODO: Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true)
      try {
        // const response = await axios.get('/api/practice/chord-types')
        // setQuestions(response.data)

        // For now, using mock data
        setQuestions(mockChordQuestions)
      } catch (error) {
        console.error("Error fetching chord type questions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Loop back to first question
      setCurrentQuestionIndex(0)
    }
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <p className="text-xl text-gray-400">Loading questions...</p>
      </div>
    )
  }

  const currentQuestion = {
    ...questions[currentQuestionIndex],
    onNext: handleNext,
  }

  return (
    <PracticeExercise
      title="Chord Types Practice"
      question={currentQuestion}
      onBack={onBack}
    />
  )
}

export default ChordTypesPractice
