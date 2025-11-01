import React, { useState, useEffect } from 'react';
import { useScaleQualityKeys, useScaleNotes, useGenerateScale } from '../api/useMusicTheoryApi';
import StaffNotation from '../components/StaffNotation';

const Scales = () => {
  const [selectedQuality, setSelectedQuality] = useState('major');
  const [selectedNote, setSelectedNote] = useState('');

  // Fetch scale quality keys
  const {
    data: scaleQualities = [],
    isError: qualitiesError,
    error: qualitiesErrorData
  } = useScaleQualityKeys();

  // Fetch available notes for selected quality
  const {
    data: availableNotes = [],
    isError: notesError,
    error: notesErrorData
  } = useScaleNotes(selectedQuality);

  // Generate scale based on selected note and quality
  const {
    data: scaleData,
    isLoading: scaleLoading,
    isError: scaleError,
    error: scaleErrorData
  } = useGenerateScale({ note: selectedNote, quality: selectedQuality });

  // Set default quality when qualities load
  useEffect(() => {
    if (scaleQualities.length > 0 && !selectedQuality) {
      setSelectedQuality(scaleQualities[0]);
    }
  }, [scaleQualities, selectedQuality]);

  // Set default note when available notes load
  useEffect(() => {
    if (availableNotes.length > 0 && !selectedNote) {
      setSelectedNote(availableNotes[0]);
    }
  }, [availableNotes, selectedNote]);

  // Determine error message
  const getErrorMessage = () => {
    if (qualitiesError) {
      return 'Failed to load scale qualities. Make sure the API is running at http://localhost:8088';
    }
    if (notesError) {
      return 'Failed to load notes for this scale quality';
    }
    if (scaleError) {
      return 'Failed to generate scale';
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Scales Explorer
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Visualize and explore musical scales in any key
        </p>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scale Quality Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scale Quality
              </label>
              <select
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                {scaleQualities.length === 0 && (
                  <option value="">Loading...</option>
                )}
                {scaleQualities.map((quality) => (
                  <option key={quality} value={quality}>
                    {quality.charAt(0).toUpperCase() + quality.slice(1).replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Root Note Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Root Note
              </label>
              <select
                value={selectedNote}
                onChange={(e) => setSelectedNote(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                disabled={availableNotes.length === 0}
              >
                {availableNotes.length === 0 && (
                  <option value="">Loading...</option>
                )}
                {availableNotes.map((note) => (
                  <option key={note} value={note}>
                    {note}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Scale Display */}
        {scaleLoading && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading scale...</p>
          </div>
        )}

        {!scaleLoading && scaleData && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {selectedNote} {selectedQuality.charAt(0).toUpperCase() + selectedQuality.slice(1).replace('_', ' ')} Scale
            </h2>

            {/* Musical Staff Display */}
            {(scaleData.notes || Array.isArray(scaleData)) && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Musical Notation</h3>
                <StaffNotation notes={Array.isArray(scaleData) ? scaleData : scaleData.notes} />
              </div>
            )}

            {/* Scale Notes - Circular Display */}
            {(scaleData.notes || Array.isArray(scaleData)) && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Notes</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {(Array.isArray(scaleData) ? scaleData : scaleData.notes).map((note, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                        {note}
                      </div>
                      <span className="text-xs text-gray-500 mt-2">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scale Intervals */}
            {scaleData.intervals && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Intervals</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {scaleData.intervals.map((interval, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {interval}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            {scaleData.description && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700 text-center">{scaleData.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scales;
