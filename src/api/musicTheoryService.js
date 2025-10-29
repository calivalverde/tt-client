import axiosInstance from './axios';

/**
 * Music Theory API Service
 * Provides methods to interact with the backend Music Theory API
 */

// ==================== DEFINITION ENDPOINTS ====================

/**
 * Get all available scale qualities
 * @returns {Promise<string[]>} Array of scale quality strings
 */
export const getScaleQualities = async () => {
  const response = await axiosInstance.get('/def/scale_qualities');
  return response.data;
};

/**
 * Get valid root notes for a specific scale quality
 * @param {string} scaleQuality - The scale quality (e.g., "major", "minor")
 * @returns {Promise<string[]>} Array of valid note strings
 */
export const getScaleNotes = async (scaleQuality) => {
  const response = await axiosInstance.get(`/def/notes/${scaleQuality}`);
  return response.data;
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
