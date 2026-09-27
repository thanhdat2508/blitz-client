import type { Role } from '../types/champion'

interface RoleIconProps {
  role: Role
  className?: string
}

export function RoleIcon({ role, className = 'w-4 h-4' }: RoleIconProps) {
  if (role === 'TOP') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M4 4h7v7H4z" />
        <path d="M4 13h16v7H4z" opacity="0.3" />
        <path d="M13 4h7v7h-7z" opacity="0.3" />
      </svg>
    )
  }

  if (role === 'JUNGLE') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2 8 8h3v6H8l4 6 4-6h-3V8h3z" />
      </svg>
    )
  }

  if (role === 'MID') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="m4 20 16-16h-4L4 16z" />
        <path d="M4 4h6v6H4z" opacity="0.3" />
        <path d="M14 14h6v6h-6z" opacity="0.3" />
      </svg>
    )
  }

  if (role === 'ADC') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M13 13h7v7h-7z" />
        <path d="M4 4h16v7H4z" opacity="0.3" />
        <path d="M4 13h7v7H4z" opacity="0.3" />
      </svg>
    )
  }

  if (role === 'SUPPORT') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
      </svg>
    )
  }

  // ALL ROLES: Asterisk / Star icon for all roles
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
