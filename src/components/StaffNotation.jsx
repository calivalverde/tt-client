import React, { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } from 'vexflow';

/**
 * StaffNotation Component
 * Renders musical notes on a staff using VexFlow
 *
 * @param {Object} props
 * @param {string[]} props.notes - Array of note names (e.g., ["G", "A", "B", "C", "D", "E", "F♯", "G"])
 * @param {number} props.width - Width of the staff (default: 700)
 * @param {number} props.height - Height of the staff (default: 200)
 */
const StaffNotation = ({ notes = [], width = 700, height = 200 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!notes || notes.length === 0 || !containerRef.current) {
      console.log('StaffNotation: No notes or container', { notes, hasContainer: !!containerRef.current });
      return;
    }

    console.log('StaffNotation: Rendering notes', notes);

    // Clear previous rendering
    containerRef.current.innerHTML = '';

    try {
      // Create an SVG renderer and attach it to the container
      const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
      renderer.resize(width, height);
      const context = renderer.getContext();

      // Create a stave
      const stave = new Stave(10, 40, width - 20);
      stave.addClef('treble');
      stave.setContext(context).draw();

      // Convert note names to VexFlow format
      const vexflowNotes = convertNotesToVexFlowNotes(notes);
      console.log('VexFlow notes created:', vexflowNotes.length);

      if (vexflowNotes.length === 0) {
        console.error('No VexFlow notes were created');
        return;
      }

      // Create voice and add notes
      const voice = new Voice({
        num_beats: vexflowNotes.length,
        beat_value: 4
      });
      voice.setMode(Voice.Mode.SOFT); // SOFT mode - doesn't enforce strict beat counts
      voice.addTickables(vexflowNotes);

      // Format and draw
      const formatter = new Formatter();
      formatter.joinVoices([voice]).format([voice], width - 80);
      voice.draw(context, stave);

      console.log('StaffNotation: Rendering complete');
    } catch (error) {
      console.error('Error rendering staff notation:', error);
      console.error('Error stack:', error.stack);
    }
  }, [notes, width, height]);

  return (
    <div
      ref={containerRef}
      className="staff-notation-container bg-white rounded-lg p-4 overflow-x-auto border border-gray-200"
      style={{ minHeight: height }}
    />
  );
};

/**
 * Convert note names to VexFlow StaveNote objects
 * @param {string[]} noteNames - Array of note names like ["G", "A", "B", "C", "D", "E", "F♯", "G"]
 * @returns {StaveNote[]} - Array of VexFlow StaveNote objects
 */
function convertNotesToVexFlowNotes(noteNames) {
  const notes = [];
  let currentOctave = 4; // Start at octave 4

  // Note letter order for detecting octave changes
  const noteOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  for (let i = 0; i < noteNames.length; i++) {
    const noteName = noteNames[i];
    const { letter, accidental } = parseNoteName(noteName);

    // Detect octave change (when we go from B to C or similar)
    if (i > 0) {
      const prevNote = parseNoteName(noteNames[i - 1]);
      const prevIndex = noteOrder.indexOf(prevNote.letter);
      const currentIndex = noteOrder.indexOf(letter);

      // If we're going backwards in the note order significantly, we've crossed an octave
      if (currentIndex < prevIndex && (prevIndex - currentIndex) > 2) {
        currentOctave++;
      }
      // Special case: going from B to C
      else if (prevNote.letter === 'B' && letter === 'C') {
        currentOctave++;
      }
    }

    // Create the VexFlow note key (e.g., "f/4" for F natural)
    const vexflowKey = `${letter.toLowerCase()}/${currentOctave}`;

    console.log(`Note ${i}: ${noteName} -> ${vexflowKey}, accidental: ${accidental}`);

    // Create StaveNote
    const staveNote = new StaveNote({
      keys: [vexflowKey],
      duration: 'q' // Quarter note
    });

    // Add accidental if present
    if (accidental !== 'none') {
      const accidentalSymbol = accidental === '#' ? '#' : accidental === 'b' ? 'b' : 'n';
      staveNote.addModifier(new Accidental(accidentalSymbol), 0);
      console.log(`Added accidental ${accidentalSymbol} to note`);
    }

    notes.push(staveNote);
  }

  return notes;
}

/**
 * Parse a note name into letter and accidental
 * @param {string} noteName - Note name like "F♯" or "Bb" or "C"
 * @returns {{letter: string, accidental: string}} - Object with letter and accidental
 */
function parseNoteName(noteName) {
  if (!noteName) return { letter: 'C', accidental: 'none' };

  // Handle different accidental symbols
  const sharpSymbols = ['♯', '#', '＃'];
  const flatSymbols = ['♭', 'b'];
  const naturalSymbols = ['♮', 'n'];

  let letter = noteName[0].toUpperCase();
  let accidental = 'none';

  if (noteName.length > 1) {
    const accidentalChar = noteName.slice(1);

    if (sharpSymbols.some(sym => accidentalChar.includes(sym))) {
      accidental = '#';
    } else if (flatSymbols.some(sym => accidentalChar.includes(sym))) {
      accidental = 'b';
    } else if (naturalSymbols.some(sym => accidentalChar.includes(sym))) {
      accidental = 'n';
    }
  }

  return { letter, accidental };
}

export default StaffNotation;
