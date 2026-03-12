const BADGE_COLOR = '#16a34a'

export function SustainableBadge({ className = 'w-24 h-24 shrink-0' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sustainable">
      <circle cx="50" cy="50" r="45" fill={BADGE_COLOR} />
      <rect x="16" y="42" width="68" height="16" rx="3" fill={BADGE_COLOR} />
      <text x="50" y="54" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial, sans-serif">SUSTAINABLE</text>
      <circle cx="28" cy="30" r="2.5" fill="white" />
      <circle cx="50" cy="28" r="2.5" fill="white" />
      <circle cx="72" cy="30" r="2.5" fill="white" />
      <circle cx="28" cy="70" r="2.5" fill="white" />
      <circle cx="50" cy="72" r="2.5" fill="white" />
      <circle cx="72" cy="70" r="2.5" fill="white" />
    </svg>
  )
}

export function EnvironmentalProtectionBadge({ className = 'w-24 h-24 shrink-0' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Environmental Protection">
      <circle cx="50" cy="50" r="45" fill={BADGE_COLOR} />
      <rect x="14" y="40" width="72" height="20" rx="3" fill={BADGE_COLOR} />
      <text x="50" y="50" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold" fontFamily="Arial, sans-serif">ENVIRONMENTAL</text>
      <text x="50" y="58" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold" fontFamily="Arial, sans-serif">PROTECTION</text>
      <circle cx="28" cy="28" r="2.5" fill="white" />
      <circle cx="50" cy="26" r="2.5" fill="white" />
      <circle cx="72" cy="28" r="2.5" fill="white" />
      <circle cx="28" cy="72" r="2.5" fill="white" />
      <circle cx="50" cy="74" r="2.5" fill="white" />
      <circle cx="72" cy="72" r="2.5" fill="white" />
    </svg>
  )
}

export function LowCarbonFootprintBadge({ className = 'w-24 h-24 shrink-0' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Low Carbon Footprint">
      <circle cx="50" cy="50" r="45" fill="white" stroke={BADGE_COLOR} strokeWidth="4" />
      <text x="50" y="20" textAnchor="middle" fill={BADGE_COLOR} fontSize="6" fontWeight="bold" fontFamily="Arial, sans-serif">LOW CARBON</text>
      <text x="50" y="82" textAnchor="middle" fill={BADGE_COLOR} fontSize="6" fontWeight="bold" fontFamily="Arial, sans-serif">FOOTPRINT</text>
      {/* Footprint: heel (oval) at bottom, 5 toes in arc at top */}
      <ellipse cx="50" cy="65" rx="10" ry="7" fill={BADGE_COLOR} fillOpacity="0.7" />
      <circle cx="42" cy="40" r="3.5" fill={BADGE_COLOR} fillOpacity="0.85" />
      <circle cx="48" cy="36" r="3.5" fill={BADGE_COLOR} fillOpacity="0.85" />
      <circle cx="54" cy="36" r="3.5" fill={BADGE_COLOR} fillOpacity="0.85" />
      <circle cx="59" cy="42" r="3" fill={BADGE_COLOR} fillOpacity="0.85" />
      <circle cx="57" cy="52" r="2.5" fill={BADGE_COLOR} fillOpacity="0.85" />
    </svg>
  )
}
