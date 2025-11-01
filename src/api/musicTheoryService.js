import axiosInstance from './axios';

/**
 * Music Theory API Service
 * Provides methods to interact with the backend Music Theory API
 */

// ==================== DEFINITION ENDPOINTS ====================

/**
 * Get all available scale qualities with labels and note options
 * @returns {Promise<Object>} Scale qualities information
 * @example { "major": { "label": "Major Scales", "options": ["C", "G", ...] }, ... }
 */
export const getScaleQualities = async () => {
  const response = await axiosInstance.get('/scales/qualities');
  return response.data;
};

/**
 * Get array of scale quality keys
 * @returns {Promise<string[]>} Array of scale quality keys (e.g., ["major", "minor", ...])
 */
export const getScaleQualityKeys = async () => {
  const qualities = await getScaleQualities();
  return Object.keys(qualities);
};

/**
 * Get valid root notes for a specific scale quality
 * @param {string} scaleQuality - The scale quality (e.g., "major", "minor")
 * @returns {Promise<string[]>} Array of valid note strings
 */
export const getScaleNotes = async (scaleQuality) => {
  const qualities = await getScaleQualities();
  return qualities[scaleQuality]?.options || [];
};

// ==================== SCALE ENDPOINTS ====================

/**
 * Generate a musical scale
 * @param {Object} params - Scale parameters
 * @param {string} params.note - The root note (e.g., "C", "F♯", "B♭")
 * @param {string} [params.quality='major'] - The scale quality
 * @returns {Promise<Object>} Scale information including notes
 */
export const generateScale = async ({ note, quality = 'major' }) => {
  const response = await axiosInstance.get('/scales/', {
    params: { note, quality }
  });
  return response.data;
};

// ==================== TONALITY ENDPOINTS ====================

/**
 * Get comprehensive tonality information
 * @param {string} tonalityStr - Tonality notation (e.g., "C", "Em", "F♯m", "B♭")
 * @returns {Promise<Object>} Tonality object with description, scale, and diatonic_chords
 * @returns {string} return.description - Tonality description
 * @returns {string[]} return.scale - Notes in the scale
 * @returns {Object[]} return.diatonic_chords - Diatonic chords
 * @returns {string} return.diatonic_chords[].description - Chord type description
 * @returns {string} return.diatonic_chords[].chord_symbol - Chord symbol notation
 * @returns {string[]} return.diatonic_chords[].notes - Notes in the chord
 */
export const getTonality = async (tonalityStr) => {
  const response = await axiosInstance.get(`/tonality/${tonalityStr}`);
  return response.data;
};

// ==================== CHORD ENDPOINTS ====================

/**
 * Identify a chord from a list of note names
 * @param {string[]} notes - Array of note names (e.g., ["C", "E", "G"])
 * @returns {Promise<Object>} Chord identification
 * @returns {string} return.root_note - Root note of the chord
 * @returns {string} return.chord_name - Full chord name (e.g., 'Cmaj7', 'Em')
 * @returns {string} return.description - Chord type description
 * @returns {string} return.chord_symbol - Chord symbol notation
 * @returns {string[]} return.notes - Notes in the chord
 */
export const identifyChord = async (notes) => {
  const notesString = notes.join(',');
  const response = await axiosInstance.get('/chords/identify', {
    params: { notes: notesString }
  });
  return response.data;
};

// ==================== INTERVAL ENDPOINTS ====================

/**
 * Identify the interval between two notes
 * @param {string} note1 - First note (e.g., "C", "F♯", "B♭")
 * @param {string} note2 - Second note (e.g., "E", "A", "D")
 * @returns {Promise<Object>} Interval identification
 * @returns {string} return.interval_name - Name of the interval
 * @returns {number} return.semitones - Number of semitones
 * @returns {string} return.note1 - First note
 * @returns {string} return.note2 - Second note
 * @returns {string[]} return.aliases - Common aliases for the interval
 */
