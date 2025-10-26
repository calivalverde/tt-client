# The Tritone

An interactive music theory educational web application designed to help musicians learn and explore music theory concepts.

## Features

- **Chord Finder** - Real-time chord detection using MIDI input devices
- **Interactive Piano Keyboard** - Visual piano keyboard display
- **Metronome** - Adjustable tempo metronome tool
- **Scales Reference** - Explore various musical scales
- **Chord Progressions** - Learn common chord progressions
- **Circle of Fifths** - Interactive circle of fifths visualization
- **Contact** - Get in touch with feedback or questions

## Tech Stack

- **React 19** - Modern React with latest features
- **React Router 7** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Web MIDI API** - Real-time MIDI device integration
- **Axios** - HTTP client for API requests
- **Firebase Hosting** - Deployment platform

## Getting Started

### Prerequisites

- Node.js v22.18.0 (use `nvm use` if you have nvm installed)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Development

```bash
# Run development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## MIDI Support

To use the chord detection feature:

1. Connect a MIDI keyboard or controller to your computer
2. Navigate to the Chord Finder page
3. Grant MIDI access permission when prompted
4. Play notes on your MIDI device to see real-time chord detection

**Note**: The Web MIDI API requires a secure context (HTTPS or localhost) and is currently supported in Chrome, Edge, and Opera browsers.

## Deployment

This project is configured for Firebase Hosting:

```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy
```

## Project Structure

```
src/
├── api/           # API client configuration
├── components/    # Reusable React components
├── pages/         # Route-level page components
├── utils/         # Utility functions (chord detection, etc.)
├── App.jsx        # Main app with routing
└── main.jsx       # App entry point
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is private and not currently licensed for public use.
