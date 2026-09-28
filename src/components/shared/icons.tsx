type IconProps = { className?: string };

const w = "1.6" as const;

export function GaugeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M4 14a8 8 0 1 1 16 0" strokeLinecap="round" />
      <path d="M12 14 15.5 9" strokeLinecap="round" />
      <path d="M4 14h1M19 14h1M12 5.5v1" strokeLinecap="round" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M3 7h10v9H3z" strokeLinejoin="round" />
      <path d="M13 10h4l3 3v3h-7z" strokeLinejoin="round" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="17" cy="17.5" r="1.6" />
    </svg>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" strokeLinecap="round" />
      <path d="M15.5 5.8c1.4.4 2.5 1.7 2.5 3.2 0 1.5-1 2.7-2.4 3.2M18 14.3c2 .5 3.5 2.2 3.5 4.4" strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AlertTriangleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M12 4.5 21.5 20h-19L12 4.5Z" strokeLinejoin="round" />
      <path d="M12 10v4.2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path
        d="M6 3.5h3l1.3 4-2 1.5a11 11 0 0 0 4.7 4.7l1.5-2 4 1.3v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4 4.7 2 2 0 0 1 6 3.5Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PackageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z" strokeLinejoin="round" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v9" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

export function BellIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M6 10a6 6 0 1 1 12 0c0 3.5 1 5 1.5 6H4.5C5 15 6 13.5 6 10Z" strokeLinejoin="round" />
      <path d="M10 19.5a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  );
}

export function TrendUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M4 16 10 10l4 4 6-7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrendDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M4 8 10 14l4-4 6 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 17h5v-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CompassIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m14.8 9.2-1.5 4.1-4.1 1.5 1.5-4.1 4.1-1.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function ChartBarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M4.5 19.5v-6M12 19.5v-11M19.5 19.5v-3.5" strokeLinecap="round" />
      <path d="M3.5 19.5h17" strokeLinecap="round" />
    </svg>
  );
}

export function FuelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M5 20V6a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 13 6v14" strokeLinejoin="round" />
      <path d="M5 20h8M13 9.5h2l2.3 2.3v5.2a1.3 1.3 0 0 1-2.6 0v-1.6a1 1 0 0 0-1-1H13" strokeLinejoin="round" />
      <path d="M7.5 8h3" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M4 6.5h16M4 12h16M4 17.5h16" strokeLinecap="round" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export function WrenchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path
        d="M14.7 6.3a4 4 0 0 0-5.4 4.6L4 16.2v3h3l5.3-5.3a4 4 0 0 0 4.6-5.4l-2.6 2.6-2.1-.6-.6-2.1 2.1-2.1Z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Atlas Ops brand mark — a compass rose, echoing the CompassIcon used on the route
 * schematic so the logo and the product's own visual language stay the same idea. */
export function LogoMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M12 3v1.6M12 19.4V21M3 12h1.6M19.4 12H21" strokeLinecap="round" />
    </svg>
  );
}

export function WalletIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" strokeLinejoin="round" />
      <path d="M4 9.5h16" />
      <path d="M15 14h2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V16H6.5A2.5 2.5 0 0 1 4 13.5v-7Z"
        strokeLinejoin="round"
      />
      <path d="M8 8.8h8M8 11.8h5" strokeLinecap="round" />
    </svg>
  );
}

export function RadarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" strokeOpacity="0.55" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M12 12 17 7.5" strokeLinecap="round" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 9.5h16M8 3.5v3M16 3.5v3" strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M9 4.5H6.5A1.5 1.5 0 0 0 5 6v12a1.5 1.5 0 0 0 1.5 1.5H9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8l4 4-4 4M18 12H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <circle cx="12" cy="8.5" r="3.3" />
      <path d="M4.5 20c0-3.3 2.9-5.8 7.5-5.8s7.5 2.5 7.5 5.8" strokeLinecap="round" />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function EyeOffIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} className={className}>
      <path
        d="M4 4l16 16M9.9 5.6C10.6 5.5 11.3 5.5 12 5.5c6 0 9.5 6.5 9.5 6.5a15 15 0 0 1-3 3.9M6.5 7.6A15.4 15.4 0 0 0 2.5 12S6 18.5 12 18.5c1.3 0 2.5-.3 3.6-.8M9.9 10a2.6 2.6 0 0 0 3.6 3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