export const identifyInterval = async (note1, note2) => {
  const response = await axiosInstance.get('/intervals/identify', {
    params: { note1, note2 }
  });
  return response.data;
};

/**
 * Generate two notes from a root note and an interval
 * @param {string} note - Root note (e.g., "C", "F♯", "B♭")
 * @param {string} interval - Interval name or alias (e.g., "major3", "M3", "perfect5", "P5") or semitones (0-12)
 * @returns {Promise<Object>} Generated notes
 * @returns {string} return.note1 - Root note
 * @returns {string} return.note2 - Second note
 * @returns {string} return.interval_name - Name of the interval
 * @returns {number} return.semitones - Number of semitones
 * @returns {string[]} return.aliases - Common aliases for the interval
 */
export const generateInterval = async (note, interval) => {
  const response = await axiosInstance.get('/intervals/generate', {
    params: { note, interval }
  });
  return response.data;
};

/**
 * Get a random interval
 * @returns {Promise<Object>} Random interval
 * @returns {string} return.interval_name - Name of the interval
 * @returns {number} return.semitones - Number of semitones
 * @returns {string[]} return.aliases - Common aliases for the interval
 */
export const getRandomInterval = async () => {
  const response = await axiosInstance.get('/intervals/random');
  return response.data;
};

// ==================== CONVENIENCE METHODS ====================

/**
 * Get diatonic chords for a tonality
 * @param {string} tonalityStr - Tonality notation
 * @returns {Promise<Object[]>} Array of chord objects
 */
export const getDiatonicChords = async (tonalityStr) => {
  const tonality = await getTonality(tonalityStr);
  return tonality.diatonic_chords || [];
};

/**
 * Get scale notes for a tonality
 * @param {string} tonalityStr - Tonality notation
 * @returns {Promise<string[]>} Array of note strings
 */
export const getScaleForTonality = async (tonalityStr) => {
  const tonality = await getTonality(tonalityStr);
  return tonality.scale || [];
};

/**
 * Convert MIDI note numbers to note names
 * @param {number[]} midiNotes - Array of MIDI note numbers (0-127)
 * @returns {string[]} Array of unique note names
 */
export const midiNotesToNames = (midiNotes) => {
  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  // Get unique pitch classes
  const uniquePitchClasses = [...new Set(midiNotes.map(note => note % 12))];
  return uniquePitchClasses.map(pc => NOTE_NAMES[pc]);
};

/**
 * Identify a chord from MIDI note numbers
 * @param {number[]} midiNotes - Array of MIDI note numbers
 * @returns {Promise<Object>} Chord identification from API
 */
export const identifyChordFromMidi = async (midiNotes) => {
  const noteNames = midiNotesToNames(midiNotes);
  return identifyChord(noteNames);
};

// ==================== AUDIO ENDPOINTS ====================

/**
 * Get audio file metadata and URLs by ID
 * @param {string} audioId - Audio file ID (e.g., "C_MAJOR", "FSHARP_NATURAL_MINOR")
 * @param {string} type - Resource type (e.g., "scale")
 * @returns {Promise<Object>} Audio resource with MP3/WebM URLs, duration, BPM
 * @returns {string} return.id - Unique identifier
 * @returns {string} return.name - Human-readable name
 * @returns {string} return.type - Resource type
 * @returns {string} return.root_note - Root note
 * @returns {string[]} return.notes - Notes in the scale
 * @returns {Object} return.files - Audio file URLs
 * @returns {string} return.files.mp3 - MP3 file URL
 * @returns {string} return.files.webm - WebM file URL
 * @returns {number} return.duration_ms - Duration in milliseconds
 * @returns {number} return.bpm - Beats per minute
 */
export const getAudioFile = async (audioId, type = 'scale') => {
  const response = await axiosInstance.get(`/audio/files/${audioId}`, {
    params: { type }
  });
  return response.data;
};
