import * as React from 'react'
import { useAuth } from '../hooks/use-auth'
import { LogIn, LogOut, User } from 'lucide-react'

export function GuestUserMenu() {
  const { user, isAuthenticated, openLoginModal, logout } = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on Escape key
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // When not logged in: show clean Log In button that opens login modal (Image 2)
  if (!isAuthenticated || !user) {
    return (
      <button
        type="button"
        onClick={() => openLoginModal()}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition-all cursor-pointer select-none"
      >
        <LogIn className="w-4 h-4" />
        <span>Log In</span>
      </button>
    )
  }

  // When logged in: show clean user dropdown with name, email and sign out
  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold text-neutral-200 hover:text-white bg-[#141622] hover:bg-[#1a1d2e] transition-all cursor-pointer select-none border border-neutral-800"
        aria-expanded={isOpen}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-6 h-6 rounded-full bg-neutral-800 object-cover"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
            <User className="w-3.5 h-3.5" />
          </div>
        )}
        <span className="truncate max-w-[130px]">{user.name}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#11131c] border border-neutral-800 shadow-2xl p-2 z-50 text-neutral-200 animate-in fade-in-0 zoom-in-95 duration-100"
        >
          <div className="px-3 py-2 border-b border-neutral-800/80 mb-1">
            <p className="font-bold text-sm text-white truncate">{user.name}</p>
            <p className="text-xs text-neutral-400 truncate">{user.email}</p>
          </div>

          <button
            type="button"
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  )
}
