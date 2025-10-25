import React from "react"
import { Routes, Route } from "react-router"

import Header from "./components/Header"
import Footer from "./components/Footer"

// Pages
import Home from "./pages/Home"
import Scales from "./pages/Scales"
import Chords from "./pages/Chords"
import CircleOfFifths from "./pages/CircleOfFifths"
import Progressions from "./pages/Progressions"
import Metronome from "./pages/Metronome"
import ChordFinder from "./pages/ChordFinder"
import Contact from "./pages/Contact"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-800 text-white font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scales" element={<Scales />} />
          <Route path="/chords" element={<Chords />} />
          <Route path="/circle-of-fifths" element={<CircleOfFifths />} />
          <Route path="/progressions" element={<Progressions />} />
          <Route path="/metronome" element={<Metronome />} />
          <Route path="/chord-finder" element={<ChordFinder />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
