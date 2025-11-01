
import React, { useState, useEffect, useCallback } from 'react';
import MidiInput from '../components/MidiInput';
import PianoKeyboard from '../components/PianoKeyboard';
import ChordDisplay from '../components/ChordDisplay';
import { getChord } from '../utils/chordDetector';
import { identifyChordFromMidi } from '../api/musicTheoryService';

const ChordFinder = () => {
  const [activeMidiNotes, setActiveMidiNotes] = useState([]);
  const [chord, setChord] = useState(null);
  const [midiDevice, setMidiDevice] = useState(null);
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleNotesChange = useCallback((notes) => {
    setActiveMidiNotes(notes.sort((a, b) => a - b));
  }, []);

  useEffect(() => {
    const identifyChord = async () => {
      // Only identify chord if we have at least 3 notes
      if (activeMidiNotes.length >= 3) {
        setIsLoadingAPI(true);
        setApiError(null);

        try {
          // Try API first
          const apiChord = await identifyChordFromMidi(activeMidiNotes);

          // Transform API response to match local format
          setChord({
            root: apiChord.root_note,
            name: apiChord.chord_name,
            quality: apiChord.description,
            chord_symbol: apiChord.chord_symbol,
            notes: apiChord.notes,
            source: 'api'
          });
        } catch (error) {
          console.error('API chord identification failed, using local detector:', error);
          setApiError('API unavailable, using local detection');

          // Fallback to local detection
          const detectedChord = getChord(activeMidiNotes);
          setChord(detectedChord ? { ...detectedChord, source: 'local' } : null);
        } finally {
          setIsLoadingAPI(false);
        }
      } else {
        setChord(null);
        setApiError(null);
      }
    };

    identifyChord();
  }, [activeMidiNotes]);

  const handleKeyClick = (midiNote) => {
    setActiveMidiNotes(prevNotes => {
        const isNoteActive = prevNotes.includes(midiNote);
        if (isNoteActive) {
            return prevNotes.filter(n => n !== midiNote);
        } else {
            return [...prevNotes, midiNote].sort((a,b) => a-b);
        }
    });
  };

  const handleReset = () => {
    setActiveMidiNotes([]);
    setChord(null);
    setApiError(null);
  };

  return (
    <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bungee mb-2 text-green-400">Chord Finder</h1>
        <p className="mb-2 text-gray-300">Play notes on your MIDI keyboard or the piano below to identify chords.</p>
        <p className="mb-4 text-sm text-gray-400">
          {activeMidiNotes.length < 3
            ? `Select at least 3 notes (${activeMidiNotes.length}/3)`
            : `${activeMidiNotes.length} notes selected`}
        </p>

        <MidiInput onNotesChange={handleNotesChange} onDeviceChange={setMidiDevice} />

        <div className="w-full max-w-4xl p-6 bg-slate-700 rounded-lg shadow-lg mb-8">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold">Analysis</h2>
                    <button
                        onClick={handleReset}
                        disabled={activeMidiNotes.length === 0}
                        className={`px-4 py-2 rounded font-semibold transition-colors ${
                            activeMidiNotes.length === 0
                                ? 'bg-slate-600 text-gray-400 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                    >
                        Reset
                    </button>
                </div>
                <div className="flex gap-2">
                    <div className="text-sm font-mono p-2 rounded bg-slate-800 text-green-400">
                        {midiDevice ? `Connected: ${midiDevice}` : 'No MIDI device detected'}
                    </div>
                    <div className={`text-sm font-mono p-2 rounded ${
                        isLoadingAPI ? 'bg-yellow-900 text-yellow-300' :
                        apiError ? 'bg-orange-900 text-orange-300' :
                        chord?.source === 'api' ? 'bg-green-900 text-green-300' : 'bg-slate-800 text-gray-400'
                    }`}>
                        {isLoadingAPI ? 'API loading...' :
                         apiError ? 'Local mode' :
                         chord?.source === 'api' ? 'API mode' : 'Ready'}
                    </div>
                </div>
            </div>
            <ChordDisplay chord={chord} activeNotes={activeMidiNotes} />
        </div>
        
        <div className="w-full max-w-5xl">
            <PianoKeyboard 
                activeNotes={activeMidiNotes}
                onKeyClick={handleKeyClick}
                startNote={48} // C3
                endNote={72}   // C5
            />
        </div>
    </div>
  );
};

export default ChordFinder;
