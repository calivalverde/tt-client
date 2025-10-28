import React from "react"
import { MIN_BPM, MAX_BPM, TEMPO_RANGES, getTempoName } from "../constants"

export function TempoDial({ bpm, setBpm }) {
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
        stroke={i % 6 === 0 ? "hsl(142 69% 58%)" : "#475569"}
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

    TEMPO_RANGES.forEach((r, idx) => {
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
          fill="hsl(142 69% 58%)"
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
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="2"
        />
        <g>{tickElements}</g>
        <g>{labelElements}</g>
        <line
          x1={center}
          y1={center}
          x2={nx}
          y2={ny}
          stroke="hsl(142 69% 58%)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px hsl(142 69% 58%))" }}
        />
        <circle
          cx={center}
          cy={center}
          r={60}
          fill="#334155"
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
            background: "linear-gradient(145deg, #1e293b, #334155)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "hsl(142 69% 58%)",
            textAlign: "center",
            boxShadow:
              "inset 0 -6px 12px hsl(142 69% 58% / 0.25), 0 4px 12px rgba(0,0,0,0.6)",
            pointerEvents: "auto",
            fontWeight: 700,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontSize: 38, lineHeight: 1 }}>{bpm}</div>
          <div style={{ fontSize: 14, color: "hsl(142 69% 58% / 0.7)" }}>
            {getTempoName(bpm)}
          </div>
        </div>
      </div>
    </div>
  )
}
