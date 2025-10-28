import React from "react"

export function PermissionMessage({ error, type = "error" }) {
  if (!error) return null

  const bgColor = type === "error" ? "bg-red-900/30" : "bg-yellow-900/30"
  const borderColor = type === "error" ? "border-red-500" : "border-yellow-500"
  const textColor = type === "error" ? "text-red-400" : "text-yellow-400"

  return (
    <div
      className={`${bgColor} ${borderColor} border rounded-lg p-4 ${textColor} font-mono text-sm max-w-lg mx-auto`}
    >
      <div className="font-bold mb-2">
        {type === "error" ? "⚠️ Error" : "ℹ️ Notice"}
      </div>
      <div className="text-gray-300">{error}</div>
    </div>
  )
}
