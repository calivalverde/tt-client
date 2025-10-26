import React, { useState, useEffect } from "react"
import PracticeExercise from "./PracticeExercise"

// Mock data - will be replaced with API calls
const mockIntervalQuestions = [
  {
    id: 1,
    audioUrl: null, // Will come from API
    question: "What interval do you hear?",
    options: ["Perfect 5th", "Major 3rd", "Minor 3rd", "Perfect 4th"],
    correctAnswer: "Major 3rd",
  },
  {
    id: 2,
    audioUrl: null,
    question: "What interval do you hear?",
    options: ["Major 2nd", "Minor 2nd", "Perfect 4th", "Major 3rd"],
    correctAnswer: "Perfect 4th",
  },
  {
    id: 3,
    audioUrl: null,
    question: "What interval do you hear?",
    options: ["Perfect 5th", "Minor 6th", "Major 6th", "Perfect 4th"],
    correctAnswer: "Perfect 5th",
  },
]

const IntervalsPractice = ({ onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState(mockIntervalQuestions)
  const [isLoading, setIsLoading] = useState(false)

  // TODO: Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true)
      try {
        // const response = await axios.get('/api/practice/intervals')
        // setQuestions(response.data)

        // For now, using mock data
        setQuestions(mockIntervalQuestions)
      } catch (error) {
        console.error("Error fetching interval questions:", error)
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
      title="Intervals Practice"
      question={currentQuestion}
      onBack={onBack}
    />
  )
}

export default IntervalsPractice
