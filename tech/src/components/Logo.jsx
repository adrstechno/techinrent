import { cn } from "@/lib/utils";

export default function Logo({ size = "md", animated = true }) {
  const sizes = {
    sm: {
      width: 120,
      height: 60,
      logoSize: 40,
      textSize: 14
    },
    md: {
      width: 180,
      height: 90,
      logoSize: 60,
      textSize: 18
    },
    lg: {
      width: 240,
      height: 120,
      logoSize: 80,
      textSize: 24
    }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex flex-col items-center group">
      <div className={`relative ${animated ? 'transform hover:scale-105 transition-transform duration-300' : ''}`}>
        <svg
          width={currentSize.width}
          height={currentSize.height}
          viewBox="0 0 360 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          <defs>
            {/* Enhanced gradients matching your design */}
            <linearGradient id="logoGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5">
                {animated && <animate attributeName="stop-color" values="#4F46E5;#7C3AED;#4F46E5" dur="3s" repeatCount="indefinite" />}
              </stop>
              <stop offset="50%" stopColor="#7C3AED">
                {animated && <animate attributeName="stop-color" values="#7C3AED;#EC4899;#7C3AED" dur="3s" repeatCount="indefinite" />}
              </stop>
              <stop offset="100%" stopColor="#EC4899">
                {animated && <animate attributeName="stop-color" values="#EC4899;#4F46E5;#EC4899" dur="3s" repeatCount="indefinite" />}
              </stop>
            </linearGradient>
            <linearGradient id="textGradientMain" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981">
                {animated && <animate attributeName="stop-color" values="#10B981;#06B6D4;#10B981" dur="2s" repeatCount="indefinite" />}
              </stop>
              <stop offset="50%" stopColor="#06B6D4">
                {animated && <animate attributeName="stop-color" values="#06B6D4;#8B5CF6;#06B6D4" dur="2s" repeatCount="indefinite" />}
              </stop>
              <stop offset="100%" stopColor="#8B5CF6">
                {animated && <animate attributeName="stop-color" values="#8B5CF6;#10B981;#8B5CF6" dur="2s" repeatCount="indefinite" />}
              </stop>
            </linearGradient>
            {/* Glow effects */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background glow effect */}
          <circle cx="180" cy="100" r="80" fill="url(#logoGradientMain)" opacity="0.2" filter="url(#glow)">
            {animated && <animate attributeName="r" values="80;90;80" dur="4s" repeatCount="indefinite" />}
          </circle>

          {/* Modern Logo Symbol matching your design */}
          <g transform="translate(130, 40)">
            {/* Left vertical bar with rounded corners */}
            <rect x="0" y="0" width="20" height="80" rx="10" ry="10" fill="url(#logoGradientMain)" filter="url(#glow)">
              {animated && <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="2s" repeatCount="indefinite" />}
            </rect>
            {/* Center diagonal connecting element - stylized M shape */}
            <path
              d="M25 10 L50 70 L75 10 L75 70 L70 70 L50 20 L30 70 L25 70 Z"
              fill="url(#logoGradientMain)"
              filter="url(#glow)"
            >
              {animated && <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="3s" repeatCount="indefinite" />}
            </path>
            {/* Right vertical bar with rounded corners */}
            <rect x="80" y="0" width="20" height="80" rx="10" ry="10" fill="url(#logoGradientMain)" filter="url(#glow)">
              {animated && <animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="2s" repeatCount="indefinite" begin="0.5s" />}
            </rect>
          </g>

          {/* Enhanced Text with better typography */}
          <text
            x="180"
            y="160"
            textAnchor="middle"
            fontSize={currentSize.textSize}
            fill="url(#textGradientMain)"
            fontFamily="Poppins, sans-serif"
            fontWeight="700"
            filter="url(#glow)"
            className="select-none"
          >
            Tech in Rent
            {animated && <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />}
          </text>

          {/* Subtitle */}
          <text
            x="180"
            y="185"
            textAnchor="middle"
            fontSize="12"
            fill="url(#textGradientMain)"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
            opacity="0.8"
            className="select-none"
          >
            LinkedIn Rental Platform
          </text>
        </svg>

        {/* Additional glow effect overlay */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        )}
      </div>
    </div>
  );
}
