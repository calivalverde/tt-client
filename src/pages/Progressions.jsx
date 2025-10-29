import React, { useState } from 'react';
import { useTonality } from '../api/useMusicTheoryApi';

const Progressions = () => {
  const [tonalityInput, setTonalityInput] = useState('C');
  const [submittedTonality, setSubmittedTonality] = useState('');
  const [selectedChords, setSelectedChords] = useState([]);

  // Fetch tonality data using React Query
  const {
    data: tonalityData,
    isLoading,
    isError,
    error
  } = useTonality(submittedTonality);

  const handleLoadTonality = (e) => {
    e.preventDefault();
    if (!tonalityInput.trim()) return;

    setSubmittedTonality(tonalityInput.trim());
    setSelectedChords([]);
  };

  const toggleChordSelection = (index) => {
    setSelectedChords((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index].sort((a, b) => a - b);
      }
    });
  };

  const clearSelection = () => {
    setSelectedChords([]);
  };

  const getChordProgression = () => {
    if (!tonalityData || selectedChords.length === 0) return '';
    return selectedChords
      .map((index) => tonalityData.diatonic_chords[index].chord_symbol)
      .join(' - ');
  };

  const errorMessage = isError
    ? 'Failed to load tonality. Make sure the API is running and the tonality format is correct (e.g., "C", "Em", "F♯m", "B♭")'
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Chord Progressions
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Explore diatonic chords and build progressions in any key
        </p>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Tonality Input */}
        <form onSubmit={handleLoadTonality} className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Tonality
              </label>
              <input
                type="text"
                value={tonalityInput}
                onChange={(e) => setTonalityInput(e.target.value)}
                placeholder='e.g., "C", "Em", "F♯m", "B♭"'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">
                Examples: C (major), Em (E minor), F♯m (F sharp minor), B♭ (B flat major)
              </p>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
              >
                {isLoading ? 'Loading...' : 'Load'}
              </button>
            </div>
          </div>
        </form>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading tonality...</p>
          </div>
        )}

        {/* Tonality Data Display */}
        {!isLoading && tonalityData && (
          <div className="space-y-6">
            {/* Description */}
            {tonalityData.description && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {tonalityData.description}
                </h2>
              </div>
            )}

            {/* Scale Notes */}
            {tonalityData.scale && tonalityData.scale.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Scale Notes</h3>
                <div className="flex flex-wrap gap-3">
                  {tonalityData.scale.map((note, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                        {note}
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Diatonic Chords */}
            {tonalityData.diatonic_chords && tonalityData.diatonic_chords.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Diatonic Chords</h3>
                  {selectedChords.length > 0 && (
                    <button
                      onClick={clearSelection}
                      className="text-sm text-purple-600 hover:text-purple-800"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Click on chords to build a progression
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {tonalityData.diatonic_chords.map((chord, index) => (
                    <div
                      key={index}
                      onClick={() => toggleChordSelection(index)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedChords.includes(index)
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 bg-gray-50 hover:border-purple-400 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-gray-800">
                          {chord.chord_symbol}
                        </span>
                        {selectedChords.includes(index) && (
                          <span className="text-sm font-semibold text-purple-600 bg-purple-200 px-2 py-1 rounded">
                            {selectedChords.indexOf(index) + 1}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{chord.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {chord.notes.map((note, noteIndex) => (
                          <span
                            key={noteIndex}
                            className="text-xs px-2 py-1 bg-white text-gray-700 rounded border border-gray-200"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Progression Display */}
            {selectedChords.length > 0 && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-xl font-semibold mb-3">Your Progression</h3>
                <div className="text-3xl font-bold text-center py-4">
                  {getChordProgression()}
                </div>
                <p className="text-sm text-purple-100 text-center mt-2">
                  Selected {selectedChords.length} chord{selectedChords.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !tonalityData && !isError && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Enter a tonality to get started
            </h3>
            <p className="text-gray-600">
              Try entering "C" for C major or "Em" for E minor
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progressions;
