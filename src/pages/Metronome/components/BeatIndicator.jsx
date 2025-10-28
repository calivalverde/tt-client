import React from "react"

export function BeatIndicator({ beatsPerMeasure, currentBeat, accentBeat }) {
  return (
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
                  ? "hsl(142 69% 58%)"
                  : "hsl(142 50% 45%)"
                : "#475569",
              transition: "transform 0.08s, background 0.08s",
              transform: active ? "scale(1.25)" : "none",
              boxShadow:
                active && accent
                  ? "0 0 12px hsl(142 69% 58% / 0.6)"
                  : "none",
            }}
          />
        )
      })}
    </div>
  )
}
