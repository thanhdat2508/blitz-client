import { useAuth } from "../hooks/use-auth";
import { LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export function GuestUserMenu() {
  const { user, isAuthenticated, openLoginModal, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isAuthenticated || !user) {
    return (
      <Button
        type="button"
        onClick={() => openLoginModal()}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition-all cursor-pointer select-none"
      >
        <LogIn className="w-4 h-4" />
        <p>Log In</p>
      </Button>
    );
  }

  // When logged in: show clean user dropdown with name, email and sign out
  return (
    <div className="relative" ref={menuRef}>
      <Button
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
        <span className="truncate max-w-32.5">{user.name}</span>
      </Button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#11131c] border border-neutral-800 shadow-2xl p-2 z-50 text-neutral-200 animate-in fade-in-0 zoom-in-95 duration-100"
        >
          <div className="px-3 py-2 border-b border-neutral-800/80 mb-1">
            <p className="font-bold text-sm text-white truncate">{user.name}</p>
            <p className="text-xs text-neutral-400 truncate">{user.email}</p>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center">
            <Button
              type="button"
              onClick={() => {
                logout(false);
                setIsOpen(false);
              }}
              className="w-full justify-start"
              variant="destructive"
            >
              <LogOut className="w-4 h-4" />
              <p>Sign Out Current Device</p>
            </Button>

            <Button
              type="button"
              onClick={() => {
                logout(true);
                setIsOpen(false);
              }}
              className="w-full justify-start"
              variant="ghost"
            >
              <p>Sign Out All Devices</p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
