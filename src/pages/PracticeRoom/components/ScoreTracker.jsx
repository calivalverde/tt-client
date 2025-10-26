import React from "react"

const ScoreTracker = ({ correct, total }) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <div className="flex items-center justify-center gap-8 mb-6">
      <div className="box-green px-8 py-4">
        <div className="text-center">
          <div className="text-4xl font-mono text-green-400 mb-1">
            {correct}/{total}
          </div>
          <div className="text-sm text-gray-400">Correct Answers</div>
        </div>
      </div>

      <div className="box px-8 py-4">
        <div className="text-center">
          <div className="text-4xl font-mono text-white mb-1">
            {percentage}%
          </div>
          <div className="text-sm text-gray-400">Accuracy</div>
        </div>
      </div>
    </div>
  )
}

export default ScoreTracker
