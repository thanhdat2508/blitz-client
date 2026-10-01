import { useState } from 'react'
import type { Role } from '../types/champion'

interface RoleIconProps {
  role: Role
  className?: string
}

// Official Riot Games / League of Legends position icons from CommunityDragon
const ROLE_COMMUNITY_DRAGON_ICONS: Record<Role, string> = {
  TOP: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png',
  JUNGLE: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png',
  MID: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png',
  ADC: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png',
  SUPPORT: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png',
  ALL: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-fill.png',
}

export function RoleIcon({ role, className = 'w-4 h-4' }: RoleIconProps) {
  const [imgErr, setImgErr] = useState(false)
  const iconUrl = ROLE_COMMUNITY_DRAGON_ICONS[role]

  if (iconUrl && !imgErr) {
    return (
      <img
        src={iconUrl}
        alt={`${role} role icon`}
        loading="lazy"
        onError={() => setImgErr(true)}
        className={`${className} object-contain shrink-0`}
      />
    )
  }

  // Authentic Riot SVG vector fallback if image loading fails
  if (role === 'TOP') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M5 4h14v3H8v11H5V4zm6 6h8v3h-5v5h-3v-8z" />
      </svg>
    )
  }

  if (role === 'JUNGLE') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C7 5 5 10 5 15c0 4 3 7 7 7s7-3 7-7c0-5-2-10-7-13zm0 4c2.5 3 3.5 6 3.5 9 0 2-1.5 3.5-3.5 3.5S8.5 17 8.5 15c0-3 1-6 3.5-9z" />
      </svg>
    )
  }

  if (role === 'MID') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M4 20 20 4h-4L4 16v4zm1-8 7-7h-4L4 9v3zm14 4-7 7h4l4-4v-3z" />
      </svg>
    )
  }

  if (role === 'ADC') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 3v4m0 10v4M3 12h4m10 0h4m-3.5-5.5L14 10m-4 4-3.5 3.5M17.5 17.5 14 14m-4-4-3.5-3.5M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    )
  }

  if (role === 'SUPPORT') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 3a9 9 0 0 0-9 9c0 6 9 10 9 10s9-4 9-10a9 9 0 0 0-9-9zm0 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
      </svg>
    )
  }

  // ALL ROLES: 5-points fill star
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.4 6.6L21 9.2l-5 4.5 1.5 6.8L12 17l-5.5 3.5L8 13.7 3 9.2l6.6-.6L12 2z" />
    </svg>
  )
}
