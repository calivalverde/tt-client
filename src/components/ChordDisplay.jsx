
import React from 'react';
import { midiToNoteName } from '../utils/chordDetector';

const ChordDisplay = ({ chord, activeNotes }) => {
  if (!chord) {
    return (
      <div className="h-32 flex items-center justify-center bg-slate-800 rounded-lg">
        <p className="text-gray-400 font-mono text-lg">
          {activeNotes.length > 0 ? 'Detecting...' : 'Play some notes to begin'}
        </p>
      </div>
    );
  }

  const { root, name, inversion, quality } = chord;

  return (
    <div className="text-center p-4 bg-slate-800 rounded-lg">
        <div className="mb-4">
            <span className="font-mono text-gray-400">Notes Played: </span>
            <span className="font-mono text-lg text-green-400">{activeNotes.map(midiToNoteName).join(' - ')}</span>
        </div>
      <div className="font-bungee text-6xl text-green-400 mb-2">{name}</div>
      <div className="flex justify-center space-x-6 text-lg font-mono">
        <div>
          <span className="text-gray-400">Root: </span>
          <span className="font-bold text-white">{root}</span>
        </div>
        <div>
          <span className="text-gray-400">Quality: </span>
          <span className="font-bold text-white">{quality}</span>
        </div>
        <div>
          <span className="text-gray-400">Inversion: </span>
          <span className="font-bold text-white">{inversion}</span>
        </div>
      </div>
    </div>
  );
};

export default ChordDisplay;
