import { useState } from 'react'
import { getPerkInfo, RUNE_STYLE_ICON } from '../../data/ddragon-ids'

export interface RuneIconProps {
  perkId?: number
  styleId?: number
  iconUrl?: string
  alt?: string
  size?: string
  className?: string
  isKeystone?: boolean
  isSecondaryStyle?: boolean
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
}

// Default fallback perk icon if CDN or image fails
export const FALLBACK_PERK_ICON =
  'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png'

export function RuneIcon({
  perkId,
  styleId,
  iconUrl,
  alt,
  size = 'w-4 h-4',
  className = '',
  isKeystone = false,
  isSecondaryStyle = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: RuneIconProps) {
  const [hasError, setHasError] = useState(false)

  // Resolve source URL
  let resolvedUrl = iconUrl
  let resolvedAlt = alt || 'Rune Icon'

  if (perkId) {
    const perk = getPerkInfo(perkId)
    resolvedUrl = perk.iconUrl || resolvedUrl
    resolvedAlt = alt || perk.name
  } else if (styleId && isSecondaryStyle) {
    resolvedUrl = RUNE_STYLE_ICON[styleId] || resolvedUrl
    resolvedAlt = alt || 'Secondary Style'
  }

  const finalSrc = hasError || !resolvedUrl ? FALLBACK_PERK_ICON : resolvedUrl

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden ${size} ${
        isKeystone
          ? 'border border-amber-500/60 bg-zinc-950 shadow-sm'
          : isSecondaryStyle
            ? 'border border-zinc-700/60 bg-zinc-950'
            : 'border border-zinc-800 bg-zinc-900'
      } ${className}`}
      title={resolvedAlt}
    >
      <img
        src={finalSrc}
        alt={resolvedAlt}
        loading="lazy"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  )
}
