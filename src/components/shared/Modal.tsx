"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { XIcon } from "@/components/shared/icons";

export default function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[1px] p-4"
      onPointerDown={(e) => {
        if (!panelRef.current?.contains(e.target as Node)) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className="panel w-full max-w-md rounded-2xl border border-border p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight text-text">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="pressable flex size-8 items-center justify-center rounded-md text-text-muted hover:bg-bg-hover hover:text-text"
          >
            <XIcon className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
