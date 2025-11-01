
import React from 'react';
import { midiToNoteName } from '../utils/chordDetector';

const ChordDisplay = ({ chord, activeNotes }) => {
  if (!chord) {
    return (
      <div className="h-32 flex items-center justify-center bg-slate-800 rounded-lg">
        <p className="text-gray-400 font-mono text-lg">
          {activeNotes.length === 0 ? 'Play some notes to begin' :
           activeNotes.length < 3 ? `Select ${3 - activeNotes.length} more note${3 - activeNotes.length > 1 ? 's' : ''}` :
           'Detecting...'}
        </p>
      </div>
    );
  }

  const { root, name, inversion, quality, chord_symbol, notes, source } = chord;

  return (
    <div className="text-center p-4 bg-slate-800 rounded-lg">
        <div className="mb-4">
            <span className="font-mono text-gray-400">Notes Played: </span>
            <span className="font-mono text-lg text-green-400">{activeNotes.map(midiToNoteName).join(' - ')}</span>
        </div>
      <div className="font-bungee text-6xl text-green-400 mb-2">{name}</div>
      {chord_symbol && (
        <div className="text-2xl text-gray-300 mb-2 font-mono">{chord_symbol}</div>
      )}
      <div className="flex justify-center space-x-6 text-lg font-mono">
        <div>
          <span className="text-gray-400">Root: </span>
          <span className="font-bold text-white">{root}</span>
        </div>
        <div>
          <span className="text-gray-400">Quality: </span>
          <span className="font-bold text-white">{quality}</span>
        </div>
        {inversion && (
          <div>
            <span className="text-gray-400">Inversion: </span>
            <span className="font-bold text-white">{inversion}</span>
          </div>
        )}
      </div>
      {notes && notes.length > 0 && (
        <div className="mt-4 text-sm">
          <span className="font-mono text-gray-400">Chord Notes: </span>
          <span className="font-mono text-green-300">{notes.join(' - ')}</span>
        </div>
      )}
    </div>
  );
};

export default ChordDisplay;
