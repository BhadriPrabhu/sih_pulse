export default function Doodle({ type, className = "w-14 h-14", stroke = "#1B1A17", fill = "none" }) {
  const strokes = {
    iceCore: (
      <g stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4C7 2.5 17 2.5 17 4C17 5.5 7 5.5 7 4Z" fill={fill} />
        <path d="M7 4V20C7 21.5 17 21.5 17 20V4" fill={fill} />
        <path d="M7 10C10 11 14 9 17 10" />
        <path d="M7 15C10 14 14 16 17 15" />
      </g>
    ),
    camera: (
      <g stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8L7 4H17L20 8H22V20H2V8H4Z" fill={fill} />
        <circle cx="12" cy="14" r="4" fill="none" />
        <path d="M16 10H19" />
      </g>
    ),
    chalkboard: (
      <g stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="14" rx="1" fill={fill} />
        <path d="M6 22L10 18L14 22" />
        <path d="M4 22H20" />
        <circle cx="12" cy="11" r="3" fill="none" />
        <path d="M9 11C9 13 15 13 15 11" />
      </g>
    ),
    compass: (
      <g stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" fill={fill} />
        <path d="M12 6L14.5 12L12 18L9.5 12Z" />
      </g>
    ),
    penguin: (
      <g stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M12 2C9 2 6 6 6 12C6 18 8 22 12 22C16 22 18 18 18 12C18 6 15 2 12 2Z" />
        <path d="M9 7C9 7 11 9 12 9C13 9 15 7 15 7" />
        <path d="M11 11.5L12 13L13 11.5" fill={stroke} />
        <path d="M6 12C4 13 2 16 2 16" />
        <path d="M18 12C20 13 22 16 22 16" />
      </g>
    ),
    ship: (
      <g stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={fill}>
        <path d="M2 16L5 21H19L22 16Z" />
        <path d="M6 16V8L12 16Z" fill="none" />
        <path d="M12 16V4L18 16Z" fill="none" />
      </g>
    ),
    tent: (
      <g stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={fill}>
        <path d="M12 4L2 20H22Z" />
        <path d="M12 4V20" />
        <path d="M7 20L12 14L17 20" fill="none" />
      </g>
    ),
    footprints: (
      <g fill={fill} opacity="0.3">
        <path d="M4 18C5 17 6 18 5 20C4 22 3 21 4 18Z" />
        <path d="M8 14C9 13 10 14 9 16C8 18 7 17 8 14Z" />
        <path d="M14 10C15 9 16 10 15 12C14 14 13 13 14 10Z" />
        <path d="M18 6C19 5 20 6 19 8C18 10 17 9 18 6Z" />
      </g>
    ),
    wavyDivider: (
      <path 
        d="M0 10 Q 25 20 50 10 T 100 10 T 150 10 T 200 10 T 250 10 T 300 10 T 350 10 T 400 10" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeDasharray="8 6" 
        fill="none" 
      />
    ),
    play: (
      <g stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={fill}>
        <path d="M7 5L19 12L7 19Z" />
      </g>
    ),
    arrow: (
      <g stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M5 12H19" />
        <path d="M13 6L19 12L13 18" />
      </g>
    ),
    bookmark: (
      <g stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={fill}>
        <path d="M6 3H18V21L12 16L6 21V3Z" />
      </g>
    ),
  };

  const isDivider = type === 'wavyDivider';

  return (
    <svg 
      viewBox={isDivider ? "0 0 400 20" : "0 0 24 24"} 
      preserveAspectRatio={isDivider ? "none" : "xMidYMid meet"}
      className={className} 
      style={isDivider ? { width: '100%', height: '100%' } : {}}
    >
      {strokes[type]}
    </svg>
  );
}