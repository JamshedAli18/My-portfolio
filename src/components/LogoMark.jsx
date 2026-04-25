export default function LogoMark({ className = "", isDark = false }) {
  const circleFill = isDark ? "url(#logo-light-fill)" : "url(#logo-dark-fill)";
  const ringStroke = isDark ? "rgba(18, 17, 15, 0.14)" : "rgba(247, 243, 237, 0.16)";
  const textFill = isDark ? "#161513" : "#f7f3ed";
  const accentStroke = isDark ? "rgba(180, 113, 68, 0.22)" : "rgba(255, 255, 255, 0.12)";

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-dark-fill" x1="14" y1="12" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#181614" />
          <stop offset="100%" stopColor="#26221e" />
        </linearGradient>
        <linearGradient id="logo-light-fill" x1="14" y1="12" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f7f3ed" />
          <stop offset="100%" stopColor="#e8dfd2" />
        </linearGradient>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="24"
        fill={circleFill}
      />

      <circle
        cx="32"
        cy="32"
        r="21"
        stroke={ringStroke}
        strokeWidth="0.9"
      />

      <circle
        cx="32"
        cy="32"
        r="18.5"
        stroke={accentStroke}
        strokeWidth="0.8"
      />

      <text
        x="32"
        y="38"
        fontSize="17"
        fontWeight="700"
        fontFamily="'Georgia', 'Times New Roman', serif"
        textAnchor="middle"
        fill={textFill}
        letterSpacing="0.3"
      >
        JA
      </text>
    </svg>
  );
}
