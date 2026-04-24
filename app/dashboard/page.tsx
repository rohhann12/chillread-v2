"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo, I, CompanyDot } from "../components/shared";

const card: React.CSSProperties = {
  background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10, overflow: "hidden",
};

const dashBtn = {
  primary: { padding: "7px 12px", background: "var(--accent)", color: "var(--accent-ink)", border: "none", borderRadius: 7, fontSize: 12.5, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" } as React.CSSProperties,
  ghost: { padding: "7px 12px", background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 7, fontSize: 12.5, display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" } as React.CSSProperties,
};

const QUEUE = [
  { co: "Stripe",    role: "Senior Frontend Engineer",         loc: "San Francisco · Remote", ats: "Greenhouse", salary: "$210–260k", match: 94, status: "applying", color: "#8ab6ff" },
  { co: "Vercel",    role: "Staff Software Engineer",          loc: "Remote · US",            ats: "Ashby",      salary: "$240–300k", match: 91, status: "queued",   color: "#f1f1e8" },
  { co: "Linear",    role: "Product Engineer",                 loc: "Remote · Worldwide",     ats: "Ashby",      salary: "$180–220k", match: 88, status: "queued",   color: "#c9b4ff" },
  { co: "Ramp",      role: "Senior Full-Stack Engineer",       loc: "New York",               ats: "Lever",      salary: "$200–250k", match: 86, status: "queued",   color: "#e5fa8a" },
  { co: "Anthropic", role: "Frontend Engineer, Growth",        loc: "San Francisco",          ats: "Greenhouse", salary: "$220–280k", match: 83, status: "queued",   color: "#d4a373" },
  { co: "Figma",     role: "Senior Software Engineer, Editor", loc: "San Francisco · NYC",    ats: "Greenhouse", salary: "$230–290k", match: 81, status: "queued",   color: "#ff9d6b" },
  { co: "Notion",    role: "Product Engineer, AI",             loc: "San Francisco · Remote", ats: "Greenhouse", salary: "$200–260k", match: 79, status: "review",   color: "#e9e4da" },
  { co: "Cursor",    role: "Founding Engineer, Web",           loc: "San Francisco",          ats: "Ashby",      salary: "$250–350k", match: 77, status: "review",   color: "#ffffff" },
  { co: "Mercury",   role: "Senior Frontend Engineer",         loc: "Remote · US / Canada",   ats: "Greenhouse", salary: "$190–240k", match: 75, status: "queued",   color: "#c5f02c" },
];

const PIPELINE = [
  { stage: "Applied",   n: 428, trend: "+37 today",    color: "var(--ink-2)" },
  { stage: "Screening", n: 42,  trend: "+6 this week", color: "var(--blue)" },
  { stage: "Interview", n: 11,  trend: "+2 this week", color: "var(--accent)" },
  { stage: "Offer",     n: 2,   trend: "1 pending",    color: "var(--warn)" },
];

const ACTIVITY: { t: string; ico: string; c: string; txt: React.ReactNode }[] = [
  { t: "2m ago",  ico: "check", c: "var(--ok)",     txt: <><b>Submitted</b> application to <b>Stripe</b> · Senior Frontend Engineer</> },
  { t: "8m ago",  ico: "inbox", c: "var(--accent)", txt: <><b>Ramp</b> recruiter replied · &ldquo;Love to chat next week&rdquo;</> },
  { t: "14m ago", ico: "check", c: "var(--ok)",     txt: <><b>Submitted</b> application to <b>Linear</b> · Product Engineer</> },
  { t: "27m ago", ico: "user",  c: "var(--blue)",   txt: <>Drafted tailored cover letter for <b>Notion · AI team</b></> },
  { t: "41m ago", ico: "check", c: "var(--ok)",     txt: <><b>Submitted</b> application to <b>Vercel</b></> },
  { t: "1h ago",  ico: "cross", c: "var(--ink-3)",  txt: <>Skipped <b>Meta · E5</b> · below salary floor ($180k)</> },
  { t: "1h ago",  ico: "check", c: "var(--ok)",     txt: <><b>Submitted</b> application to <b>Anthropic</b> · Growth FE</> },
  { t: "2h ago",  ico: "inbox", c: "var(--accent)", txt: <><b>Scale AI</b> moved you to <b>Technical Screen</b></> },
  { t: "2h ago",  ico: "check", c: "var(--ok)",     txt: <><b>Submitted</b> application to <b>Figma</b></> },
  { t: "3h ago",  ico: "cross", c: "var(--ink-3)",  txt: <>Skipped <b>Airbnb · Jr Engineer</b> · below seniority floor</> },
];

const TOOL_TRACE = [
  { t: "00:00.2", tool: "dedupe.check",         args: { company: "Stripe", role: "Senior Frontend Engineer" }, out: "not_applied",                           ms: 142,  status: "ok" },
  { t: "00:00.4", tool: "role.classify",        args: { posting_id: "gh_48291" },                              out: { level: "Senior", stack: ["React","TS"], remote: true }, ms: 380, status: "ok" },
  { t: "00:01.1", tool: "salary.lookup",        args: { floor_usd: 180000 },                                   out: { posted: "$210–260k", passes: true },    ms: 210,  status: "ok" },
  { t: "00:01.5", tool: "profile.lookup",       args: { fields: ["name","email","phone","location","yoe"] },   out: "7 fields",                              ms: 88,   status: "ok" },
  { t: "00:02.1", tool: "resume.parse",         args: { file: "alex-chen-resume.pdf" },                        out: { pages: 2, roles: 4 },                  ms: 560,  status: "ok" },
  { t: "00:03.2", tool: "company.research",     args: { company: "Stripe" },                                   out: { blogs: 3, news: 7 },                   ms: 1420, status: "ok" },
  { t: "00:05.8", tool: "captcha.solve",        args: { type: "hCaptcha" },                                    out: "token_p2c4f...",                         ms: 2780, status: "ok" },
  { t: "00:09.4", tool: "otp.fetch",            args: { channel: "email" },                                    out: "427193",                                ms: 3240, status: "ok" },
  { t: "00:14.1", tool: "coverletter.generate", args: { company: "Stripe", voice: "confident" },               out: "147 words",                             ms: 4120, status: "running" },
  { t: "—",       tool: "answer.generate",      args: { field: "Why Stripe?" },                                out: null,                                    ms: null, status: "queued" },
  { t: "—",       tool: "form.submit",          args: { ats: "Greenhouse" },                                   out: null,                                    ms: null, status: "queued" },
];

const TOOL_COLORS: Record<string, string> = {
  "dedupe.check": "var(--ink-2)", "role.classify": "var(--iris)", "salary.lookup": "var(--ink-2)",
  "profile.lookup": "var(--blue)", "resume.parse": "var(--blue)", "company.research": "var(--iris)",
  "captcha.solve": "var(--warn)", "otp.fetch": "var(--warn)", "coverletter.generate": "var(--accent)",
  "answer.generate": "var(--accent)", "form.submit": "var(--ok)",
};

const TOOL_CONFIGS = [
  { group: "Authentication & Verification", desc: "Tools that help the agent get past login gates, OTPs, and captcha walls.", tools: [
    { id: "otp.fetch", name: "OTP Fetcher", enabled: true, desc: "Reads 6-digit verification codes from your email & SMS, injects into forms automatically.", provider: "Gmail · IMAP", conn: "alex@chen.xyz", calls: 127, fails: 2, fields: [
      { k: "channels", l: "Channels",       v: ["email","sms"], t: "multi",  opts: ["email","sms","authenticator"] },
      { k: "ttl",      l: "Code TTL",       v: 120,             t: "number", unit: "s" },
      { k: "senders",  l: "Trusted senders",v: "noreply@*",     t: "text" },
    ]},
    { id: "email.poll", name: "Email Watcher", enabled: true, desc: "Watches your inbox for recruiter replies and updates your pipeline in real-time.", provider: "Gmail", conn: "alex@chen.xyz", calls: 842, fails: 0, fields: [
      { k: "interval", l: "Poll interval", v: 60,                     t: "number", unit: "s" },
      { k: "labels",   l: "Apply label",   v: "chillreach/tracked",   t: "text" },
    ]},
    { id: "captcha.solve", name: "Captcha Solver", enabled: true, desc: "Resolves hCaptcha, reCAPTCHA, and Cloudflare Turnstile challenges.", provider: "2Captcha", conn: "sk_live_•••4a2f", calls: 64, fails: 1, fields: [
      { k: "provider", l: "Provider", v: "2captcha", t: "select", opts: ["2captcha","anti-captcha","capsolver"] },
      { k: "timeout",  l: "Timeout",  v: 90,         t: "number", unit: "s" },
    ]},
  ]},
  { group: "Profile & Data", desc: "Tools that pull from your stored profile to fill forms consistently.", tools: [
    { id: "resume.parse", name: "Resume Parser", enabled: true, desc: "Extracts structured data from your resume PDF on each use.", provider: "Built-in", conn: "alex-chen-resume.pdf · v4", calls: 428, fails: 0, fields: [
      { k: "model",  l: "Model",            v: "haiku-4.5", t: "select", opts: ["haiku-4.5","sonnet-4.5","opus-4"] },
      { k: "rescan", l: "Re-scan on upload",v: true,        t: "toggle" },
    ]},
    { id: "profile.lookup", name: "Profile Store", enabled: true, desc: "Canonical answers for common ATS fields (location, visa, salary expectations).", provider: "Built-in", conn: "34 stored fields", calls: 3120, fails: 0, fields: [
      { k: "strict", l: "Strict match only", v: false, t: "toggle" },
    ]},
  ]},
  { group: "Writing & Generation", desc: "Tools the agent calls to draft tailored, non-templated text.", tools: [
    { id: "coverletter.generate", name: "Cover Letter Writer", enabled: true, desc: "Drafts a unique cover letter per role, grounded in your profile and company research.", provider: "Claude Sonnet 4.5", conn: "voice: confident, concise", calls: 428, fails: 3, fields: [
      { k: "voice",    l: "Voice",                   v: "confident", t: "select", opts: ["confident","casual","formal","enthusiastic"] },
      { k: "maxWords", l: "Max length",              v: 180,         t: "number", unit: "w" },
      { k: "review",   l: "Human review before send",v: false,       t: "toggle" },
    ]},
    { id: "answer.generate", name: "Answer Drafter", enabled: true, desc: "Answers long-form application questions.", provider: "Claude Sonnet 4.5", conn: "samples: 12 past answers", calls: 612, fails: 1, fields: [
      { k: "maxWords", l: "Max length per answer", v: 150, t: "number", unit: "w" },
      { k: "cite",     l: "Cite resume projects",  v: true, t: "toggle" },
    ]},
  ]},
  { group: "Safety Rails", desc: "Never-apply rules the agent respects on every run.", tools: [
    { id: "dedupe.check", name: "Dedupe Check", enabled: true, desc: "Prevents applying twice — even across different ATS reposts.", provider: "Built-in", conn: "428 applications indexed", calls: 612, fails: 0, fields: [
      { k: "window", l: "Dedupe window", v: 90, t: "number", unit: "d" },
    ]},
    { id: "salary.lookup", name: "Salary Floor", enabled: true, desc: "Rejects postings below your floor before any application starts.", provider: "Built-in", conn: "floor: $180k", calls: 612, fails: 0, fields: [
      { k: "floor",   l: "Salary floor",      v: 180000,  t: "number", unit: "$" },
      { k: "missing", l: "If salary missing", v: "apply", t: "select", opts: ["apply","review","skip"] },
    ]},
  ]},
  { group: "Submission", desc: "The final step — disabled by default for safety, enable for autopilot.", tools: [
    { id: "form.submit", name: "Form Submitter", enabled: true, desc: "Clicks Submit and captures the confirmation page.", provider: "Built-in", conn: "autopilot ON", calls: 428, fails: 2, fields: [
      { k: "autopilot",  l: "Autopilot (submit without review)", v: true, t: "toggle" },
      { k: "screenshot", l: "Screenshot confirmation",           v: true, t: "toggle" },
      { k: "ratelimit",  l: "Max per company per day",           v: 1,    t: "number" },
    ]},
  ]},
];

// ── Shared sub-components ────────────────────────────────────────────────────
function CardHeader({ title, sub, action }: { title: string; sub?: string; action?: string }) {
  return (
    <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{title}</span>
        {sub && <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{sub}</span>}
      </div>
      {action && (
        <button style={{ fontSize: 11, color: "var(--ink-2)", background: "transparent", border: "none", display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
          {action} {I.arrow({ width: 10, height: 10 })}
        </button>
      )}
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const map: Record<string, { c: string; bg: string; l: string }> = {
    applying: { c: "var(--accent)", bg: "rgba(197,240,44,0.12)", l: "Applying" },
    queued:   { c: "var(--ink-3)",  bg: "var(--bg-3)",           l: "Queued" },
    review:   { c: "var(--warn)",   bg: "rgba(255,188,90,0.12)", l: "Review" },
  };
  const s = map[status] || map.queued;
  return (
    <span style={{ padding: "2px 7px", borderRadius: 4, fontSize: 10, background: s.bg, color: s.c, fontFamily: "var(--mono)", textAlign: "center", letterSpacing: "0.03em" }}>{s.l}</span>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 84, h = 28;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => [i / (data.length - 1) * w, h - ((v - min) / (max - min || 1)) * (h - 4) - 2] as [number, number]);
  const d = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const area = d + ` L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <path d={area} fill="var(--accent)" opacity="0.12" />
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2" fill="var(--accent)" />
    </svg>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ view, onView }: { view: string; onView: (v: string) => void }) {
  const items = [
    { id: "overview",     label: "Overview",     icon: "bar" },
    { id: "queue",        label: "Queue",        icon: "briefcase", badge: 438 },
    { id: "live",         label: "Live agent",   icon: "sparkle",   live: true },
    { id: "inbox",        label: "Inbox",        icon: "inbox",     badge: 12 },
    { id: "pipeline",     label: "Pipeline",     icon: "filter" },
    { id: "tools",        label: "Agent tools",  icon: "settings",  badge: 12 },
    { id: "profile",      label: "Profile",      icon: "user" },
    { id: "integrations", label: "Integrations", icon: "bolt" },
  ];
  return (
    <aside style={{ width: 232, background: "var(--bg-2)", borderRight: "1px solid var(--line)", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0 }}>
      <div style={{ padding: "18px 18px 14px", borderBottom: "1px solid var(--line)" }}>
        <Logo />
      </div>
      <div style={{ padding: "14px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.08em", padding: "8px 10px 6px" }}>WORKSPACE</div>
        {items.map(it => {
          const active = view === it.id;
          return (
            <button key={it.id} onClick={() => onView(it.id)} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "7px 10px", borderRadius: 7,
              background: active ? "var(--bg-3)" : "transparent",
              color: active ? "var(--ink)" : "var(--ink-2)",
              border: "none", textAlign: "left", fontSize: 13, fontWeight: active ? 500 : 400, cursor: "pointer",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: active ? "var(--accent)" : "var(--ink-3)" }}>{I[it.icon]?.()}</span>
                {it.label}
              </span>
              {it.badge != null && (
                <span style={{ fontSize: 10.5, padding: "1px 6px", borderRadius: 999, background: "var(--bg-3)", border: "1px solid var(--line-2)", color: "var(--ink-3)" }}>{it.badge}</span>
              )}
              {it.live && <span className="pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "block" }} />}
            </button>
          );
        })}
      </div>
      <div style={{ margin: "auto 12px 12px", padding: 14, background: "var(--bg-3)", border: "1px solid var(--line-2)", borderRadius: 10 }}>
        <div style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 6 }}>Monthly credits</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 500 }}>183</span>
          <span style={{ fontSize: 11, color: "var(--ink-3)" }}>/ 300</span>
        </div>
        <div style={{ height: 4, background: "var(--bg)", borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ width: "61%", height: "100%", background: "var(--accent)" }} />
        </div>
        <button style={{ width: "100%", padding: "6px 10px", fontSize: 11.5, fontWeight: 500, background: "transparent", color: "var(--ink)", border: "1px solid var(--line-2)", borderRadius: 6, cursor: "pointer" }}>Upgrade plan</button>
      </div>
      <div style={{ padding: "12px 14px", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#c5f02c,#8ab6ff)", flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 500 }}>Alex Chen</div>
          <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Serious plan</div>
        </div>
        <button style={{ background: "transparent", border: "none", color: "var(--ink-3)", padding: 4, cursor: "pointer" }}>{I.dots()}</button>
      </div>
    </aside>
  );
}

// ── TopBar ───────────────────────────────────────────────────────────────────
function TopBar({ agentOn, setAgentOn, onGoLanding }: { agentOn: boolean; setAgentOn: (v: boolean) => void; onGoLanding: () => void }) {
  return (
    <div style={{ height: 56, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--line)", background: "var(--bg)", position: "sticky", top: 0, zIndex: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 12px", borderRadius: 7, background: agentOn ? "rgba(197,240,44,0.08)" : "var(--bg-2)", border: agentOn ? "1px solid rgba(197,240,44,0.3)" : "1px solid var(--line-2)" }}>
          <span className={agentOn ? "pulse" : ""} style={{ width: 7, height: 7, borderRadius: "50%", background: agentOn ? "var(--accent)" : "var(--ink-3)", display: "block" }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: agentOn ? "var(--accent)" : "var(--ink-3)" }}>{agentOn ? "Agent running" : "Agent paused"}</span>
          <button onClick={() => setAgentOn(!agentOn)} style={{ marginLeft: 4, padding: "3px 8px", fontSize: 11, borderRadius: 5, background: "var(--bg)", border: "1px solid var(--line-2)", color: "var(--ink-2)", display: "inline-flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
            {agentOn ? <>{I.pause()} Pause</> : <>{I.play()} Start</>}
          </button>
        </div>
        <div style={{ fontSize: 11.5, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>session · 04h 27m</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 7, width: 280 }}>
          {I.search({ style: { color: "var(--ink-3)" } })}
          <input placeholder="Search jobs, companies, applications..." style={{ background: "transparent", border: "none", outline: "none", color: "var(--ink)", fontSize: 12.5, flex: 1, fontFamily: "inherit" }} />
          <kbd style={{ fontSize: 10, color: "var(--ink-3)", padding: "1px 5px", background: "var(--bg)", border: "1px solid var(--line-2)", borderRadius: 3 }}>⌘K</kbd>
        </div>
        <button onClick={onGoLanding} style={{ padding: "7px 10px", fontSize: 12, background: "transparent", border: "1px solid var(--line-2)", borderRadius: 7, color: "var(--ink-2)", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          {I.external()} View site
        </button>
        <button style={{ padding: "7px 10px", background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 7, color: "var(--ink-2)", position: "relative", cursor: "pointer" }}>
          {I.bell()}
          <span style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "block" }} />
        </button>
      </div>
    </div>
  );
}

// ── Overview ─────────────────────────────────────────────────────────────────
function OverviewView({ agentOn }: { agentOn: boolean }) {
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", marginBottom: 6 }}>GOOD MORNING, ALEX</div>
          <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 500 }}>
            You&apos;ve sent <span style={{ color: "var(--accent)" }}>37</span> applications today.
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...dashBtn.ghost, color: "var(--ink-2)" }}>{I.filter()} Last 7 days</button>
          <button style={dashBtn.primary}>{I.plus()} Add job URL</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { l: "Applied",              n: 428,    d: "+37 today",             spark: [4,7,5,9,6,11,8,12,10,15,13,18] },
          { l: "Response rate",        n: "9.8%", d: "vs 2.1% industry avg",  spark: [5,6,5,7,8,9,8,10,9,11,10,10] },
          { l: "Interviews booked",    n: 11,     d: "+2 this week",           spark: [1,1,2,2,3,4,4,5,6,7,9,11] },
          { l: "Avg. time to response",n: "48h",  d: "−12h vs last month",     spark: [10,9,8,9,8,7,8,6,7,5,6,4] },
        ].map((k, i) => (
          <div key={i} style={{ padding: 18, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10 }}>
            <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginBottom: 8 }}>{k.l}</div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 6 }}>{k.n}</div>
                <div style={{ fontSize: 11, color: "var(--accent)", fontFamily: "var(--mono)" }}>↑ {k.d}</div>
              </div>
              <Sparkline data={k.spark} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
        <PipelineCard />
        <LiveAgentCard agentOn={agentOn} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
        <QueueCard />
        <ActivityCard />
      </div>
    </div>
  );
}

function PipelineCard() {
  return (
    <div style={card}>
      <CardHeader title="Pipeline" sub="This month" action="View all" />
      <div style={{ padding: "8px 18px 18px" }}>
        <div style={{ display: "flex", gap: 1, background: "var(--line)", borderRadius: 8, overflow: "hidden", marginBottom: 18 }}>
          {PIPELINE.map(p => (
            <div key={p.stage} style={{ flex: 1, background: "var(--bg-2)", padding: 16 }}>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 8 }}>{p.stage}</div>
              <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.025em", color: p.color, marginBottom: 6 }}>{p.n}</div>
              <div style={{ fontSize: 10.5, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{p.trend}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 10 }}>Applications per day · last 14 days</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80 }}>
          {[12,18,14,22,26,8,4,19,31,28,35,41,38,37].map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ height: `${(v / 45) * 100}%`, background: i === 13 ? "var(--accent)" : "var(--line-2)", borderRadius: "3px 3px 0 0" }} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 9.5, color: "var(--ink-4)", fontFamily: "var(--mono)" }}>
          <span>Apr 11</span><span>Apr 18</span><span>Apr 24</span>
        </div>
      </div>
    </div>
  );
}

function LiveAgentCard({ agentOn }: { agentOn: boolean }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!agentOn) return;
    const id = setInterval(() => setTick(t => t + 1), 1200);
    return () => clearInterval(id);
  }, [agentOn]);
  const steps = [
    { t: "Parsed role",    s: "Stripe · Senior Frontend Engineer" },
    { t: "Matched profile",s: "7 years · React · Payments exp." },
    { t: "Filling form",   s: "18/24 fields · Greenhouse" },
    { t: "Drafting answer",s: "\"Why Stripe?\" · 147 words" },
    { t: "Submitting",     s: "application #0428" },
  ];
  const active = agentOn ? tick % (steps.length + 1) : 0;
  return (
    <div style={card}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className={agentOn ? "pulse" : ""} style={{ width: 8, height: 8, borderRadius: "50%", background: agentOn ? "var(--accent)" : "var(--ink-4)", display: "block" }} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>Live agent</span>
          <span style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{agentOn ? "working on #0428" : "idle"}</span>
        </div>
        <button style={{ fontSize: 11, background: "transparent", border: "none", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>Full view {I.external()}</button>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "var(--bg-3)", borderRadius: 8, marginBottom: 14 }}>
          <CompanyDot name="Stripe" color="#8ab6ff" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, marginBottom: 2 }}>Senior Frontend Engineer</div>
            <div style={{ fontSize: 11, color: "var(--ink-3)" }}>Stripe · San Francisco · $210–260k</div>
          </div>
          <div style={{ fontSize: 11, color: "var(--accent)", fontFamily: "var(--mono)" }}>94%</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {steps.map((s, i) => {
            const state = i < active ? "done" : i === active ? "active" : "pending";
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: state === "done" ? "var(--accent)" : state === "active" ? "rgba(197,240,44,0.15)" : "var(--bg-3)", border: state === "active" ? "1px solid var(--accent)" : "1px solid var(--line-2)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                  {state === "done" && I.check({ width: 10, height: 10, color: "var(--accent-ink)" })}
                  {state === "active" && <span className="pulse" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "block" }} />}
                </span>
                <div style={{ flex: 1, display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 12.5, color: state === "pending" ? "var(--ink-4)" : "var(--ink)" }}>{s.t}</span>
                  <span style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{s.s}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function QueueCard() {
  return (
    <div style={card}>
      <CardHeader title="Up next in queue" sub="438 jobs matched" action="View queue" />
      {QUEUE.slice(0, 6).map((j, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "32px 2.5fr 1.3fr 1fr 1fr 56px", alignItems: "center", gap: 12, padding: "12px 18px", borderTop: "1px solid var(--line)", fontSize: 12.5 }}>
          <CompanyDot name={j.co} color={j.color} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 500, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{j.role}</div>
            <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{j.co} · {j.loc}</div>
          </div>
          <div style={{ fontSize: 11, color: "var(--ink-2)" }}>{j.salary}</div>
          <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{j.ats}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ flex: 1, height: 4, background: "var(--bg-3)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${j.match}%`, height: "100%", background: "var(--accent)" }} />
            </div>
            <span style={{ fontSize: 10.5, color: "var(--ink-2)", fontFamily: "var(--mono)" }}>{j.match}</span>
          </div>
          <StatusChip status={j.status} />
        </div>
      ))}
    </div>
  );
}

