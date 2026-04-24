import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ChillReach — Apply to hundreds of jobs while you sleep",
  description:
    "ChillReach is an AI agent that reads job postings, fills every form, and sends tailored applications on your behalf — all day, every day.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      style={
        {
          "--sans": "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, sans-serif",
          "--mono": "var(--font-geist-mono), ui-monospace, 'SF Mono', Menlo, monospace",
          "--serif": "var(--font-instrument-serif), 'Times New Roman', serif",
        } as React.CSSProperties
      }
    >
      <body style={{ fontFamily: "var(--sans)", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
