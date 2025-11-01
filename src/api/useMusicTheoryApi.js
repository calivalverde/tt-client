import { useQuery } from '@tanstack/react-query';
import {
  getScaleQualities,
  getScaleQualityKeys,
  getScaleNotes,
  generateScale,
  getTonality,
  getDiatonicChords,
  getScaleForTonality,
} from './musicTheoryService';

/**
 * React Query hook for fetching all scale qualities (full object with labels and options)
 */
export const useScaleQualities = () => {
  return useQuery({
    queryKey: ['scaleQualities'],
    queryFn: getScaleQualities,
    staleTime: Infinity, // Scale qualities rarely change
  });
};

/**
 * React Query hook for fetching scale quality keys
 */
export const useScaleQualityKeys = () => {
  return useQuery({
    queryKey: ['scaleQualityKeys'],
    queryFn: getScaleQualityKeys,
    staleTime: Infinity,
  });
};

/**
 * React Query hook for fetching valid notes for a scale quality
 * @param {string} scaleQuality - The scale quality
 */
export const useScaleNotes = (scaleQuality) => {
  return useQuery({
    queryKey: ['scaleNotes', scaleQuality],
    queryFn: () => getScaleNotes(scaleQuality),
    enabled: !!scaleQuality, // Only run if scaleQuality is provided
    staleTime: Infinity, // Valid notes for a quality rarely change
  });
};

/**
 * React Query hook for generating a scale
 * @param {Object} params - Scale parameters
 * @param {string} params.note - The root note
 * @param {string} params.quality - The scale quality
 */
export const useGenerateScale = ({ note, quality }) => {
  return useQuery({
    queryKey: ['scale', note, quality],
    queryFn: () => generateScale({ note, quality }),
    enabled: !!(note && quality), // Only run if both note and quality are provided
  });
};

/**
 * React Query hook for fetching tonality information
 * @param {string} tonalityStr - Tonality notation (e.g., "C", "Em", "F♯m")
 */
export const useTonality = (tonalityStr) => {
  return useQuery({
    queryKey: ['tonality', tonalityStr],
    queryFn: () => getTonality(tonalityStr),
    enabled: !!tonalityStr, // Only run if tonalityStr is provided
  });
};

/**
 * React Query hook for fetching diatonic chords for a tonality
 * @param {string} tonalityStr - Tonality notation
 */
export const useDiatonicChords = (tonalityStr) => {
  return useQuery({
    queryKey: ['diatonicChords', tonalityStr],
    queryFn: () => getDiatonicChords(tonalityStr),
    enabled: !!tonalityStr,
  });
};

/**
 * React Query hook for fetching scale notes for a tonality
 * @param {string} tonalityStr - Tonality notation
 */
export const useScaleForTonality = (tonalityStr) => {
  return useQuery({
    queryKey: ['scaleForTonality', tonalityStr],
    queryFn: () => getScaleForTonality(tonalityStr),
    enabled: !!tonalityStr,
  });
};
