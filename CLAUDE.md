# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **The Tritone**, a music theory educational web application built with React, Vite, and Tailwind CSS. The app provides interactive tools for learning music theory concepts including chord detection, scales, progressions, metronome, and circle of fifths.

## Development Setup

**Node Version**: v22.18.0 (specified in `.nvmrc`)

Use `nvm use` to switch to the correct Node version before development.

## Common Commands

```bash
# Install dependencies
npm install

# Start development server with HMR
npm run dev

# Build for production (outputs to dist/)
npm run build

# Run ESLint
npm run lint

# Preview production build locally
npm run preview
```

## Deployment

The app is configured for **Firebase Hosting**:
- Project ID: `thetritone-46d6c` (in `.firebaserc`)
- Build output directory: `dist/` (configured in `firebase.json`)
- SPA routing: All routes rewrite to `/index.html`

To deploy:
```bash
npm run build
firebase deploy
```

## Architecture

### Application Structure

```
src/
├── api/           # API client configuration (axios)
├── components/    # Reusable React components
├── pages/         # Route-level page components
├── utils/         # Utility functions (chord detection, MIDI processing)
├── App.jsx        # Main app component with routing
└── main.jsx       # React app entry point
```

### Key Architectural Patterns

**Routing**: Uses React Router v7 with client-side routing. All routes defined in `App.jsx`:
- `/` - Home
- `/scales` - Scales reference
- `/chords` - Chords reference
- `/circle-of-fifths` - Interactive circle of fifths
- `/progressions` - Chord progressions
- `/metronome` - Metronome tool
- `/chord-finder` - Interactive chord detection
- `/contact` - Contact page

**Layout**: Three-part flex layout with fixed header/footer and scrollable main content area (`App.jsx:19-34`)

**Styling**: Tailwind CSS v4 with Vite plugin. Global styles in `src/styles.css`.

### MIDI Integration

The application uses the Web MIDI API for real-time chord detection:

**MidiInput Component** (`src/components/MidiInput.jsx`):
- Headless component that handles MIDI device connection and message processing
- Listens for note on/off events (MIDI commands 144/128)
- Maintains active notes in a Set via useRef
- Provides callbacks: `onNotesChange(notes)` and `onDeviceChange(deviceName)`
- Automatically detects device connection/disconnection via `onstatechange`

**Chord Detection** (`src/utils/chordDetector.js`):
- `getChord(midiNotes)`: Analyzes active MIDI notes and returns chord information
- Supports major, minor, diminished, augmented, 7th chords, and suspended chords
- Detects inversions (root position, 1st, 2nd, 3rd)
- Algorithm: Tries each note as root, compares intervals against known chord patterns
- Returns `{ root, quality, name, inversion }` or null if no chord detected

### Component Architecture

**Reusable Components**:
- `Header.jsx` / `Footer.jsx`: Layout components
- `NavMenu.jsx`: Navigation menu
- `PianoKeyboard.jsx`: Visual piano keyboard display
- `ChordDisplay.jsx`: Displays detected chord information
- `MidiInput.jsx`: MIDI device interface (headless)
- `PlaceholderPage.jsx`: Placeholder for unimplemented pages

**Page Components**: Each route has a corresponding page component in `src/pages/`. Most pages are still placeholders except:
- `ChordFinder.jsx`: Full implementation with MIDI input and chord detection
- `Metronome.jsx`: Full metronome implementation (18KB file)
- `Home.jsx`: Landing page with feature overview
- `Contact.jsx`: Contact form implementation

### Build Configuration

**Vite** (`vite.config.js`):
- Uses `@vitejs/plugin-react` with Babel
- React Compiler enabled via `babel-plugin-react-compiler` for automatic optimization
- Tailwind CSS via `@tailwindcss/vite` plugin

**ESLint** (`eslint.config.js`):
- Flat config format
- React hooks rules enforced
- React Refresh rules for HMR
- Custom rule: Unused vars allowed if uppercase or underscore-prefixed

### Backend Integration

**API Client** (`src/api/axios.js`):
- Pre-configured axios instance with 10s timeout
- Placeholder backend URL needs to be updated for production
- Currently points to: `https://your-backend-api.com/api` (not configured)

## Working with MIDI Features

When adding or modifying MIDI functionality:
1. MIDI note numbers use modulo 12 to get pitch class (0=C, 1=C#, etc.)
2. Chord detection requires at least 2 unique pitch classes
3. The `chordDetector.js` utility is the source of truth for chord definitions
4. To add new chord types, update `CHORD_INTERVALS` object in `chordDetector.js`

## Development Notes

- React Compiler is enabled, which may impact dev/build performance but provides automatic memoization
- The app uses React 19.1.1 with React Router 7
- All pages use placeholder implementations except ChordFinder, Metronome, Home, and Contact
- Firebase hosting is configured but deployment requires Firebase CLI authentication
