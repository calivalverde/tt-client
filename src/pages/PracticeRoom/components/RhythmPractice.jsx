import React, { useState, useEffect } from "react"
import PracticeExercise from "./PracticeExercise"

// Mock data - will be replaced with API calls
const mockRhythmQuestions = [
  {
    id: 1,
    audioUrl: null, // Will come from API
    question: "What time signature is this rhythm in?",
    options: ["4/4", "3/4", "6/8", "5/4"],
    correctAnswer: "4/4",
  },
  {
    id: 2,
    audioUrl: null,
    question: "Which rhythm pattern do you hear?",
    options: [
      "Quarter - Quarter - Half",
      "Quarter - Eighth - Eighth - Half",
      "Half - Quarter - Quarter",
      "Dotted Half - Quarter",
    ],
    correctAnswer: "Quarter - Eighth - Eighth - Half",
  },
  {
    id: 3,
    audioUrl: null,
    question: "What time signature is this rhythm in?",
    options: ["4/4", "3/4", "6/8", "2/4"],
    correctAnswer: "3/4",
  },
]

const RhythmPractice = ({ onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState(mockRhythmQuestions)
  const [isLoading, setIsLoading] = useState(false)

  // TODO: Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true)
      try {
        // const response = await axios.get('/api/practice/rhythm')
        // setQuestions(response.data)

        // For now, using mock data
        setQuestions(mockRhythmQuestions)
      } catch (error) {
        console.error("Error fetching rhythm questions:", error)
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
      title="Rhythm Practice"
      question={currentQuestion}
      onBack={onBack}
    />
  )
}

export default RhythmPractice
