import React from "react"

const AnswerOptions = ({
  options,
  selectedAnswer,
  correctAnswer,
  onSelect,
  disabled,
}) => {
  const getButtonClass = (option) => {
    const baseClass = "w-full px-6 py-4 rounded-lg font-medium transition-all text-lg"

    // If answer is submitted (disabled)
    if (disabled) {
      if (option === correctAnswer) {
        return `${baseClass} bg-green-500 text-black border-2 border-green-400`
      }
      if (option === selectedAnswer && option !== correctAnswer) {
        return `${baseClass} bg-red-500 text-white border-2 border-red-400`
      }
      return `${baseClass} bg-slate-700 text-gray-400 border-2 border-slate-600`
    }

    // Before submission
    if (option === selectedAnswer) {
      return `${baseClass} bg-green-500 text-black border-2 border-green-400`
    }

    return `${baseClass} bg-slate-700 text-white border-2 border-slate-600 hover:border-green-400 hover:bg-slate-600`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {options.map((option, index) => (
        <button
          key={option}
          onClick={() => !disabled && onSelect(option)}
          disabled={disabled}
          className={getButtonClass(option)}
        >
          <span className="font-mono mr-3 text-green-400">{index + 1}.</span>
          {option}
        </button>
      ))}
    </div>
  )
}

export default AnswerOptions
