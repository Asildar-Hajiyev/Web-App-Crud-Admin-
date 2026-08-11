import { useState } from "react"
import { Link } from "react-router-dom"

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">

        {/* Sol hissə: Naviqasiya Menyusu (desktop) */}
        <nav className="hidden md:flex items-center gap-7">
          <Link to="/home" className="text-[15px] text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Home
          </Link>
          <Link to="/contact" className="text-[15px] text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Contact
          </Link>
          <Link to="/about" className="text-[15px] text-gray-700 hover:text-blue-600 font-medium transition-colors">
            About
          </Link>
        </nav>

        {/* Mobil hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Menyu"
        >
          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Orta hissə: Search Input */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Axtarış edin..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 text-sm bg-gray-50 hover:bg-gray-100/70 focus:bg-white transition-colors placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Sağ hissə: Admin Panel & Səbət */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Admin Panele Daxil Ol */}
          <Link
            to="/login"
            className="hidden sm:inline-block text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            Admin panele daxil ol
          </Link>

          {/* Səbət (Cart) İkonu */}
          <button
            type="button"
            className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            aria-label="Səbət"
          >
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center border-2 border-white leading-none">
              0
            </span>
          </button>

        </div>

      </div>

      {/* Mobil açılan menyu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3.5 pt-3.5 border-t border-gray-100 space-y-3">
          {/* Mobil search */}
          <div className="relative sm:hidden">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Axtarış edin..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 text-sm bg-gray-50 placeholder:text-gray-400"
            />
          </div>

          {/* Mobil nav linkləri */}
          <nav className="flex flex-col gap-1">
            <Link
              to="/home"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[15px] text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors px-2 py-2 rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[15px] text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors px-2 py-2 rounded-lg"
            >
              Contact
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[15px] text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium transition-colors px-2 py-2 rounded-lg"
            >
              About
            </Link>
          </nav>

          {/* Mobil admin panel linki */}
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="sm:hidden block text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 px-3.5 py-2 rounded-lg transition-colors text-center"
          >
            Admin panele daxil ol
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header