function ActivityCard() {
  return (
    <div style={card}>
      <CardHeader title="Activity" sub="Live feed" action="Open log" />
      <div style={{ padding: "4px 18px 18px" }}>
        {ACTIVITY.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: i < ACTIVITY.length - 1 ? "1px solid var(--line)" : "none" }}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--bg-3)", border: "1px solid var(--line-2)", display: "grid", placeItems: "center", color: a.c, flexShrink: 0, marginTop: 1 }}>
              {I[a.ico]?.({ width: 11, height: 11 })}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.4 }}>{a.txt}</div>
              <div style={{ fontSize: 10.5, color: "var(--ink-4)", fontFamily: "var(--mono)", marginTop: 2 }}>{a.t}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Queue View ────────────────────────────────────────────────────────────────
function QueueView() {
  const [tab, setTab] = useState("queued");
  const tabs = [{ id: "queued", l: "Queued", n: 438 }, { id: "review", l: "Review", n: 12 }, { id: "applied", l: "Applied", n: 428 }, { id: "skipped", l: "Skipped", n: 89 }];
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", marginBottom: 6 }}>QUEUE</div>
        <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 500 }}>438 jobs, ranked by match</h1>
      </div>
      <div style={{ display: "flex", gap: 2, marginBottom: 16, padding: 3, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 8, width: "fit-content" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "6px 12px", fontSize: 12, fontWeight: 500, borderRadius: 6, border: "none", background: tab === t.id ? "var(--bg-3)" : "transparent", color: tab === t.id ? "var(--ink)" : "var(--ink-3)", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            {t.l} <span style={{ fontSize: 10, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{t.n}</span>
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        {["Role: Frontend", "Location: Remote, SF, NYC", "Salary: $180k+", "Seniority: Senior+"].map(f => (
          <div key={f} style={{ padding: "5px 10px", background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 6, fontSize: 11.5, color: "var(--ink-2)", display: "inline-flex", alignItems: "center", gap: 6 }}>
            {f} <span style={{ color: "var(--ink-4)", cursor: "pointer" }}>{I.cross({ width: 10, height: 10 })}</span>
          </div>
        ))}
        <button style={{ padding: "5px 10px", background: "transparent", border: "1px dashed var(--line-2)", borderRadius: 6, color: "var(--ink-3)", fontSize: 11.5, display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
          {I.plus()} Add filter
        </button>
      </div>
      <div style={card}>
        <div style={{ display: "grid", gridTemplateColumns: "32px 2.5fr 1.4fr 1fr 1fr 1fr 56px 40px", gap: 12, padding: "10px 18px", fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.06em", borderBottom: "1px solid var(--line)", background: "var(--bg-3)" }}>
          <span /><span>ROLE</span><span>LOCATION</span><span>SALARY</span><span>ATS</span><span>MATCH</span><span>STATUS</span><span />
        </div>
        {QUEUE.map((j, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "32px 2.5fr 1.4fr 1fr 1fr 1fr 56px 40px", alignItems: "center", gap: 12, padding: "12px 18px", borderTop: i === 0 ? "none" : "1px solid var(--line)", fontSize: 12.5 }}>
            <CompanyDot name={j.co} color={j.color} />
            <div><div style={{ fontWeight: 500, marginBottom: 2 }}>{j.role}</div><div style={{ fontSize: 11, color: "var(--ink-3)" }}>{j.co}</div></div>
            <div style={{ fontSize: 12, color: "var(--ink-2)" }}>{j.loc}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-2)" }}>{j.salary}</div>
            <div style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{j.ats}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ flex: 1, height: 4, background: "var(--bg-3)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${j.match}%`, height: "100%", background: "var(--accent)" }} />
              </div>
              <span style={{ fontSize: 10.5, color: "var(--ink-2)", fontFamily: "var(--mono)" }}>{j.match}</span>
            </div>
            <StatusChip status={j.status} />
            <button style={{ background: "transparent", border: "none", color: "var(--ink-3)", cursor: "pointer" }}>{I.dots()}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Live View ─────────────────────────────────────────────────────────────────
function LiveView({ agentOn }: { agentOn: boolean }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", marginBottom: 6 }}>LIVE AGENT</div>
          <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 500 }}>Watch the agent work</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...dashBtn.ghost, color: "var(--danger)" }}>{I.stop()} Stop session</button>
          <button style={dashBtn.primary}>{I.pause()} Pause agent</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
        <div style={card}>
          <CardHeader title="Browser view" sub="Stripe · Greenhouse" action="Pop out" />
          <div style={{ padding: 16, background: "#0d0f0d" }}>
            <div style={{ background: "white", color: "#111", borderRadius: 8, padding: 24, minHeight: 480 }}>
              <div style={{ fontSize: 10, color: "#888", letterSpacing: "0.05em", marginBottom: 4 }}>STRIPE · GREENHOUSE</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Senior Frontend Engineer</div>
              <div style={{ fontSize: 11, color: "#666", marginBottom: 18 }}>San Francisco · Remote OK · Full-time</div>
              {[
                { l: "Full name",           v: "Alex Chen",                        src: "profile.lookup" },
                { l: "Email",               v: "alex@chen.xyz",                    src: "profile.lookup" },
                { l: "Years of experience", v: "7 years",                          src: "resume.parse" },
                { l: "LinkedIn",            v: "linkedin.com/in/alexchen",         src: "profile.lookup" },
                { l: "Resume",              v: "alex-chen-resume.pdf",             src: "resume.parse",         file: true },
                { l: "Verify email (OTP)",  v: "427193",                           src: "otp.fetch",            otp: true },
                { l: "Why Stripe?",         v: "I've been building on Stripe since 2019...", src: "coverletter.generate", ta: true, filling: true },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <div style={{ fontSize: 10.5, color: "#666" }}>{f.l}</div>
                    <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: "#888", background: "#f2f2ec", padding: "1px 6px", borderRadius: 3, border: "1px solid #e6e6dc" }}>← {f.src}</div>
                  </div>
                  <div style={{ border: f.filling ? "1px solid #c5f02c" : f.otp ? "1px solid #ffbc5a" : "1px solid #d8d8d8", borderRadius: 4, padding: "7px 10px", minHeight: f.ta ? 52 : 24, background: f.filling ? "#fafff0" : f.otp ? "#fff6e6" : "#f0fbd9", fontSize: 11, fontFamily: f.file || f.otp ? "var(--mono)" : "inherit", position: "relative", display: "flex", alignItems: f.ta ? "flex-start" : "center" }}>
                    {f.v}{f.filling && <span style={{ color: "#c5f02c", animation: "blink 1s infinite" }}>▮</span>}
                    {!f.filling && <span style={{ position: "absolute", right: 8, top: 6, color: "#6aa84f" }}>{I.check({ width: 12, height: 12 })}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={card}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Tool calls</span>
                <span style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{TOOL_TRACE.filter(t => t.status === "ok").length} / {TOOL_TRACE.length} · app #0428</span>
              </div>
              <span style={{ fontSize: 10, color: "var(--ink-3)", fontFamily: "var(--mono)", display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span className="pulse" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "block" }} />STREAMING
              </span>
            </div>
            <div style={{ maxHeight: 520, overflowY: "auto" }}>
              {TOOL_TRACE.map((tc, i) => {
                const color = TOOL_COLORS[tc.tool] || "var(--ink-2)";
                const isOpen = expanded === i;
                const statusDot = tc.status === "ok" ? "var(--ok)" : tc.status === "running" ? "var(--accent)" : "var(--ink-4)";
                return (
                  <div key={i} style={{ borderTop: i === 0 ? "none" : "1px solid var(--line)" }}>
                    <button onClick={() => setExpanded(isOpen ? null : i)} style={{ width: "100%", display: "flex", gap: 10, alignItems: "center", padding: "9px 16px", background: "transparent", border: "none", color: "var(--ink)", textAlign: "left", cursor: "pointer" }}>
                      <span className={tc.status === "running" ? "pulse" : ""} style={{ width: 7, height: 7, borderRadius: "50%", background: statusDot, flexShrink: 0, display: "block" }} />
                      <span style={{ fontSize: 10.5, color: "var(--ink-4)", fontFamily: "var(--mono)", minWidth: 48 }}>{tc.t}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11.5, color, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tc.tool}()</span>
                      {tc.ms != null && <span style={{ fontSize: 10, color: "var(--ink-4)", fontFamily: "var(--mono)" }}>{tc.ms}ms</span>}
                      {tc.status === "queued" && <span style={{ fontSize: 9.5, color: "var(--ink-4)", fontFamily: "var(--mono)", padding: "1px 5px", border: "1px solid var(--line-2)", borderRadius: 3 }}>QUEUED</span>}
                    </button>
                    {isOpen && (
                      <div style={{ padding: "0 16px 12px 40px", fontFamily: "var(--mono)", fontSize: 10.5, background: "var(--bg-3)", borderTop: "1px solid var(--line)" }}>
                        <div style={{ padding: "8px 0", borderBottom: "1px dashed var(--line-2)" }}>
                          <div style={{ color: "var(--ink-4)", marginBottom: 3 }}>args</div>
                          <div style={{ color: "var(--ink-2)", whiteSpace: "pre-wrap" }}>{JSON.stringify(tc.args, null, 2)}</div>
                        </div>
                        <div style={{ padding: "8px 0" }}>
                          <div style={{ color: "var(--ink-4)", marginBottom: 3 }}>{tc.status === "queued" ? "waiting to run" : "output"}</div>
                          <div style={{ color: tc.status === "ok" ? "var(--ok)" : "var(--ink-3)" }}>
                            {tc.out == null ? "—" : typeof tc.out === "string" ? tc.out : JSON.stringify(tc.out, null, 2)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={card}>
            <CardHeader title="Session stats" />
            <div style={{ padding: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[{ l: "Applications this session", n: 12 }, { l: "Avg. time per app", n: "1m 47s" }, { l: "Skipped (low match)", n: 3 }, { l: "Credits used", n: 12 }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 10.5, color: "var(--ink-3)", marginBottom: 4 }}>{s.l}</div>
                  <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}>{s.n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Pipeline View ─────────────────────────────────────────────────────────────
function PipelineView() {
  const cols = [
    { title: "Applied",   n: 428, items: [{ co: "Stripe", role: "Senior Frontend", ago: "2m ago", color: "#8ab6ff" }, { co: "Linear", role: "Product Engineer", ago: "14m ago", color: "#c9b4ff" }, { co: "Vercel", role: "Staff SWE", ago: "41m ago", color: "#f1f1e8" }, { co: "Anthropic", role: "Growth FE", ago: "1h ago", color: "#d4a373" }, { co: "Figma", role: "Senior SWE", ago: "2h ago", color: "#ff9d6b" }] },
    { title: "Screening", n: 42,  items: [{ co: "Ramp", role: "Sr Full-Stack", ago: "responded 8m ago", color: "#e5fa8a", hi: true }, { co: "Mercury", role: "Sr Frontend", ago: "recruiter email · 2h", color: "#c5f02c" }, { co: "Brex", role: "Staff Engineer", ago: "tech screen · Tue", color: "#ffbc5a" }, { co: "Retool", role: "Sr FE Engineer", ago: "take-home sent", color: "#ff9d6b" }] },
    { title: "Interview", n: 11,  items: [{ co: "Scale", role: "ML Platform", ago: "onsite · Apr 29", color: "#a1f0c4", hi: true }, { co: "Perplexity", role: "Sr FE", ago: "round 2 · Apr 27", color: "#7ac7ff" }, { co: "Cursor", role: "Founding Eng", ago: "final · Apr 30", color: "#ffffff" }] },
    { title: "Offer",     n: 2,   items: [{ co: "Databricks", role: "Staff SWE", ago: "offer · $280k · decide Apr 28", color: "#ff6b6b", hi: true }, { co: "OpenAI", role: "Product Engineer", ago: "verbal · pending written", color: "#a1f0c4" }] },
  ];
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", marginBottom: 6 }}>PIPELINE</div>
        <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 500 }}>Your active opportunities</h1>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {cols.map(col => (
          <div key={col.title} style={{ ...card, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{col.title}</span>
                <span style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>{col.n}</span>
              </div>
              <button style={{ background: "transparent", border: "none", color: "var(--ink-3)", cursor: "pointer" }}>{I.plus()}</button>
            </div>
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {col.items.map((it, i) => (
                <div key={i} style={{ padding: 10, borderRadius: 8, background: (it as any).hi ? "rgba(197,240,44,0.06)" : "var(--bg-3)", border: (it as any).hi ? "1px solid rgba(197,240,44,0.3)" : "1px solid var(--line)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, background: it.color, fontSize: 10, fontWeight: 600, color: "var(--bg)", display: "grid", placeItems: "center" }}>{it.co[0]}</div>
                    <span style={{ fontSize: 12, fontWeight: 500 }}>{it.co}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-2)", marginBottom: 4 }}>{it.role}</div>
                  <div style={{ fontSize: 10.5, color: (it as any).hi ? "var(--accent)" : "var(--ink-3)", fontFamily: "var(--mono)" }}>{it.ago}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tools View ────────────────────────────────────────────────────────────────
function ConfigField({ f }: { f: { k: string; l: string; v: unknown; t: string; unit?: string; opts?: string[] } }) {
  const [val, setVal] = useState(f.v);
  const fw: React.CSSProperties = { background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "var(--ink)", display: "flex", alignItems: "center", gap: 6 };
  return (
    <div>
      <div style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 5 }}>{f.l}</div>
      {f.t === "text" && <input value={val as string} onChange={e => setVal(e.target.value)} style={{ ...fw, width: "100%", outline: "none", fontFamily: "var(--mono)" }} />}
      {f.t === "number" && (
        <div style={fw}>
          {f.unit === "$" && <span style={{ color: "var(--ink-3)" }}>$</span>}
          <input type="number" value={val as number} onChange={e => setVal(Number(e.target.value))} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--ink)", fontFamily: "var(--mono)", fontSize: 12 }} />
          {f.unit && f.unit !== "$" && <span style={{ color: "var(--ink-3)", fontSize: 10.5 }}>{f.unit}</span>}
        </div>
      )}
      {f.t === "select" && (
        <select value={val as string} onChange={e => setVal(e.target.value)} style={{ ...fw, width: "100%", cursor: "pointer", appearance: "none" as const }}>
          {f.opts?.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      )}
      {f.t === "toggle" && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 4 }}>
          <button onClick={() => setVal(!val)} style={{ position: "relative", width: 30, height: 18, borderRadius: 999, background: val ? "var(--accent)" : "var(--bg)", border: "1px solid var(--line-2)", padding: 0, cursor: "pointer" }}>
            <span style={{ position: "absolute", top: 1, left: val ? 13 : 1, width: 14, height: 14, borderRadius: "50%", background: val ? "var(--accent-ink)" : "var(--ink-2)", transition: "left .15s", display: "block" }} />
          </button>
          <span style={{ fontSize: 11.5, color: "var(--ink-2)" }}>{val ? "Enabled" : "Disabled"}</span>
        </div>
      )}
      {f.t === "multi" && (
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {f.opts?.map(o => {
            const on = (val as string[]).includes(o);
            return (
              <button key={o} onClick={() => setVal(on ? (val as string[]).filter(x => x !== o) : [...(val as string[]), o])} style={{ padding: "4px 9px", fontSize: 11, borderRadius: 5, cursor: "pointer", background: on ? "var(--accent)" : "transparent", color: on ? "var(--accent-ink)" : "var(--ink-2)", border: on ? "1px solid var(--accent)" : "1px solid var(--line-2)", fontWeight: on ? 600 : 400 }}>{o}</button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ToolRow({ tool, first, open, onToggleOpen }: { tool: (typeof TOOL_CONFIGS)[0]["tools"][0]; first: boolean; open: boolean; onToggleOpen: () => void }) {
  const [enabled, setEnabled] = useState(tool.enabled);
  return (
    <div style={{ borderTop: first ? "none" : "1px solid var(--line)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "28px 1.6fr 1fr auto auto auto", alignItems: "center", gap: 14, padding: "14px 18px" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: enabled ? "var(--accent)" : "var(--ink-4)", boxShadow: enabled ? "0 0 0 3px rgba(197,240,44,0.15)" : "none", display: "block" }} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 13.5, fontWeight: 500 }}>{tool.name}</span>
            <span style={{ fontSize: 10, fontFamily: "var(--mono)", color: "var(--ink-3)", padding: "1px 6px", background: "var(--bg-3)", borderRadius: 3, border: "1px solid var(--line-2)" }}>{tool.id}</span>
          </div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.45, maxWidth: 540 }}>{tool.desc}</div>
        </div>
        <div style={{ fontSize: 11 }}>
          <div style={{ color: "var(--ink-3)", marginBottom: 2 }}>{tool.provider}</div>
          <div style={{ color: "var(--ink-2)", fontFamily: "var(--mono)", fontSize: 10.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tool.conn}</div>
        </div>
        <div style={{ fontSize: 11, textAlign: "right", minWidth: 80 }}>
          <div style={{ fontFamily: "var(--mono)", color: "var(--ink)" }}>{tool.calls.toLocaleString()} calls</div>
          <div style={{ fontSize: 10, color: tool.fails > 0 ? "var(--warn)" : "var(--ink-3)", fontFamily: "var(--mono)" }}>{tool.fails} failed</div>
        </div>
        <button onClick={() => setEnabled(!enabled)} style={{ position: "relative", width: 34, height: 20, borderRadius: 999, background: enabled ? "var(--accent)" : "var(--bg-3)", border: "none", padding: 0, cursor: "pointer" }}>
          <span style={{ position: "absolute", top: 2, left: enabled ? 16 : 2, width: 16, height: 16, borderRadius: "50%", background: enabled ? "var(--accent-ink)" : "var(--ink-2)", transition: "left .15s", display: "block" }} />
        </button>
        <button onClick={onToggleOpen} style={{ background: "transparent", border: "1px solid var(--line-2)", borderRadius: 6, padding: "5px 10px", fontSize: 11, color: "var(--ink-2)", cursor: "pointer" }}>
          {open ? "Close" : "Configure"}
        </button>
      </div>
      {open && tool.fields.length > 0 && (
        <div style={{ padding: "4px 18px 18px 60px", background: "var(--bg-3)", borderTop: "1px solid var(--line)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, paddingTop: 14 }}>
            {tool.fields.map(f => <ConfigField key={f.k} f={f} />)}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14, paddingTop: 12, borderTop: "1px dashed var(--line-2)" }}>
            <button style={{ ...dashBtn.primary, padding: "6px 11px", fontSize: 11.5 }}>Save changes</button>
            <button style={{ ...dashBtn.ghost, padding: "6px 11px", fontSize: 11.5 }}>Test connection</button>
            <button style={{ ...dashBtn.ghost, padding: "6px 11px", fontSize: 11.5, color: "var(--danger)" }}>Revoke credentials</button>
            <span style={{ marginLeft: "auto", fontSize: 10.5, color: "var(--ink-4)", fontFamily: "var(--mono)", alignSelf: "center" }}>last used 2m ago</span>
          </div>
        </div>
      )}
      {open && tool.fields.length === 0 && (
        <div style={{ padding: "14px 18px 14px 60px", background: "var(--bg-3)", borderTop: "1px solid var(--line)", fontSize: 11.5, color: "var(--ink-3)" }}>
          No settings — this tool runs with zero configuration.
        </div>
      )}
    </div>
  );
}

function ToolsView() {
  const [open, setOpen] = useState<string | null>("otp.fetch");
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", marginBottom: 6 }}>AGENT TOOLS</div>
          <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 500 }}>Tools the agent can call</h1>
          <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 6 }}>Every tool runs on your backend. Toggle, configure, or revoke at any time.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={dashBtn.ghost}>{I.file()} Docs</button>
          <button style={dashBtn.primary}>{I.plus()} Add custom tool</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[{ l: "Enabled tools", n: 12, d: "all healthy", c: "var(--accent)" }, { l: "Calls (last 24h)", n: "10,862", d: "99.2% success", c: "var(--ink)" }, { l: "Failed calls", n: 17, d: "4 retried, 13 recovered", c: "var(--warn)" }, { l: "Avg. latency", n: "480ms", d: "−80ms vs last week", c: "var(--blue)" }].map((k, i) => (
          <div key={i} style={{ padding: 16, background: "var(--bg-2)", border: "1px solid var(--line-2)", borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 6 }}>{k.l}</div>
            <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", color: k.c }}>{k.n}</div>
            <div style={{ fontSize: 10.5, color: "var(--ink-3)", fontFamily: "var(--mono)", marginTop: 4 }}>{k.d}</div>
          </div>
        ))}
      </div>
      {TOOL_CONFIGS.map(group => (
        <div key={group.group} style={{ marginBottom: 28 }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.005em" }}>{group.group}</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{group.desc}</div>
          </div>
          <div style={{ ...card, padding: 0 }}>
            {group.tools.map((tool, i) => (
              <ToolRow key={tool.id} tool={tool} first={i === 0} open={open === tool.id} onToggleOpen={() => setOpen(open === tool.id ? null : tool.id)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StubView({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", marginBottom: 6 }}>{title.toUpperCase()}</div>
        <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em", fontWeight: 500 }}>{sub}</h1>
      </div>
      <div style={{ ...card, padding: 60, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "var(--ink-3)" }}>Coming soon.</div>
      </div>
    </div>
  );
}

// ── Dashboard root ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const [view, setView] = useState("overview");
  const [agentOn, setAgentOn] = useState(true);
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar view={view} onView={setView} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <TopBar agentOn={agentOn} setAgentOn={setAgentOn} onGoLanding={() => router.push("/")} />
        <div style={{ flex: 1 }}>
          {view === "overview"     && <OverviewView agentOn={agentOn} />}
          {view === "queue"        && <QueueView />}
          {view === "live"         && <LiveView agentOn={agentOn} />}
          {view === "pipeline"     && <PipelineView />}
          {view === "tools"        && <ToolsView />}
          {view === "inbox"        && <StubView title="Inbox" sub="Recruiter messages" />}
          {view === "profile"      && <StubView title="Profile" sub="Your resume & preferences" />}
          {view === "integrations" && <StubView title="Integrations" sub="Connected ATS & tools" />}
        </div>
      </div>
    </div>
  );
}
