"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export default function CountUp({
  value,
  suffix = "",
  duration = 0.9,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate(v) {
        node.textContent = Math.round(v).toString() + suffix;
      },
    });
    return () => controls.stop();
  }, [value, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}
