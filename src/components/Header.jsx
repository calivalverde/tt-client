import React from "react"
import { Link } from "react-router"
import NavMenu from "./NavMenu"

function Header() {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bungee tracking-wider">
            <Link
              to="/"
              className="text-white hover:text-green-400 transition-colors"
              style={{
                fontFamily: "Bungee, sans-serif",
                textShadow: "0 0 20px hsl(142 69% 58% / .5)",
              }}
            >
              TheTritone.com
            </Link>
          </div>
          <NavMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
