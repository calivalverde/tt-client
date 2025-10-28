export const MIN_BPM = 40
export const MAX_BPM = 208

export const DRONE_NOTES = [
  { note: "A", freq: 220 },
  { note: "A#", freq: 233 },
  { note: "B", freq: 247 },
  { note: "C", freq: 262 },
  { note: "C#", freq: 277 },
  { note: "D", freq: 294 },
  { note: "D#", freq: 311 },
  { note: "E", freq: 330 },
  { note: "F", freq: 349 },
  { note: "F#", freq: 370 },
  { note: "G", freq: 392 },
  { note: "G#", freq: 415 },
]

export const TEMPO_RANGES = [
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

export const getTempoName = (bpmVal) => {
  const found = TEMPO_RANGES.find((r) => bpmVal >= r.min && bpmVal <= r.max)
  return found ? found.name : "Custom"
}
