type SpotlyLogoProps = {
  color1?: string;
  color2?: string;
};

export default function SpotlyLogo({
  color1 = "#0F5C3B",
  color2 = "#A3D74F",
}: SpotlyLogoProps) {
  return (
    <div className="flex items-center h-[60px]" dir="ltr">
      <svg
        viewBox="0 0 350 150"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>

        <g transform="translate(40, 28) scale(0.7)">
          <path
            d="M50 0C22.4 0 0 22.4 0 50c0 35.3 44.9 64.2 46.9 65.5L50 120l3.1-4.5C55.1 114.2 100 85.3 100 50c0-27.6-22.4-50-50-50zm0 80c-16.6 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30-13.4 30-30 30z"
            fill="url(#logoGradient)"
          />
          <path
            d="M50 25L55 45L75 50L55 55L50 75L45 55L25 50L45 45Z"
            fill="#fff"
          />
          <path
            d="M5 105h90c5 0 10 5 10 10s-5 10-10 10H5c-5 0-10-5-10-10s5-10 10-10z"
            fill="url(#logoGradient)"
          />
        </g>

        <g transform="translate(130, 100)">
          <text
            x="0"
            y="0"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            fontSize="60"
            fill="url(#logoGradient)"
          >
            Spotly
          </text>
        </g>
      </svg>
    </div>
  );
}
