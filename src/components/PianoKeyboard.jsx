
import React from 'react';

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const PianoKey = ({ midiNote, isBlack, isActive, onKeyClick }) => {
  const noteName = noteNames[midiNote % 12];
  
  const baseWhiteClass = "h-40 w-10 border-2 border-slate-900 bg-white relative hover:bg-gray-200 transition-colors";
  const activeWhiteClass = "bg-green-400";
  
  const baseBlackClass = "h-24 w-6 bg-slate-900 absolute -mx-3 z-10 border-2 border-slate-900 hover:bg-gray-700 transition-colors";
  const activeBlackClass = "bg-green-600 border-green-400";

  if (isBlack) {
    return (
      <button 
        onClick={() => onKeyClick(midiNote)} 
        className={`${baseBlackClass} ${isActive ? activeBlackClass : ''}`}
        aria-label={`Play ${noteName}`}
      />
    );
  }

  return (
    <button 
        onClick={() => onKeyClick(midiNote)} 
        className={`${baseWhiteClass} ${isActive ? activeWhiteClass : ''}`}
        aria-label={`Play ${noteName}`}
    >
       <div className="absolute bottom-2 left-0 right-0 text-center text-slate-900 font-bold">{noteName}</div>
    </button>
  );
};

const PianoKeyboard = ({ activeNotes, onKeyClick, startNote, endNote }) => {
  const keys = [];
  for (let i = startNote; i <= endNote; i++) {
    keys.push({
      midiNote: i,
      isBlack: [1, 3, 6, 8, 10].includes(i % 12),
      isActive: activeNotes.includes(i),
    });
  }

  return (
    <div className="flex justify-center bg-slate-900 p-4 rounded-lg shadow-inner">
      {keys.map((key, index) => {
        // Don't render a black key if the next key is also black (shouldn't happen in standard tuning)
        // or if it's the last key. This prevents layout issues from absolute positioning.
        if (key.isBlack && (index + 1 >= keys.length || keys[index + 1].isBlack)) {
          return null;
        }

        return (
          <div key={key.midiNote} className="flex">
            {!key.isBlack && <PianoKey {...key} onKeyClick={onKeyClick} />}
            {key.isBlack && <PianoKey {...key} onKeyClick={onKeyClick} />}
          </div>
        );
      })}
    </div>
  );
};

export default PianoKeyboard;
