
import React, { useState, useEffect, useCallback } from 'react';
import MidiInput from '../components/MidiInput';
import PianoKeyboard from '../components/PianoKeyboard';
import ChordDisplay from '../components/ChordDisplay';
import { getChord } from '../utils/chordDetector';

const ChordFinder = () => {
  const [activeMidiNotes, setActiveMidiNotes] = useState([]);
  const [chord, setChord] = useState(null);
  const [midiDevice, setMidiDevice] = useState(null);

  const handleNotesChange = useCallback((notes) => {
    setActiveMidiNotes(notes.sort((a, b) => a - b));
  }, []);

  useEffect(() => {
    if (activeMidiNotes.length > 0) {
      const detectedChord = getChord(activeMidiNotes);
      setChord(detectedChord);
    } else {
      setChord(null);
    }
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

  return (
    <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bungee mb-2 text-green-400">Chord Finder</h1>
        <p className="mb-4 text-gray-300">Play notes on your MIDI keyboard or the piano below to identify chords.</p>
        
        <MidiInput onNotesChange={handleNotesChange} onDeviceChange={setMidiDevice} />

        <div className="w-full max-w-4xl p-6 bg-slate-700 rounded-lg shadow-lg mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Analysis</h2>
                <div className="text-sm font-mono p-2 rounded bg-slate-800 text-green-400">
                    {midiDevice ? `Connected: ${midiDevice}` : 'No MIDI device detected'}
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
