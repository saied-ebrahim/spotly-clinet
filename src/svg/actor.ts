export const actor = `
<svg width="100%" height="100%" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">

  <!-- Background soft blob -->
  <circle cx="120" cy="120" r="90" fill="#F4F6FF"/>

  <!-- Main celebration burst -->
  <g fill="#6366F1">
    <rect x="118" y="40" width="4" height="20" rx="2"/>
    <rect x="118" y="180" width="4" height="20" rx="2"/>
    <rect x="40" y="118" width="20" height="4" rx="2"/>
    <rect x="180" y="118" width="20" height="4" rx="2"/>

    <!-- Diagonals -->
    <rect x="165" y="65" width="4" height="18" rx="2" transform="rotate(45 167 74)"/>
    <rect x="65" y="155" width="4" height="18" rx="2" transform="rotate(45 67 164)"/>
    <rect x="65" y="65" width="4" height="18" rx="2" transform="rotate(-45 67 74)"/>
    <rect x="165" y="155" width="4" height="18" rx="2" transform="rotate(-45 167 164)"/>
  </g>

  <!-- Sparkles -->
  <circle cx="120" cy="120" r="35" fill="#A5B4FC"/>
  <circle cx="120" cy="120" r="22" fill="white"/>
  <circle cx="120" cy="120" r="6" fill="#6366F1"/>

  <!-- Confetti points -->
  <circle cx="160" cy="110" r="4" fill="#F59E0B"/>
  <circle cx="90"  cy="140" r="4" fill="#10B981"/>
  <circle cx="150" cy="150" r="4" fill="#EF4444"/>
  <circle cx="80"  cy="95"  r="4" fill="#3B82F6"/>

</svg>
`;