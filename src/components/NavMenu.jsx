import React, { useState } from "react"
import { NavLink } from "react-router"

// MUI Icons - you would typically install @mui/icons-material
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
)

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Scales", path: "/scales" },
    { label: "Chords", path: "/chords" },
    { label: "Circle of Fifths", path: "/circle-of-fifths" },
    { label: "Progressions", path: "/progressions" },
    { label: "Metronome", path: "/metronome" },
    { label: "Chord Finder", path: "/chord-finder" },
    { label: "Contact Us", path: "/contact" },
  ]

  const linkClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors"
  const activeLinkClass = "bg-green-500 text-white"
  const inactiveLinkClass = "text-gray-300 hover:bg-slate-700 hover:text-white"

  const NavLinks = ({ isMobile }) =>
    navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass} ${
            isMobile ? "block" : ""
          }`
        }
      >
        {item.label}
      </NavLink>
    ))

  return (
    <nav>
      <div className="hidden md:flex items-center space-x-4">
        <NavLinks isMobile={false} />
      </div>
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-16 right-0 w-full bg-slate-800 shadow-lg p-4">
          <div className="flex flex-col space-y-2">
            <NavLinks isMobile={true} />
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavMenu
