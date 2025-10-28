import React from "react"

export function ControlsInfoBox() {
  return (
    <div className="bg-gray-900 text-green-400 font-mono p-3 rounded-lg max-w-2xl mx-auto mt-12 text-sm text-left">
      <div className="font-bold mb-3">🎵 Metronome Controls:</div>
      <ul className="space-y-2 text-gray-300">
        <li>• Click or drag the tempo dial to set BPM</li>
        <li>
          • Select a Drone note from the dropdown to play a reference pitch
        </li>
        <li>
          • Press <span className="text-green-400 font-bold">[Enter]</span> to
          start or stop both the metronome and drone
        </li>
        <li>
          • Press <span className="text-green-400 font-bold">[Space]</span> to
          start or stop the metronome only
        </li>
        <li>
          • Use <span className="text-green-400 font-bold">[↑]</span> /{" "}
          <span className="text-green-400 font-bold">[↓]</span> arrow keys to
          adjust BPM
        </li>
      </ul>
    </div>
  )
}
