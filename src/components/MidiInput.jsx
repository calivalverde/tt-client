
import React, { useEffect, useRef } from 'react';

const MidiInput = ({ onNotesChange, onDeviceChange }) => {
  const activeNotes = useRef(new Set());

  const handleMidiMessage = (message) => {
    const [command, note, velocity] = message.data;
    // 144 = note on, 128 = note off
    if (command === 144 && velocity > 0) {
      activeNotes.current.add(note);
    } else if (command === 128 || (command === 144 && velocity === 0)) {
      activeNotes.current.delete(note);
    }
    
    onNotesChange(Array.from(activeNotes.current));
  };

  const setupMidi = (midiAccess) => {
    const inputs = midiAccess.inputs.values();
    let firstInput = null;
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      if (!firstInput) firstInput = input.value;
      console.log(`Found MIDI input: ${input.value.name}`);
      input.value.onmidimessage = handleMidiMessage;
    }

    if (firstInput) {
        onDeviceChange(firstInput.name);
    } else {
        onDeviceChange(null);
    }

    midiAccess.onstatechange = (event) => {
      console.log('MIDI state changed:', event.port.name, event.port.state);
      // Re-run setup to capture new devices
      setupMidi(midiAccess);
    };
  };

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess()
        .then(setupMidi, () => {
          console.error('Could not access your MIDI devices.');
          onDeviceChange(null);
        });
    } else {
      console.warn('Web MIDI API is not supported in this browser.');
      onDeviceChange(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component does not render anything
};

export default MidiInput;
