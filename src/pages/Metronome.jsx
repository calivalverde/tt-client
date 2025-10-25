import React, { useState, useEffect, useRef } from "react"

export default function Metronome() {
  const [bpm, setBpm] = useState(120)
  // allow free typing in BPM input (string) and commit on blur/Enter
  const [bpmInput, setBpmInput] = useState(String(bpm))
  const [isPlaying, setIsPlaying] = useState(false)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4)
  const [accentBeat, setAccentBeat] = useState(1)
  const [currentBeat, setCurrentBeat] = useState(0)

  const [isDroneOn, setIsDroneOn] = useState(false)
  const [droneFreq, setDroneFreq] = useState(110)

  const audioCtx = useRef(null)
  const metronomeInterval = useRef(null)
  const droneOsc = useRef(null)
  const droneGain = useRef(null)

  const MIN_BPM = 40
  const MAX_BPM = 208

  const tempoRanges = [
    { name: "Largo", min: 40, max: 60 },
    { name: "Larghetto", min: 60, max: 66 },
    { name: "Adagio", min: 66, max: 76 },
    { name: "Adagietto", min: 72, max: 76 },
    { name: "Andante", min: 76, max: 108 },
    { name: "Andantino", min: 80, max: 108 },
    { name: "Moderato", min: 108, max: 120 },
    { name: "Allegretto", min: 112, max: 120 },
    { name: "Allegro", min: 120, max: 168 },
    { name: "Vivace", min: 140, max: 176 },
    { name: "Presto", min: 168, max: 200 },
    { name: "Prestissimo", min: 200, max: 208 },
  ]

  const getTempoName = (bpmVal) => {
    const found = tempoRanges.find((r) => bpmVal >= r.min && bpmVal <= r.max)
    return found ? found.name : "Custom"
  }

  // === METRONOME LOGIC ===
  useEffect(() => {
    if (isPlaying) {
      if (!audioCtx.current)
        audioCtx.current = new (window.AudioContext ||
          window.webkitAudioContext)()
      const startMetronome = async () => {
        if (audioCtx.current.state === "suspended")
          await audioCtx.current.resume()
        let beat = 0
        const interval = (60 / bpm) * 1000
        metronomeInterval.current = setInterval(() => {
          beat = (beat % beatsPerMeasure) + 1
          setCurrentBeat(beat)
          playClick(beat === accentBeat)
        }, interval)
      }
      startMetronome()
    } else {
      clearInterval(metronomeInterval.current)
      setCurrentBeat(0)
    }
    return () => clearInterval(metronomeInterval.current)
  }, [isPlaying, bpm, beatsPerMeasure, accentBeat])

  // === DRONE LOGIC ===
  useEffect(() => {
    const handleDrone = async () => {
      if (!audioCtx.current)
        audioCtx.current = new (window.AudioContext ||
          window.webkitAudioContext)()
      if (audioCtx.current.state === "suspended")
        await audioCtx.current.resume()
      if (isDroneOn && !droneOsc.current) {
        droneOsc.current = audioCtx.current.createOscillator()
        droneGain.current = audioCtx.current.createGain()
        droneOsc.current.type = "sine"
        droneOsc.current.frequency.setValueAtTime(
          droneFreq,
          audioCtx.current.currentTime
        )
        droneGain.current.gain.setValueAtTime(0.1, audioCtx.current.currentTime)
        droneOsc.current.connect(droneGain.current)
        droneGain.current.connect(audioCtx.current.destination)
        droneOsc.current.start()
      } else if (!isDroneOn && droneOsc.current) {
        try {
          droneOsc.current.stop()
        } catch (_) {}
        droneOsc.current.disconnect()
        droneGain.current.disconnect()
        droneOsc.current = null
        droneGain.current = null
      } else if (isDroneOn && droneOsc.current) {
        droneOsc.current.frequency.setValueAtTime(
          droneFreq,
          audioCtx.current.currentTime
        )
      }
    }
    handleDrone()
  }, [isDroneOn, droneFreq])

  const playClick = (isAccent = false) => {
    if (!audioCtx.current) return
    const osc = audioCtx.current.createOscillator()
    const env = audioCtx.current.createGain()
    osc.frequency.value = isAccent ? 1500 : 1000
    env.gain.setValueAtTime(isAccent ? 1 : 0.6, audioCtx.current.currentTime)
    env.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.current.currentTime + 0.1
    )
    osc.connect(env)
    env.connect(audioCtx.current.destination)
    osc.start(audioCtx.current.currentTime)
    osc.stop(audioCtx.current.currentTime + 0.1)
  }

  // === TEMPO DIAL ===
  function TempoDial({ bpm, setBpm }) {
    const size = 400
    const padding = 56
    const center = size / 2
    const radius = 160
    const tickOuter = radius
    const tickInner = radius - 14
    const labelRadius = radius + 45
    const ticks = 72

    const startAngle = 210
    const endAngle = 510
    const activeArc = endAngle - startAngle

    const angleToBpm = (angleDeg) => {
      let normalized = angleDeg
      if (normalized < startAngle) normalized += 360
      const t = (normalized - startAngle) / activeArc
      return Math.round(MIN_BPM + t * (MAX_BPM - MIN_BPM))
    }

    const bpmToAngle = (bpmVal) => {
      const t = (bpmVal - MIN_BPM) / (MAX_BPM - MIN_BPM)
      return startAngle + t * activeArc
    }

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

    const isWithinActiveArc = (angleDeg) => {
      let a = angleDeg
      if (a < startAngle) a += 360
      return a >= startAngle && a <= endAngle
    }

    const handleClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const svgX = ((e.clientX - rect.left) * size) / rect.width
      const svgY = ((e.clientY - rect.top) * size) / rect.height
      const dx = svgX - center
      const dy = svgY - center
      let theta = Math.atan2(dy, dx)
      let angleDeg = (theta * 180) / Math.PI + 90
      if (angleDeg < 0) angleDeg += 360
      if (!isWithinActiveArc(angleDeg)) return
      const newBpm = angleToBpm(angleDeg)
      setBpm(clamp(newBpm, MIN_BPM, MAX_BPM))
    }

    const tickElements = []
    for (let i = 0; i <= ticks; i++) {
      const t = i / ticks
      const angleDeg = startAngle + t * activeArc
      const angRad = ((angleDeg - 90) * Math.PI) / 180
      const x1 = center + tickInner * Math.cos(angRad)
      const y1 = center + tickInner * Math.sin(angRad)
      const x2 = center + tickOuter * Math.cos(angRad)
      const y2 = center + tickOuter * Math.sin(angRad)
      tickElements.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={i % 6 === 0 ? "#00ff99" : "#37474f"}
          strokeWidth={i % 6 === 0 ? 2 : 1}
          strokeLinecap="round"
        />
      )
    }

    const labelElements = (() => {
      const placedAngles = []
      const thresholdDeg = 12
      const extraRadius = 14
      const elements = []

      tempoRanges.forEach((r, idx) => {
        const mid = Math.min(
          MAX_BPM,
          Math.max(MIN_BPM, Math.round((r.min + r.max) / 2))
        )
        const angleDeg = bpmToAngle(mid)
        let radiusAdj = 0
        for (const a of placedAngles) {
          const diff = Math.abs(((angleDeg - a + 540) % 360) - 180)
          if (diff < thresholdDeg) {
            radiusAdj = Math.max(radiusAdj, extraRadius)
          }
        }
        const useRadius = labelRadius + radiusAdj
        const angRad = ((angleDeg - 90) * Math.PI) / 180
        const lx = center + useRadius * Math.cos(angRad)
        const ly = center + useRadius * Math.sin(angRad)
        let anchor = "middle"
        if (angleDeg > 315 || angleDeg < 45) anchor = "middle"
        else if (angleDeg >= 45 && angleDeg < 135) anchor = "start"
        else if (angleDeg >= 135 && angleDeg < 225) anchor = "middle"
        else anchor = "end"

        elements.push(
          <text
            key={idx}
            x={lx}
            y={ly}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="13"
            fill="#00ff99"
            style={{ userSelect: "none" }}
          >
            {r.name}
          </text>
        )

        placedAngles.push(angleDeg)
      })

      return elements
    })()

    const angleDeg = bpmToAngle(clamp(bpm, MIN_BPM, MAX_BPM))
    const needleRad = ((angleDeg - 90) * Math.PI) / 180
    const needleLength = radius - 6
    const nx = center + needleLength * Math.cos(needleRad)
    const ny = center + needleLength * Math.sin(needleRad)

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <svg
          width={size + padding * 2}
          height={size + padding * 2}
          viewBox={`${-padding} ${-padding} ${size + padding * 2} ${
            size + padding * 2
          }`}
          onClick={handleClick}
          style={{ cursor: "pointer", overflow: "visible" }}
        >
          <circle
            cx={center}
            cy={center}
            r={radius + 6}
            fill="#121212"
            stroke="#37474f"
            strokeWidth="2"
          />
          <g>{tickElements}</g>
          <g>{labelElements}</g>
          <line
            x1={center}
            y1={center}
            x2={nx}
            y2={ny}
            stroke="#00ff99"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px #00ff99)" }}
          />
          <circle
            cx={center}
            cy={center}
            r={60}
            fill="#263238"
            stroke="#00000033"
          />
        </svg>

        {/* Center knob */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "linear-gradient(145deg, #1c1c1c, #2a2a2a)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#00ff99",
              textAlign: "center",
              boxShadow:
                "inset 0 -6px 12px rgba(0,255,128,0.25), 0 4px 12px rgba(0,0,0,0.6)",
              pointerEvents: "auto",
              fontWeight: 700,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 28 }}>{bpm}</div>
            <div style={{ fontSize: 14, color: "#00ff99a0", marginTop: 4 }}>
              {getTempoName(bpm)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // keep the text input synced when bpm changes from other controls (e.g. dial)
  useEffect(() => {
    setBpmInput(String(bpm))
  }, [bpm])

  // keyboard shortcuts: Space toggles metronome; ArrowUp/ArrowDown adjust BPM
  useEffect(() => {
    const onKeyDown = (e) => {
      const active = document.activeElement
      const tag = active && active.tagName
      const isTyping =
        active &&
        (tag === "INPUT" || tag === "TEXTAREA" || active.isContentEditable)
      if (isTyping) return

      const isSpace =
        e.code === "Space" || e.key === " " || e.key === "Spacebar"
      if (isSpace) {
        e.preventDefault()
        setIsPlaying((s) => !s)
        return
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        setBpm((prev) => Math.min(MAX_BPM, prev + 1))
        return
      }

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setBpm((prev) => Math.max(MIN_BPM, prev - 1))
        return
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [MIN_BPM, MAX_BPM])

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 28,
        fontFamily: "Inter, Roboto, sans-serif",
        padding: 24,
        background: "#121212",
        color: "#00ff99",
      }}
    >
      <h2 style={{ margin: 0, fontSize: 20 }}>Metronome</h2>
      <div
        style={{
          marginTop: 18,
          display: "flex",
          gap: 32,
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <TempoDial bpm={bpm} setBpm={setBpm} />

        {/* Controls from second component */}
        <div style={{ minWidth: 280, textAlign: "left" }} id="controls">
          <div style={{ marginBottom: 12 }}>
            <strong>{bpm} BPM</strong>
            <div style={{ color: "#607d8b", fontSize: 13 }}>
              {getTempoName(bpm)}
            </div>
          </div>

          {/* Manual BPM input */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Set BPM</label>
            <input
              type="number"
              min={MIN_BPM}
              max={MAX_BPM}
              step="1"
              value={bpmInput}
              onChange={(e) => {
                // keep as string so user can type partial values
                setBpmInput(e.target.value)
              }}
              onBlur={() => {
                // commit on blur
                const v = Number(bpmInput)
                const clamped =
                  Number.isFinite(v) && !Number.isNaN(v)
                    ? Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(v)))
                    : MIN_BPM
                setBpm(clamped)
                setBpmInput(String(clamped))
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const v = Number(bpmInput)
                  const clamped =
                    Number.isFinite(v) && !Number.isNaN(v)
                      ? Math.max(MIN_BPM, Math.min(MAX_BPM, Math.round(v)))
                      : MIN_BPM
                  setBpm(clamped)
                  setBpmInput(String(clamped))
                }
              }}
              style={{
                width: 120,
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #e0e0e0",
              }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 6 }}>
              Beats per measure
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={beatsPerMeasure}
              onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
              style={{
                width: 80,
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #e0e0e0",
              }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 6 }}>
              Accent beat
            </label>
            <input
              type="number"
              min="1"
              max={beatsPerMeasure}
              value={accentBeat}
              onChange={(e) => setAccentBeat(Number(e.target.value))}
              style={{
                width: 80,
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #e0e0e0",
              }}
            />
          </div>

          <div
            style={{ display: "flex", gap: 8, marginTop: 8, marginBottom: 12 }}
          >
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                background: isPlaying ? "#ef5350" : "#3949ab",
                color: "white",
                cursor: "pointer",
              }}
            >
              {isPlaying ? "Stop Metronome" : "Start Metronome"}
            </button>

            <button
              onClick={() => setIsDroneOn(!isDroneOn)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #cfd8dc",
                background: isDroneOn ? "#b2ff59" : "white",
                cursor: "pointer",
              }}
            >
              {isDroneOn ? "Stop Drone" : "Start Drone"}
            </button>
          </div>

          <div style={{ marginTop: 10 }}>
            <label style={{ fontSize: 13 }}>Drone frequency (Hz)</label>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <input
                type="number"
                min="50"
                max="2000"
                step="0.1"
                value={droneFreq}
                onChange={(e) => setDroneFreq(Number(e.target.value))}
                style={{
                  width: 120,
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #e0e0e0",
                }}
              />
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: isDroneOn ? "#00e676" : "#cfd8dc",
                  boxShadow: isDroneOn
                    ? "0 0 12px rgba(0,230,118,0.45)"
                    : "none",
                }}
              />
              {isDroneOn && (
                <div style={{ color: "#455a64", fontSize: 13 }}>
                  {droneFreq.toFixed(1)} Hz
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isPlaying && (
        <div
          style={{
            marginTop: 28,
            display: "flex",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {[...Array(beatsPerMeasure)].map((_, i) => {
            const active = i + 1 === currentBeat
            const accent = i + 1 === accentBeat
            return (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: active
                    ? accent
                      ? "#ff5252"
                      : "#3949ab"
                    : "#eceff1",
                  transition: "transform 0.08s, background 0.08s",
                  transform: active ? "scale(1.25)" : "none",
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
