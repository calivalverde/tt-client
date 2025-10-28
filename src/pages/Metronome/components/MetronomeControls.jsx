import React from "react"
import { MIN_BPM, MAX_BPM, DRONE_NOTES, getTempoName } from "../constants"

export function MetronomeControls({
  bpm,
  bpmInput,
  setBpm,
  setBpmInput,
  beatsPerMeasure,
  setBeatsPerMeasure,
  accentBeat,
  setAccentBeat,
  droneFreq,
  setDroneFreq,
  isPlaying,
  setIsPlaying,
  isDroneOn,
  setIsDroneOn,
}) {
  const handleBpmBlur = () => {
    const v = Number(bpmInput)
    const clamped =
      Number.isFinite(v) && !Number.isNaN(v)
        ? Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(v)))
        : MIN_BPM
    setBpm(clamped)
    setBpmInput(String(clamped))
  }

  const handleBpmKeyDown = (e) => {
    if (e.key === "Enter") {
      const v = Number(bpmInput)
      const clamped =
        Number.isFinite(v) && !Number.isNaN(v)
          ? Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(v)))
          : MIN_BPM
      setBpm(clamped)
      setBpmInput(String(clamped))
    }
  }

  return (
    <div style={{ minWidth: 280, textAlign: "left" }} id="controls">
      <div style={{ marginBottom: 12 }}>
        <strong className="text-xl text-white">{bpm} BPM</strong>
        <div className="text-gray-400 text-sm">{getTempoName(bpm)}</div>
      </div>

      {/* Manual BPM input */}
      <div style={{ marginBottom: 12 }}>
        <label className="block mb-2 text-gray-300">Set BPM</label>
        <input
          type="number"
          min={MIN_BPM}
          max={MAX_BPM}
          step="1"
          value={bpmInput}
          onChange={(e) => setBpmInput(e.target.value)}
          onBlur={handleBpmBlur}
          onKeyDown={handleBpmKeyDown}
          className="w-32 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label className="block mb-2 text-gray-300">Beats per measure</label>
        <input
          type="number"
          min="1"
          max="12"
          value={beatsPerMeasure}
          onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
          className="w-24 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label className="block mb-2 text-gray-300">Accent beat</label>
        <input
          type="number"
          min="1"
          max={beatsPerMeasure}
          value={accentBeat}
          onChange={(e) => setAccentBeat(Number(e.target.value))}
          className="w-24 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label className="block mb-2 text-sm text-gray-300">Drone Note</label>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <select
            value={droneFreq}
            onChange={(e) => setDroneFreq(Number(e.target.value))}
            className="w-32 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
          >
            {DRONE_NOTES.map(({ note, freq }) => (
              <option key={freq} value={freq}>
                {note}
              </option>
            ))}
          </select>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: isDroneOn ? "hsl(142 69% 58%)" : "#64748b",
              boxShadow: isDroneOn
                ? "0 0 12px hsl(142 69% 58% / 0.5)"
                : "none",
            }}
          />
          {isDroneOn && (
            <div className="text-gray-400 text-sm">
              {droneFreq.toFixed(0)} Hz
            </div>
          )}
        </div>
      </div>

      <div
        style={{ display: "flex", gap: 8, marginTop: 8, marginBottom: 12 }}
      >
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={isPlaying ? "btn-secondary" : "btn-primary"}
        >
          {isPlaying ? "Stop Metronome" : "Start Metronome"}
        </button>

        <button
          onClick={() => setIsDroneOn(!isDroneOn)}
          className={isDroneOn ? "btn-primary" : "btn-secondary"}
        >
          {isDroneOn ? "Stop Drone" : "Start Drone"}
        </button>
      </div>
    </div>
  )
}
