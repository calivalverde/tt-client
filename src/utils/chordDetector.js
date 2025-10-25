
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const CHORD_INTERVALS = {
  'Major': [0, 4, 7],
  'Minor': [0, 3, 7],
  'Diminished': [0, 3, 6],
  'Augmented': [0, 4, 8],
  'Major 7th': [0, 4, 7, 11],
  'Minor 7th': [0, 3, 7, 10],
  'Dominant 7th': [0, 4, 7, 10],
  'Diminished 7th': [0, 3, 6, 9],
  'Half-Diminished 7th': [0, 3, 6, 10],
  'Sus2': [0, 2, 7],
  'Sus4': [0, 5, 7],
};

export const midiToNoteName = (midi) => {
  // We only care about the pitch class, not the octave
  return NOTE_NAMES[midi % 12];
};

const getChordQualityAndInversion = (pitchClasses) => {
    // Try each note as the root
    for (let i = 0; i < pitchClasses.length; i++) {
        const root = pitchClasses[i];
        const intervals = pitchClasses.map(p => (p - root + 12) % 12).sort((a, b) => a - b);
        
        for (const [quality, chordIntervals] of Object.entries(CHORD_INTERVALS)) {
            if (chordIntervals.length === intervals.length && chordIntervals.every((val, index) => val === intervals[index])) {
                return {
                    root: NOTE_NAMES[root],
                    quality,
                    inversion: getInversionName(i, pitchClasses.length)
                };
            }
        }
    }
    return null;
}

const getInversionName = (rootIndex, numNotes) => {
    if (numNotes < 3) return 'N/A';
    switch (rootIndex) {
        case 0: return 'Root Position';
        case 1: return '1st Inversion';
        case 2: return '2nd Inversion';
        case 3: return '3rd Inversion';
        default: return 'Unknown Inversion';
    }
}


export const getChord = (midiNotes) => {
  if (midiNotes.length < 2) {
    return null;
  }
  
  // Get unique pitch classes (0-11)
  const pitchClasses = [...new Set(midiNotes.map(note => note % 12))].sort((a,b) => a-b);

  if (pitchClasses.length < 2) {
    return null;
  }
  
  const result = getChordQualityAndInversion(pitchClasses);

  if (result) {
    return {
        ...result,
        name: `${result.root} ${result.quality}`
    };
  }

  // Fallback if no specific chord is found
  return {
    root: midiToNoteName(midiNotes[0]),
    name: 'Unknown Chord',
    quality: 'Unknown',
    inversion: 'N/A'
  };
};
