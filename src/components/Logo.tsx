import { Link } from "react-router"

export default function Logo({
  compact = false,
  inverse = false,
}: {
  compact?: boolean
  inverse?: boolean
}) {
  return (
    <Link className="logo" to="/app" aria-label="EduNest home">
      <svg
        className="logo-mark"
        viewBox="0 0 44 44"
        role="img"
        aria-label="EduNest"
      >
        <defs>
          <linearGradient
            id="edunest-gradient"
            x1="5"
            y1="34"
            x2="39"
            y2="8"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4F46E5" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <rect
          width="44"
          height="44"
          rx="13"
          fill={inverse ? "white" : "url(#edunest-gradient)"}
        />
        <path
          d="M9.5 16.6C14.5 16.1 18.7 17.9 22 21.2V32C18.6 28.7 14.4 27.2 9.5 27.7V16.6Z"
          fill={inverse ? "#4F46E5" : "white"}
          fillOpacity=".95"
        />
        <path
          d="M34.5 16.6C29.5 16.1 25.3 17.9 22 21.2V32C25.4 28.7 29.6 27.2 34.5 27.7V16.6Z"
          fill={inverse ? "#6D28D9" : "white"}
          fillOpacity=".78"
        />
        <path
          d="M16 14.3C18.4 11.8 20.4 9.2 22 6.6C23.6 9.2 25.6 11.8 28 14.3"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="22" cy="7.2" r="2.2" fill="#F59E0B" />
      </svg>
      {!compact && (
        <span className="logo-copy">
          <strong>EduNest</strong>
          <small>The operating system for your school</small>
        </span>
      )}
    </Link>
  )
}
