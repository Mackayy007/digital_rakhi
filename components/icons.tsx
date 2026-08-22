export function HeartIcon({ size = 16, color = "#D6447E", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" className={className}>
      <path d="M12 20s-7-4.4-9.5-9C.7 7.4 3 4 6.5 4 9 4 11 6 12 7.5 13 6 15 4 17.5 4 21 4 23.3 7.4 21.5 11 19 15.6 12 20 12 20z" />
    </svg>
  );
}

export function HeartOutlineIcon({ size = 24, color = "#D6447E", strokeWidth = 1.6, className = "" }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" className={className}>
      <path d="M12 20s-7-4.4-9.5-9C.7 7.4 3 4 6.5 4 9 4 11 6 12 7.5 13 6 15 4 17.5 4 21 4 23.3 7.4 21.5 11 19 15.6 12 20 12 20z" />
    </svg>
  );
}

export function ShieldIcon({ size = 22, color = "#B23A48", strokeWidth = 1.6, checked = false, className = "" }: { size?: number; color?: string; strokeWidth?: number; checked?: boolean; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      {checked && <path d="M9 12l2 2 4-4.5" />}
    </svg>
  );
}

export function SparkleIcon({ size = 16, color = "#2A9D8F", strokeWidth = 1.8, className = "" }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M6 18l2.5-2.5" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 17, color = "#FFFFFF", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ size = 12, color = "#FFFFFF", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function AlgorithmIcon({ size = 22, color = "#237F79", strokeWidth = 2, className = "" }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 6L3 12l5 6M16 6l5 6-5 6" />
    </svg>
  );
}

export function MuteIcon({ size = 18, color = "#8A5A2E", muted = false, className = "" }: { size?: number; color?: string; muted?: boolean; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 5L6 9H3v6h3l5 4V5z" fill={color} stroke="none" />
      {muted ? <path d="M16 9l6 6M22 9l-6 6" /> : <path d="M15.5 8.5a5 5 0 010 7M18.5 6a9 9 0 010 12" />}
    </svg>
  );
}

export function CopyIcon({ size = 17, color = "#3A2A1E", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="9" width="12" height="12" rx="2.5" />
      <path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, color = "#FFFFFF", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" className={className}>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.1.2-.3.2-.4.1-.1 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.2 1 2.4.1.1 1.6 2.5 4 3.4.6.2 1 .4 1.3.5.5.2 1 .1 1.4-.1.4-.2 1.2-.9 1.4-1.3.2-.4.2-.8.1-.9-.1-.1-.2-.2-.5-.3z" />
      <path d="M12 2.2c-5.4 0-9.8 4.4-9.8 9.8 0 1.7.4 3.4 1.3 4.9L2 21.8l5-1.3c1.4.8 3 1.2 4.9 1.2 5.4 0 9.8-4.4 9.8-9.8S17.4 2.2 12 2.2zm0 17.8c-1.6 0-3.2-.4-4.5-1.3l-.3-.2-3 .8.8-2.9-.2-.3c-.9-1.4-1.4-3-1.4-4.7 0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4-3.6 8.6-8.2 8.6z" />
    </svg>
  );
}
