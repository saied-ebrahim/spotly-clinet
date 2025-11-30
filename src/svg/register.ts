export const register = `
<svg width="100%" height="100%" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">

  <!-- Soft background shape -->
  <circle cx="120" cy="120" r="90" fill="#EEF2FF"/>

  <!-- Shadow -->
  <ellipse cx="120" cy="175" rx="55" ry="10" fill="#000" opacity="0.08"/>

  <!-- Lock body -->
  <rect x="70" y="105" width="100" height="80" rx="12" fill="#6366F1"/>

  <!-- Lock shackle -->
  <path d="M90 105c0-20 10-35 30-35s30 15 30 35" 
        stroke="#6366F1" stroke-width="10" fill="none" stroke-linecap="round"/>

  <!-- Inner circle -->
  <circle cx="120" cy="145" r="16" fill="white"/>

  <!-- Keyhole -->
  <path d="M120 139a6 6 0 1 1-6 6c0-3.3 2.7-6 6-6z
           M118 150h4v10h-4z"
        fill="#6366F1"/>

  <!-- Decorative sparkles -->
  <circle cx="165" cy="85" r="4" fill="#F59E0B"/>
  <circle cx="75"  cy="90" r="3" fill="#10B981"/>
  <circle cx="150" cy="60" r="5" fill="#3B82F6" opacity="0.8"/>
  <circle cx="95"  cy="60" r="4" fill="#EF4444" opacity="0.8"/>

</svg>
`;