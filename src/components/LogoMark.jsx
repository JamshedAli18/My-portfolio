import { useId } from "react";

export default function LogoMark({ className = "", isDark = false }) {
  const gradientId = useId();
  const fillColor = isDark ? `url(#${gradientId})` : "#0f0f0d";
  const borderColor = isDark ? "rgba(245, 243, 238, 0.45)" : "rgba(15, 15, 13, 0.35)";
  const innerRingColor = isDark ? "rgba(245, 243, 238, 0.24)" : "rgba(255, 255, 255, 0.2)";
  const textColor = "#f5f3ee";

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="12"
          y1="10"
          x2="52"
          y2="54"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#dd6a4d" />
          <stop offset="100%" stopColor="#c8472a" />
        </linearGradient>
      </defs>

      {/* Circle mark */}
      <circle
        cx="32"
        cy="32"
        r="24"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="1.6"
      />

      <circle
        cx="32"
        cy="32"
        r="20.5"
        stroke={innerRingColor}
        strokeWidth="0.8"
      />

      {/* JA Text */}
      <text
        x="32"
        y="38"
        fontSize="17"
        fontWeight="700"
        fontFamily="'DM Sans', sans-serif"
        textAnchor="middle"
        fill={textColor}
        letterSpacing="0.45"
      >
        JA
      </text>
    </svg>
  );
}
