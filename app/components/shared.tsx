"use client";

import React from "react";

// ── Logo ─────────────────────────────────────────────────────────────────────
export function Logo({ size = 20, showWordmark = true }: { size?: number; showWordmark?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="1" y="1" width="22" height="22" rx="6" fill="var(--accent)" />
        <path d="M7 12 L10.5 15.5 L17 9" stroke="var(--accent-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10.5" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3" />
      </svg>
      {showWordmark && (
        <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>
          chill<span style={{ color: "var(--accent)" }}>reach</span>
        </span>
      )}
    </div>
  );
}

// ── Icons ────────────────────────────────────────────────────────────────────
type IP = React.SVGProps<SVGSVGElement>;

export const I: Record<string, (p?: IP) => React.ReactElement> = {
  arrow: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  play: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  pause: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  ),
  bolt: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  dot: (p = {}) => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" {...p}><circle cx="4" cy="4" r="3.2" /></svg>
  ),
  check: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="m5 12 5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  cross: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  search: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  settings: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  file: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  briefcase: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  inbox: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.5 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.5A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.5z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  bar: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="7" y="13" width="3" height="5" fill="currentColor" />
      <rect x="12" y="8" width="3" height="10" fill="currentColor" />
      <rect x="17" y="4" width="3" height="14" fill="currentColor" />
    </svg>
  ),
  user: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  bell: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 21a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  external: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  plus: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  filter: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M3 5h18l-7 9v6l-4-2v-4L3 5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  sparkle: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 3v6m0 6v6M3 12h6m6 0h6M5.6 5.6l4.2 4.2m4.4 4.4 4.2 4.2M5.6 18.4l4.2-4.2m4.4-4.4 4.2-4.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  stop: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
    </svg>
  ),
  menu: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  dots: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" />
    </svg>
  ),
};

// ── CompanyDot ───────────────────────────────────────────────────────────────
export function CompanyDot({ name, color }: { name: string; color?: string }) {
  const initial = (name || "?")[0].toUpperCase();
  const bg = color || "var(--line-2)";
  return (
    <div style={{
      width: 28, height: 28, borderRadius: 7, background: bg,
      display: "grid", placeItems: "center", fontSize: 13, fontWeight: 600,
      color: "var(--bg)", flexShrink: 0,
    }}>{initial}</div>
  );
}

// ── COMPANIES ────────────────────────────────────────────────────────────────
export const COMPANIES = [
  { name: "Stripe",     color: "#8ab6ff" },
  { name: "Vercel",     color: "#f1f1e8" },
  { name: "Linear",     color: "#c9b4ff" },
  { name: "Notion",     color: "#e9e4da" },
  { name: "Airbnb",     color: "#ff7a85" },
  { name: "Figma",      color: "#ff9d6b" },
  { name: "Ramp",       color: "#e5fa8a" },
  { name: "Brex",       color: "#ffbc5a" },
  { name: "Anthropic",  color: "#d4a373" },
  { name: "Scale",      color: "#a1f0c4" },
  { name: "Cursor",     color: "#ffffff" },
  { name: "Perplexity", color: "#7ac7ff" },
  { name: "OpenAI",     color: "#a1f0c4" },
  { name: "Retool",     color: "#ff9d6b" },
  { name: "Mercury",    color: "#c5f02c" },
  { name: "Databricks", color: "#ff6b6b" },
];
