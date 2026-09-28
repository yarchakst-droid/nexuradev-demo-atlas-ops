import Image from "next/image";
import type { CSSProperties } from "react";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function Avatar({
  src,
  name,
  sizePx,
  className = "",
  style,
}: {
  src: string;
  name: string;
  sizePx: number;
  className?: string;
  style?: CSSProperties;
}) {
  if (src) {
    return (
      <span className={`relative block shrink-0 overflow-hidden rounded-full ${className}`} style={style}>
        <Image src={src} alt={name} fill sizes={`${sizePx}px`} className="object-cover" />
      </span>
    );
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-soft font-semibold text-accent ${className}`}
      style={{ fontSize: sizePx * 0.36, ...style }}
      aria-label={name}
    >
      {initials(name)}
    </span>
  );
}
