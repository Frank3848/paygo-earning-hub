// Custom SVG icons to match the dashboard design exactly like the reference

export const CreditCardIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10">
    {/* Card body */}
    <rect x="4" y="10" width="40" height="28" rx="4" fill="#FFD54F"/>
    {/* Magnetic stripe */}
    <rect x="4" y="18" width="40" height="6" fill="#424242"/>
    {/* Card details area */}
    <rect x="8" y="28" width="16" height="3" rx="1.5" fill="#FFA000"/>
    <rect x="8" y="33" width="10" height="2" rx="1" fill="#FFA000"/>
  </svg>
);

export const TvIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10">
    {/* Antenna */}
    <path d="M18 6 L24 14 L30 6" stroke="#37474F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    {/* TV Body */}
    <rect x="6" y="14" width="36" height="28" rx="4" fill="#00838F"/>
    {/* Screen */}
    <rect x="10" y="18" width="28" height="18" rx="2" fill="#80DEEA"/>
    {/* Screen shine */}
    <rect x="12" y="20" width="8" height="4" rx="1" fill="#B2EBF2" opacity="0.6"/>
    {/* Stand */}
    <rect x="18" y="42" width="12" height="4" rx="1" fill="#37474F"/>
  </svg>
);

export const AirtimeChartIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10">
    {/* Background/Border */}
    <rect x="4" y="4" width="40" height="40" rx="3" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="2"/>
    {/* Grid lines */}
    <line x1="4" y1="14" x2="44" y2="14" stroke="#EEEEEE" strokeWidth="1"/>
    <line x1="4" y1="24" x2="44" y2="24" stroke="#EEEEEE" strokeWidth="1"/>
    <line x1="4" y1="34" x2="44" y2="34" stroke="#EEEEEE" strokeWidth="1"/>
    {/* Bar chart bars */}
    <rect x="10" y="18" width="8" height="20" rx="1" fill="#EF5350"/>
    <rect x="20" y="10" width="8" height="28" rx="1" fill="#66BB6A"/>
    <rect x="30" y="22" width="8" height="16" rx="1" fill="#42A5F5"/>
  </svg>
);

export const DataCabinetIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10">
    {/* Cabinet body */}
    <rect x="8" y="4" width="32" height="40" rx="3" fill="#78909C"/>
    {/* Top drawer */}
    <rect x="12" y="8" width="24" height="12" rx="2" fill="#546E7A"/>
    <rect x="20" y="12" width="8" height="4" rx="2" fill="#37474F"/>
    {/* Bottom drawer */}
    <rect x="12" y="24" width="24" height="12" rx="2" fill="#546E7A"/>
    <rect x="20" y="28" width="8" height="4" rx="2" fill="#37474F"/>
    {/* Base */}
    <rect x="12" y="38" width="24" height="4" rx="1" fill="#546E7A"/>
  </svg>
);

export const HeadphonesIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10">
    {/* Headband */}
    <path d="M8 26 C8 14 14 6 24 6 C34 6 40 14 40 26" fill="none" stroke="#455A64" strokeWidth="5" strokeLinecap="round"/>
    {/* Left ear cup outer */}
    <ellipse cx="9" cy="32" rx="6" ry="10" fill="#455A64"/>
    {/* Left ear cup inner */}
    <ellipse cx="9" cy="32" rx="4" ry="7" fill="#607D8B"/>
    {/* Right ear cup outer */}
    <ellipse cx="39" cy="32" rx="6" ry="10" fill="#455A64"/>
    {/* Right ear cup inner */}
    <ellipse cx="39" cy="32" rx="4" ry="7" fill="#607D8B"/>
  </svg>
);

export const GlobeIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10">
    {/* Globe circle */}
    <circle cx="24" cy="24" r="20" fill="none" stroke="#1E88E5" strokeWidth="3"/>
    {/* Horizontal curve top */}
    <ellipse cx="24" cy="12" rx="16" ry="5" fill="none" stroke="#1E88E5" strokeWidth="2.5"/>
    {/* Center line */}
    <line x1="4" y1="24" x2="44" y2="24" stroke="#1E88E5" strokeWidth="2.5"/>
    {/* Horizontal curve bottom */}
    <ellipse cx="24" cy="36" rx="16" ry="5" fill="none" stroke="#1E88E5" strokeWidth="2.5"/>
    {/* Vertical ellipse */}
    <ellipse cx="24" cy="24" rx="10" ry="20" fill="none" stroke="#1E88E5" strokeWidth="2.5"/>
  </svg>
);

export const MoneyBagIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10">
    {/* Bag tie top */}
    <ellipse cx="24" cy="8" rx="8" ry="4" fill="#FF8F00"/>
    <rect x="20" y="6" width="8" height="6" fill="#FF8F00"/>
    {/* Bag body shadow */}
    <path d="M10 16 C6 22 6 40 24 44 C42 40 42 22 38 16 Z" fill="#FFA000"/>
    {/* Bag body main */}
    <path d="M12 16 C8 22 8 38 24 42 C40 38 40 22 36 16 Z" fill="#FFC107"/>
    {/* Dollar circle */}
    <circle cx="24" cy="28" r="10" fill="#FF8F00"/>
    {/* Dollar sign */}
    <text x="24" y="33" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="Arial">$</text>
  </svg>
);

export const ProfileIcon = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10">
    {/* Head */}
    <circle cx="24" cy="14" r="10" fill="#1E88E5"/>
    {/* Body */}
    <path d="M8 44 C8 32 14 24 24 24 C34 24 40 32 40 44" fill="#1E88E5"/>
  </svg>
);
