"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo, I, CompanyDot } from "./components/shared";

const btn = {
  primary: {
    background: "var(--accent)", color: "var(--accent-ink)", border: "none",
    padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
    display: "inline-flex", alignItems: "center", gap: 8, letterSpacing: "-0.005em",
    cursor: "pointer",
  } as React.CSSProperties,
  secondary: {
    background: "transparent", color: "var(--ink)", border: "1px solid var(--line-2)",
    padding: "8px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500,
    display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer",
  } as React.CSSProperties,
};

function LandingNav({ onGoApp }: { onGoApp: () => void }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(10,11,10,0.72)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--line)",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "14px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <Logo />
          <div style={{ display: "flex", gap: 28, fontSize: 13.5, color: "var(--ink-2)" }}>
            {["Product", "How it works", "Pricing", "Customers", "Changelog"].map(l => (
              <a key={l} style={{ cursor: "pointer" }}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a style={{ fontSize: 13.5, color: "var(--ink-2)", cursor: "pointer" }}>Sign in</a>
          <button onClick={onGoApp} style={btn.primary}>
            Open dashboard {I.arrow()}
          </button>
        </div>
      </div>
    </nav>
  );
}

function AgentWidget({ step, logs }: { step: number; logs: { t: string; msg: string; kind: string }[] }) {
  return (
    <div style={{
      background: "var(--bg-2)", border: "1px solid var(--line-2)",
      borderRadius: 16, overflow: "hidden",
      boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(197,240,44,0.08)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 16px", background: "var(--bg-3)", borderBottom: "1px solid var(--line)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 5 }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a3a33", display: "block" }} />)}
          </div>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>
            agent.chillreach.ai/session/0427
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "block" }} />
          <span style={{ fontSize: 11, color: "var(--accent)", fontFamily: "var(--mono)" }}>LIVE</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", minHeight: 420 }}>
        <div style={{ padding: 24, borderRight: "1px solid var(--line)", background: "#0d0f0d" }}>
          <div style={{ background: "white", color: "#111", borderRadius: 8, padding: 24, fontSize: 12, minHeight: 360 }}>
            <div style={{ fontSize: 10, color: "#888", marginBottom: 4, letterSpacing: "0.05em" }}>STRIPE · GREENHOUSE</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 2 }}>Senior Frontend Engineer</div>
            <div style={{ fontSize: 11, color: "#666", marginBottom: 18 }}>San Francisco · Remote OK · Full-time</div>
            {[
              { label: "Full name",           value: "Alex Chen",              filled: step > 2 },
              { label: "Email",               value: "alex@chen.xyz",          filled: step > 2 },
              { label: "Phone",               value: "+1 (415) 555-0129",      filled: step > 2 },
              { label: "Current location",    value: "San Francisco, CA",      filled: step > 3 },
              { label: "Years of experience", value: "7 years",                filled: step > 3 },
              { label: "Resume",              value: "alex-chen-resume.pdf",   filled: step > 4, file: true },
              { label: "Why Stripe?",         value: "I've used Stripe since...", filled: step > 4, ta: true },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: "#666", marginBottom: 3 }}>{f.label}</div>
                <div style={{
                  border: "1px solid #d8d8d8", borderRadius: 4, padding: "6px 10px",
                  height: f.ta ? 40 : 24, display: "flex", alignItems: "center",
                  background: f.filled ? "#f0fbd9" : "#fafafa",
                  fontSize: 11, color: f.filled ? "#1a1a1a" : "#aaa",
                  fontFamily: f.file ? "var(--mono)" : "inherit",
                  position: "relative", overflow: "hidden",
                }}>
                  {f.filled ? f.value : "—"}
                  {f.filled && (
                    <span style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: "#6aa84f" }}>
                      {I.check({ width: 12, height: 12 })}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14 }}>
              <div style={{
                display: "inline-block", padding: "6px 14px", borderRadius: 4,
                background: step > 5 ? "#c5f02c" : "#e0e0e0",
                color: step > 5 ? "#000" : "#888",
                fontSize: 11, fontWeight: 500, transition: "all 0.3s",
              }}>
                {step > 5 ? "✓ Submitted" : "Submit application"}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: 20, fontFamily: "var(--mono)", fontSize: 11.5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, color: "var(--ink-3)" }}>
            {I.sparkle({ style: { color: "var(--accent)" } })}
            <span style={{ fontSize: 10, letterSpacing: "0.08em" }}>AGENT LOG</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {logs.slice(0, Math.min(step + 1, logs.length)).map((l, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "var(--ink-4)", fontSize: 10, marginTop: 1, minWidth: 32 }}>{l.t}</span>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%", marginTop: 5, flexShrink: 0, display: "block",
                  background: l.kind === "ok" ? "var(--accent)" : l.kind === "action" ? "var(--blue)" : "var(--ink-3)",
                }} />
                <span style={{ color: "var(--ink-2)", lineHeight: 1.5 }}>{l.msg}</span>
              </div>
            ))}
            {step < logs.length && (
              <div style={{ display: "flex", gap: 10, alignItems: "center", color: "var(--ink-4)" }}>
                <span style={{ fontSize: 10, minWidth: 32 }}>...</span>
                <span className="dots">▮</span>
              </div>
            )}
          </div>
          <div style={{
            marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--line)",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
          }}>
            <div>
              <div style={{ fontSize: 10, color: "var(--ink-3)", marginBottom: 4 }}>TODAY</div>
              <div style={{ fontSize: 22, fontWeight: 500, fontFamily: "var(--sans)" }}>127</div>
              <div style={{ fontSize: 10, color: "var(--ink-3)" }}>applications sent</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--ink-3)", marginBottom: 4 }}>QUEUE</div>
              <div style={{ fontSize: 22, fontWeight: 500, fontFamily: "var(--sans)" }}>438</div>
              <div style={{ fontSize: 10, color: "var(--ink-3)" }}>jobs remaining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ onGoApp }: { onGoApp: () => void }) {
  const [agentLog, setAgentLog] = useState(0);
  const logs = [
    { t: "0.2s", msg: "Scanning 12,480 open roles", kind: "info" },
    { t: "1.4s", msg: "Matched 47 roles to your profile", kind: "info" },
    { t: "2.1s", msg: "Opening Stripe · Senior Frontend Engineer", kind: "action" },
    { t: "2.8s", msg: "Filling Greenhouse form · 18 fields", kind: "action" },
    { t: "3.6s", msg: "Attached resume.pdf + cover letter", kind: "action" },
    { t: "4.2s", msg: "Submitted — application #0427", kind: "ok" },
    { t: "4.5s", msg: "Next: Vercel · Staff Software Engineer", kind: "action" },
  ];
  useEffect(() => {
    const id = setInterval(() => setAgentLog(i => (i + 1) % (logs.length + 2)), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ padding: "72px 32px 40px", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 30%, transparent 80%)",
        opacity: 0.5,
      }} />
      <div aria-hidden style={{
        position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)",
        width: 900, height: 500, background: "radial-gradient(ellipse, rgba(197,240,44,0.14), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "5px 5px 5px 12px", borderRadius: 999,
          background: "var(--bg-2)", border: "1px solid var(--line-2)",
          fontSize: 12, color: "var(--ink-2)", marginBottom: 28,
        }}>
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>New</span>
          <span>Agent v2 — now 4× faster on Greenhouse & Lever</span>
          <span style={{
            padding: "3px 8px", borderRadius: 999, background: "var(--bg-3)",
            border: "1px solid var(--line-2)", display: "inline-flex", alignItems: "center", gap: 4,
          }}>
            Read more {I.arrow({ style: { width: 10, height: 10 } })}
          </span>
        </div>

        <h1 style={{ fontSize: 80, lineHeight: 0.98, letterSpacing: "-0.035em", margin: "0 0 24px", fontWeight: 500 }}>
          Apply to <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, color: "var(--accent)" }}>hundreds</span> of<br />
          jobs while you sleep.
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 560, margin: "0 0 36px" }}>
          ChillReach is an AI agent that reads job postings, fills every form,
          and sends tailored applications on your behalf — all day, every day.
        </p>
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <button onClick={onGoApp} style={{ ...btn.primary, padding: "12px 20px", fontSize: 14 }}>
            Start applying for free {I.arrow()}
          </button>
          <button style={{ ...btn.secondary, padding: "12px 20px", fontSize: 14 }}>
            {I.play()} Watch 90s demo
          </button>
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 64 }}>
          No credit card · First 10 applications free · Cancel anytime
        </div>
        <AgentWidget step={agentLog} logs={logs} />
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section style={{ padding: "48px 32px", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ fontSize: 12, color: "var(--ink-3)", textAlign: "center", marginBottom: 24, letterSpacing: "0.08em" }}>
          USERS HAVE LANDED INTERVIEWS AT
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32, opacity: 0.7 }}>
          {["Stripe", "Vercel", "Linear", "Anthropic", "Scale", "Ramp", "Notion", "Figma"].map(name => (
            <div key={name} style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, color: "var(--ink-2)", fontWeight: 400 }}>
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Upload your resume", body: "We parse your experience, skills, and preferences into a profile the agent can reference on every application.", tag: "30 seconds" },
    { n: "02", title: "Set your filters", body: "Role, location, salary floor, stage, remote policy. The agent only applies to jobs that match.", tag: "You are in control" },
    { n: "03", title: "Let the agent run", body: "ChillReach scans Greenhouse, Lever, Ashby, and direct career pages — filling forms, writing tailored answers, and submitting.", tag: "While you sleep" },
    { n: "04", title: "Get interviews", body: "Recruiter emails land in your inbox. We track every response so you know what's moving.", tag: "You take it from here" },
  ];
  return (
    <section style={{ padding: "96px 32px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ marginBottom: 56, maxWidth: 640 }}>
          <div style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "0.08em", marginBottom: 16 }}>HOW IT WORKS</div>
          <h2 style={{ fontSize: 48, lineHeight: 1.02, letterSpacing: "-0.03em", margin: "0 0 16px", fontWeight: 500 }}>
            Four steps. No spray-and-pray.
          </h2>
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.5 }}>
            The agent reads every posting and only applies when it&apos;s a fit —
            so recruiters don&apos;t get spam, and you don&apos;t waste credits.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
          {steps.map(s => (
            <div key={s.n} style={{ padding: 28, background: "var(--bg)" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", marginBottom: 40 }}>{s.n}</div>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 10, letterSpacing: "-0.01em" }}>{s.title}</div>
              <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55, marginBottom: 20 }}>{s.body}</div>
              <div style={{ display: "inline-block", padding: "3px 8px", borderRadius: 4, background: "var(--bg-2)", border: "1px solid var(--line-2)", fontSize: 10.5, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{s.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    { n: "2.4M", l: "applications sent" },
    { n: "48hr", l: "avg. time to first response" },
    { n: "11×",  l: "more interviews vs. manual" },
    { n: "97%",  l: "form completion rate" },
  ];
  return (
    <section style={{ padding: "64px 32px", background: "var(--bg-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ borderLeft: "1px solid var(--line-2)", paddingLeft: 24 }}>
            <div style={{ fontSize: 56, fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1, marginBottom: 10 }}>{s.n}</div>
            <div style={{ fontSize: 13, color: "var(--ink-2)" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { title: "Form memory", body: "Answers eligibility, sponsorship, and location questions consistently across every ATS.", icon: "check" },
    { title: "Duplicate detection", body: "Never apply to the same role twice — even if it gets reposted through a different ATS.", icon: "cross" },
    { title: "Smart filters", body: "Salary floor, seniority, visa sponsorship, remote policy. Only apply to what fits.", icon: "filter" },
    { title: "Live agent view", body: "Watch the agent work in real-time, or pause/override anytime.", icon: "play" },
  ];
  return (
    <section style={{ padding: "96px 32px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ marginBottom: 56, maxWidth: 640 }}>
          <div style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "0.08em", marginBottom: 16 }}>FEATURES</div>
          <h2 style={{ fontSize: 48, lineHeight: 1.02, letterSpacing: "-0.03em", margin: 0, fontWeight: 500 }}>Built for the long haul.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
          <div style={{ gridRow: "span 2", padding: 28, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 16, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 8, letterSpacing: "-0.01em" }}>Cover letters that don&apos;t sound like a bot</div>
            <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5, marginBottom: 24 }}>
              Every cover letter references the specific role, team, and company — drawn from your profile, not a template.
            </div>
            <div style={{ flex: 1, padding: 18, background: "var(--bg)", borderRadius: 10, border: "1px solid var(--line)", fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.55, color: "var(--ink-2)", fontStyle: "italic" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-3)", marginBottom: 14, fontStyle: "normal" }}>DRAFT · STRIPE · SR. FRONTEND</div>
              Hi Patrick — I&apos;ve been building on Stripe since 2019, and shipped the<br />
              checkout revamp at Linear last year that cut drop-off by 38%.<br /><br />
              I&apos;m especially interested in the payments team&apos;s work on adaptive<br />
              3DS, because <span style={{ background: "rgba(197,240,44,0.15)", fontStyle: "normal", color: "var(--accent)" }}>[from your last blog post about false-decline rates]</span>…
            </div>
          </div>
          {feats.map((f, i) => (
            <div key={i} style={{ padding: 24, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 16 }}>
              <div style={{ color: "var(--accent)", marginBottom: 14 }}>{I[f.icon]()}</div>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6, letterSpacing: "-0.005em" }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>{f.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  const ats = [
    { name: "Greenhouse", color: "#a1f0c4" }, { name: "Lever", color: "#c5f02c" },
    { name: "Ashby", color: "#c9b4ff" }, { name: "Workday", color: "#8ab6ff" },
    { name: "Bamboo", color: "#ffbc5a" }, { name: "Teamtailor", color: "#ff9d6b" },
    { name: "SmartR.", color: "#ff7a85" }, { name: "Gem", color: "#e5fa8a" },
  ];
  return (
    <section style={{ padding: "80px 32px", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "0.08em", marginBottom: 16 }}>INTEGRATIONS</div>
          <h2 style={{ fontSize: 40, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 16px", fontWeight: 500 }}>
            Works with every ATS you&apos;ve ever sworn at.
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>
            Greenhouse. Lever. Ashby. Workday. That one company that still uses a weird iframe from 2014. The agent handles them all.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--line)", border: "1px solid var(--line)", borderRadius: 12, overflow: "hidden" }}>
          {ats.map(a => (
            <div key={a.name} style={{ background: "var(--bg)", padding: "28px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: a.color, display: "grid", placeItems: "center", color: "var(--bg)", fontWeight: 700, fontSize: 16 }}>{a.name[0]}</div>
              <div style={{ fontSize: 12, color: "var(--ink-2)" }}>{a.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section style={{ padding: "96px 32px", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "0.08em", marginBottom: 24 }}>FROM THE TRENCHES</div>
        <blockquote style={{ margin: 0, fontSize: 36, lineHeight: 1.2, letterSpacing: "-0.02em", fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, color: "var(--ink)" }}>
          &ldquo;I sent 2 applications a day for three months and got nowhere.
          Three weeks on ChillReach and I had four onsites lined up.
          I got my offer the day my last manual app got its first rejection.&rdquo;
        </blockquote>
        <div style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #c5f02c, #8ab6ff)" }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Maya Patel</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Now Staff Engineer at Ramp · Previously 9 mo. job-hunting</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing({ onGoApp }: { onGoApp: () => void }) {
  const plans = [
    { name: "Casual", price: "$0", sub: "forever", apps: "10 applications / month", feats: ["Smart filters", "Agent dashboard", "Basic cover letters"], cta: "Start free", hi: false },
    { name: "Serious", price: "$29", sub: "per month", apps: "300 applications / month", feats: ["Everything in Casual", "Tailored cover letters", "Priority queue", "Interview tracking"], cta: "Get serious", hi: true },
    { name: "Desperate", price: "$79", sub: "per month", apps: "Unlimited applications", feats: ["Everything in Serious", "Multiple profiles", "API access", "Human-reviewed letters"], cta: "Go unlimited", hi: false },
  ];
  return (
    <section style={{ padding: "96px 32px", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "0.08em", marginBottom: 16 }}>PRICING</div>
          <h2 style={{ fontSize: 48, lineHeight: 1.02, letterSpacing: "-0.03em", margin: "0 0 14px", fontWeight: 500 }}>Priced by your urgency.</h2>
          <p style={{ fontSize: 16, color: "var(--ink-2)", margin: 0 }}>Cancel anytime. Unused applications roll over.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {plans.map(p => (
            <div key={p.name} style={{
              padding: 28, borderRadius: 16, background: "var(--bg-2)",
              border: p.hi ? "1px solid var(--accent)" : "1px solid var(--line-2)",
              position: "relative",
              boxShadow: p.hi ? "0 0 0 4px rgba(197,240,44,0.08)" : "none",
            }}>
              {p.hi && <div style={{ position: "absolute", top: -10, left: 28, background: "var(--accent)", color: "var(--accent-ink)", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.05em" }}>MOST POPULAR</div>}
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 20 }}>{p.apps}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                <span style={{ fontSize: 48, fontWeight: 500, letterSpacing: "-0.03em" }}>{p.price}</span>
                <span style={{ fontSize: 13, color: "var(--ink-3)" }}>{p.sub}</span>
              </div>
              <button onClick={onGoApp} style={{
                width: "100%", padding: "10px 14px", borderRadius: 8, cursor: "pointer",
                background: p.hi ? "var(--accent)" : "transparent",
                color: p.hi ? "var(--accent-ink)" : "var(--ink)",
                border: p.hi ? "none" : "1px solid var(--line-2)",
                fontSize: 13, fontWeight: 600, marginBottom: 24,
              }}>{p.cta}</button>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {p.feats.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--ink-2)" }}>
                    <span style={{ color: "var(--accent)" }}>{I.check()}</span>{f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "transparent", border: "none", color: "var(--ink)", textAlign: "left",
        fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", cursor: "pointer",
      }}>
        {q}
        <span style={{
          width: 22, height: 22, borderRadius: "50%",
          background: open ? "var(--accent)" : "var(--bg-2)",
          color: open ? "var(--accent-ink)" : "var(--ink-2)",
          display: "grid", placeItems: "center",
          transform: open ? "rotate(45deg)" : "none", transition: "all .2s",
          flexShrink: 0,
        }}>{I.plus()}</span>
      </button>
      {open && <div style={{ paddingBottom: 22, fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: 680 }}>{a}</div>}
    </div>
  );
}

function FAQ() {
  const qs = [
    { q: "Will recruiters know it was AI?", a: "No. The agent writes tailored, natural answers using your profile — not a template. You can review drafts before they go out, or enable autopilot." },
    { q: "Is this against ATS terms of service?", a: "ChillReach acts as your user-agent, filling forms you are legitimately eligible to submit. We rate-limit per company to never cross into spam territory." },
    { q: "Can I apply to specific jobs manually too?", a: "Yes — drop any job URL into the dashboard and the agent will prep a tailored application for your review." },
    { q: "What about cover letter quality?", a: "Every letter references the specific role, team, and company. On Serious and Desperate tiers, we pull from your past writing samples to match your voice." },
    { q: "Can I pause the agent?", a: "Anytime. Your queue pauses instantly and resumes when you say so." },
  ];
  return (
    <section style={{ padding: "96px 32px", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ fontSize: 40, letterSpacing: "-0.03em", margin: "0 0 40px", fontWeight: 500 }}>Questions.</h2>
        <div style={{ borderTop: "1px solid var(--line)" }}>
          {qs.map((q, i) => <FAQItem key={i} {...q} />)}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onGoApp }: { onGoApp: () => void }) {
  return (
    <section style={{ padding: "120px 32px", borderTop: "1px solid var(--line)", background: "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(197,240,44,0.12), transparent 70%)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: 72, lineHeight: 0.98, letterSpacing: "-0.035em", margin: "0 0 20px", fontWeight: 500 }}>
          Stop refreshing LinkedIn.<br />
          <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, color: "var(--accent)" }}>Start chilling.</span>
        </h2>
        <p style={{ fontSize: 18, color: "var(--ink-2)", margin: "0 0 36px" }}>Your first 10 applications are on us.</p>
        <button onClick={onGoApp} style={{ ...btn.primary, padding: "14px 24px", fontSize: 15 }}>
          Open dashboard {I.arrow()}
        </button>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h: "Product",   i: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap"] },
    { h: "Company",   i: ["About", "Careers", "Blog", "Contact"] },
    { h: "Resources", i: ["Help center", "Interview prep", "Templates", "API docs"] },
    { h: "Legal",     i: ["Privacy", "Terms", "Security", "DPA"] },
  ];
  return (
    <footer style={{ padding: "56px 32px 28px", borderTop: "1px solid var(--line)", background: "var(--bg-2)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
        <div>
          <Logo />
          <div style={{ marginTop: 16, fontSize: 13, color: "var(--ink-3)", maxWidth: 280, lineHeight: 1.5 }}>
            The laid-back way to run an aggressive job search.
          </div>
        </div>
        {cols.map(c => (
          <div key={c.h}>
            <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", marginBottom: 14 }}>{c.h.toUpperCase()}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {c.i.map(x => <a key={x} style={{ fontSize: 13, color: "var(--ink-2)", cursor: "pointer" }}>{x}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1120, margin: "0 auto", paddingTop: 24, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-3)" }}>
        <div>© 2026 ChillReach Labs · Made with a healthy disrespect for ATS forms.</div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Twitter", "LinkedIn", "GitHub"].map(s => <a key={s} style={{ cursor: "pointer" }}>{s}</a>)}
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const goApp = () => router.push("/dashboard");
  return (
    <div>
      <LandingNav onGoApp={goApp} />
      <Hero onGoApp={goApp} />
      <SocialProof />
      <HowItWorks />
      <StatsBand />
      <Features />
      <Integrations />
      <Testimonial />
      <Pricing onGoApp={goApp} />
      <FAQ />
      <FinalCTA onGoApp={goApp} />
      <Footer />
    </div>
  );
}
