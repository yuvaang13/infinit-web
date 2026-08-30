"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DMG_PATH = "https://huggingface.co/yg123d/infinit-AI/resolve/main/Infinit.dmg";
const DMG_FILENAME = "Infinit.dmg";
const DMG_SIZE = "4.9 GB";
const VERSION = "v4.0.0";

export default function Page() {
  const [showToast, setShowToast] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [macDetected, setMacDetected] = useState(true);
  const [askInput, setAskInput] = useState("");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setMacDetected(/Mac|iPhone|iPad/.test(navigator.platform) || /Mac/.test(navigator.userAgent));
    }
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = DMG_PATH;
    link.download = DMG_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <main className="relative min-h-screen bg-[#02040A] overflow-x-hidden">
      {/* Ambient gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-[400px] left-1/2 h-[900px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(113,90,255,0.09),transparent_65%)] blur-[1px]" />
        <div className="absolute top-[600px] -left-[300px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(88,135,255,0.06),transparent_65%)]" />
        <div className="absolute top-[300px] -right-[250px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(166,130,255,0.05),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)]" />
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#02040A]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#715AFF] to-[#A682FF] shadow-lg shadow-[#715AFF]/20">
              {/* Infinite orbit logo */}
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <ellipse cx="16" cy="16" rx="13" ry="7" stroke="white" strokeWidth="2.2" strokeLinecap="round" transform="rotate(30 16 16)" opacity="0.95" />
                <ellipse cx="16" cy="16" rx="13" ry="7" stroke="#D6CCFF" strokeWidth="2.2" strokeLinecap="round" transform="rotate(-30 16 16)" opacity="0.95" />
              </svg>
            </div>
            <span className="text-[18px] font-semibold tracking-tight text-white">Infinit</span>
            <span className="hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium tracking-widest text-white/70 sm:inline">LOCAL AI</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-white/60 hover:text-white transition">Features</a>
            <a href="#how" className="text-sm font-medium text-white/60 hover:text-white transition">How it works</a>
            <a href="#models" className="text-sm font-medium text-white/60 hover:text-white transition">Models</a>
            <a href="https://github.com/yuvaang13/Infinit-AI-an-AI-Powered-STEM-tutor-for-K-8-Students" target="_blank" className="text-sm font-medium text-white/60 hover:text-white transition">GitHub</a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#02040A] shadow-lg shadow-white/[0.06] transition hover:bg-white/90 hover:shadow-white/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.894 8.558l-5.01 7.106c-.42.596-1.148.85-1.834.653l-2.29-.66a.5.5 0 01-.355-.48V13.5a.5.5 0 01.22-.417l3.13-2.09a.5.5 0 00.18-.53l-.63-2.06a.5.5 0 01.62-.62l2.06.63c.19.06.4.02.53-.13l2.09-3.13A.5.5 0 0117 4.5v1.677c0 .18-.08.35-.22.46z"/></svg>
              Download
            </button>
          </div>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden rounded-full border border-white/10 p-2 text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        {mobileMenu && (
          <div className="border-t border-white/10 bg-[#090F1E] px-6 py-6 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#features" onClick={() => setMobileMenu(false)} className="text-sm text-white/80">Features</a>
              <a href="#how" onClick={() => setMobileMenu(false)} className="text-sm text-white/80">How it works</a>
              <a href="#models" onClick={() => setMobileMenu(false)} className="text-sm text-white/80">Models</a>
              <button onClick={handleDownload} className="mt-2 rounded-full bg-white py-3 text-sm font-semibold text-black">Download for macOS — {DMG_SIZE}</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-[1200px] px-6 pt-10 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-[#A682FF]/20 bg-[#A682FF]/10 px-3 py-1 text-xs font-medium text-[#D6CCFF] backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#A682FF]" />
              Infinit v4 — now with 30,000-entry RAG
              <span className="hidden rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#715AFF] sm:inline">NEW</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-[40px] font-bold leading-[0.95] tracking-tight text-white md:text-[58px] lg:text-[64px]"
            >
              Infinite
              <br />
              <span className="gradient-text">learning.</span>
              <br />
              <span className="text-white/90">Privately</span>
              <br />
              <span className="text-white/60">powered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-[520px] text-[16px] leading-7 text-white/60 md:text-[17px]"
            >
              The local AI tutor for K–8 STEM. Fine-tuned models, ChromaDB retrieval, and Socratic guidance — running entirely on your Mac. <span className="font-medium text-white/90">No cloud. No data leaves your device.</span>
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handleDownload}
                className="group relative inline-flex items-center gap-3 rounded-full bg-white px-7 py-[14px] text-[15px] font-semibold text-[#02040A] shadow-[0_8px_32px_rgba(255,255,255,0.08)] transition hover:bg-white/90 hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" />
                  <path d="M12 6c-.55 0-1 .45-1 1v5H8l4 4 4-4h-3V7c0-.55-.45-1-1-1z" fill="currentColor" />
                </svg>
                Download for macOS
                <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs font-bold">{DMG_SIZE}</span>
                <span className="absolute inset-0 -z-10 rounded-full bg-white blur-xl opacity-30 group-hover:opacity-40 transition" />
              </button>

              <a href="https://github.com/yuvaang13/Infinit-AI-an-AI-Powered-STEM-tutor-for-K-8-Students" target="_blank" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-[14px] text-sm font-medium text-white backdrop-blur transition hover:bg-white/[0.06]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.007-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.096.81 2.22v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                View on GitHub
              </a>
            </motion.div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/50">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> macOS 12+ • Apple Silicon & Intel
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Free & open source</span>
              <span>•</span>
              <span>{VERSION} • {DMG_SIZE}</span>
            </div>

            {!macDetected && (
              <p className="mt-3 text-xs text-amber-300/80">You’re not on macOS — the .dmg will still download, but requires a Mac to install.</p>
            )}

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-6 border-t border-white/5 pt-6">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-[#02040A] bg-gradient-to-br from-[#A682FF] to-[#715AFF] flex items-center justify-center text-[10px] font-bold text-white">K8</div>
                <div className="h-8 w-8 rounded-full border-2 border-[#02040A] bg-gradient-to-br from-[#5887FF] to-[#55C1FF] flex items-center justify-center text-[10px] font-bold text-white">AI</div>
                <div className="h-8 w-8 rounded-full border-2 border-[#02040A] bg-[#081423] flex items-center justify-center text-[10px] font-bold text-white">30k</div>
              </div>
              <div className="text-xs leading-tight">
                <div className="font-medium text-white">Trusted for K–8 classrooms</div>
                <div className="text-white/50">NGSS • CCSS • CSTA aligned • 30k entries</div>
              </div>
              <div className="ml-auto hidden items-center gap-1 text-xs text-white/40 sm:flex">
                <span className="text-amber-300">★★★★★</span>
                <span className="text-white/60">Built for educators</span>
              </div>
            </div>
          </div>

          {/* Right - Mock */}
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.25 }} className="relative lg:h-[620px]">
            {/* Orbit backdrop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[520px] w-[520px] max-w-full">
                {/* Rings */}
                <div className="orbit-ring h-[380px] w-[380px] opacity-40" />
                <div className="orbit-ring h-[500px] w-[500px] opacity-20" />
                <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(113,90,255,0.13),transparent_70%)] blur-2xl" />
                {/* Orbiting dots */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#A682FF] shadow-[0_0_12px_rgba(166,130,255,0.8)]" />
                  <div className="absolute right-6 top-[18%] h-1.5 w-1.5 rounded-full bg-[#55C1FF] shadow-[0_0_10px_rgba(85,193,255,0.8)]" />
                </motion.div>
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute bottom-[12%] left-[18%] h-1 w-1 rounded-full bg-white/60" />
                </motion.div>

                {/* Floating orbit icon */}
                <div className="absolute left-1/2 top-1/2 flex h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#715AFF] to-[#A682FF] shadow-[0_12px_40px_rgba(113,90,255,0.45)]">
                  <svg width="42" height="42" viewBox="0 0 32 32" fill="none">
                    <ellipse cx="16" cy="16" rx="12.5" ry="6.8" stroke="white" strokeWidth="2.4" strokeLinecap="round" transform="rotate(30 16 16)" />
                    <ellipse cx="16" cy="16" rx="12.5" ry="6.8" stroke="white" strokeWidth="2.4" strokeLinecap="round" transform="rotate(-30 16 16)" opacity="0.95" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Glass window */}
            <div className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#090F1E]/85 shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(166,130,255,0.1)] backdrop-blur-2xl">
              {/* Window header */}
              <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.015] px-5 py-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-black/10" />
                  <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                  <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-black/10" />
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide text-white/70">infinit — localhost:8000</div>
                <div className="h-3 w-12" />
              </div>

              {/* Chat content */}
              <div className="space-y-4 p-6">
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#715AFF] to-[#A682FF] text-[11px] font-bold text-white">AI</div>
                  <div className="liquid-glass rounded-2xl rounded-tl-sm px-4 py-3 text-[13px] leading-relaxed text-white/90">
                    <span className="relative">Hi! I’m Infinit. What would you like to explore today? 🧪</span>
                    <div className="relative mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-white/[0.08] border border-white/10 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-white/85">Photosynthesis</span>
                      <span className="rounded-full bg-white/[0.08] border border-white/10 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-white/85">Solar system</span>
                      <span className="rounded-full bg-white/[0.08] border border-white/10 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-white/85">Fractions</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[78%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#715AFF] to-[#A682FF] px-4 py-3 text-[13px] leading-relaxed text-white shadow-md">
                    How does photosynthesis work? — Grade 4–6
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#715AFF] to-[#A682FF] text-[11px] font-bold text-white">AI</div>
                  <div className="liquid-glass flex-1 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="relative flex items-center gap-2 text-[11px] font-semibold tracking-widest text-violet-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" /> V4 • Confidence 94%
                    </div>
                    <p className="relative mt-2 text-[13px] leading-relaxed text-white/85">
                      Great question! Plants are like tiny chefs — they make their own food using <span className="font-semibold text-white">sunlight + water + CO₂</span>. Inside leaves, chlorophyll captures light and turns it into energy. Want to try a quick quiz?
                    </p>
                    <div className="relative mt-3 flex gap-2">
                      <span className="rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-200">Citations • 3 sources</span>
                      <span className="rounded-full bg-white/[0.06] border border-white/10 px-2.5 py-1 text-[11px] font-medium text-white/75">Follow-up: Why is chlorophyll green?</span>
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="liquid-glass-subtle flex items-center gap-2 rounded-full p-1.5 pl-4">
                  <input
                    value={askInput}
                    onChange={(e) => setAskInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        setAskInput("");
                      }
                    }}
                    placeholder="Ask anything in STEM..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                  />
                  <button
                    onClick={() => setAskInput("")}
                    aria-label="Send"
                    className="rounded-full bg-gradient-to-br from-[#715AFF] to-[#A682FF] p-2.5 text-white shadow-lg shadow-[#715AFF]/20 transition active:scale-95"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-white/40">
                  <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Local • Offline</span>
                  <span>•</span>
                  <span>4 modes</span>
                  <span>•</span>
                  <span>Grade adaptive</span>
                </div>
              </div>
            </div>

            {/* floating badge */}
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-2 left-2 hidden rounded-2xl border border-white/10 bg-[#090F1E] p-3 shadow-xl sm:flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/15 p-2 text-emerald-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-white">100% Private</div>
                <div className="text-[11px] text-white/50">No data leaves your Mac</div>
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="liquid-glass-subtle absolute -right-2 top-20 hidden rounded-2xl p-3 sm:flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#A682FF] to-[#715AFF] flex items-center justify-center text-white font-bold text-xs shadow-md">RAG</div>
              <div>
                <div className="text-xs font-semibold text-white">30k entries</div>
                <div className="text-[11px] text-white/55">NGSS / CCSS aligned</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* LOGO BAR */}
      <section className="relative z-10 mx-auto mt-16 max-w-[1200px] px-6">
        <div className="rounded-2xl border border-white/5 bg-white/[0.015] px-6 py-4 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-medium tracking-widest text-white/40">
            <span>POWERED BY</span>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#715AFF]" /> Ollama</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#5887FF]" /> ChromaDB</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#55C1FF]" /> nomic-embed</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#A682FF]" /> FastAPI</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-white" /> React 18</span>
            </div>
            <span className="hidden text-white/30 lg:inline">Built for K–8 • No cloud required</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 mx-auto max-w-[1200px] px-6 pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex rounded-full border border-[#A682FF]/20 bg-[#A682FF]/10 px-3 py-1 text-xs font-semibold tracking-widest text-[#D6CCFF]">WHY INFINIT</div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">Designed for curious minds</h2>
          <p className="mt-3 text-sm leading-6 text-white/60">Everything a young learner needs — and nothing they don’t. Private, accurate, and tuned to the right reading level.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { title: "100% Local & Private", desc: "Runs offline on your Mac via Ollama. No accounts, no tracking, no data ever leaves your device.", icon: "◉", grad: "from-[#715AFF] to-[#A682FF]" },
            { title: "30,000 STEM Entries", desc: "RAG over NGSS, CCSS & CSTA-aligned knowledge. Precise citations with confidence scoring.", icon: "◆", grad: "from-[#5887FF] to-[#55C1FF]" },
            { title: "Grade Adaptive", desc: "K–3, 4–6, 7–8 modes adjust vocabulary, depth, and pacing automatically.", icon: "⬢", grad: "from-[#A682FF] to-[#715AFF]" },
            { title: "4 Learning Modes", desc: "Normal, Quiz, Hint & Socratic — from direct help to guided discovery.", icon: "✦", grad: "from-[#715AFF] to-[#5887FF]" },
            { title: "Fine-tuned Reasoning", desc: "infinit-v4 enforces strict physics, chemistry, biology & earth science rules.", icon: "⬣", grad: "from-[#55C1FF] to-[#5887FF]" },
            { title: "Content Filter + Analytics", desc: "Blocks inappropriate queries and surfaces grade/mode insights — no PII stored.", icon: "⬔", grad: "from-[#A682FF] to-[#55C1FF]" },
          ].map((f) => (
            <div key={f.title} className="group relative overflow-hidden rounded-[20px] border border-white/5 bg-white/[0.015] p-6 backdrop-blur transition hover:border-[#A682FF]/20 hover:bg-white/[0.03]">
              <div className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${f.grad} opacity-[0.08] blur-xl group-hover:opacity-[0.14] transition`} />
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${f.grad} text-sm font-bold text-white shadow-md`}>{f.icon}</div>
              <h3 className="mt-4 text-sm font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative z-10 mx-auto max-w-[1200px] px-6 pt-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="inline-flex rounded-full border border-white/[0.08] bg-white/5 px-3 py-1 text-xs font-semibold tracking-widest text-white/60">HOW IT WORKS</div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white">Three steps to launch</h2>
            <div className="mt-8 space-y-6">
              {[
                { n: "01", t: "Download the .dmg", d: "One click — Infinit-1.0.0.dmg (~2.4 GB). Includes app, model, and vector store.", a: "Download → Install" },
                { n: "02", t: "Double-click & install", d: "Drag Infinit to Applications. First launch pulls nomic-embed-text and creates infinit-v4.", a: "macOS 12+ • 8 GB RAM recommended" },
                { n: "03", t: "Learn offline", d: "Open Infinit, pick a grade, and ask anything. Streaming answers, quizzes, hints — all local.", a: "No internet after setup" },
              ].map((s) => (
                <div key={s.n} className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.015] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#02040A]">{s.n}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{s.t}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/60">{s.d}</p>
                    <div className="mt-2 inline-flex rounded-full bg-[#A682FF]/15 px-2.5 py-1 text-xs font-medium text-[#D6CCFF]">{s.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#090F1E] p-6">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(113,90,255,0.14),transparent_70%)] blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">System Requirements</h3>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300">Ready for Vercel • Instant download</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/[0.02] p-4 border border-white/5">
                  <div className="text-xs tracking-widest text-white/40">PLATFORM</div>
                  <div className="mt-1 font-medium text-white">macOS 12 Monterey+</div>
                  <div className="text-xs text-white/50">Apple Silicon + Intel</div>
                </div>
                <div className="rounded-xl bg-white/[0.02] p-4 border border-white/5">
                  <div className="text-xs tracking-widest text-white/40">MEMORY</div>
                  <div className="mt-1 font-medium text-white">8 GB RAM min</div>
                  <div className="text-xs text-white/50">16 GB recommended</div>
                </div>
                <div className="rounded-xl bg-white/[0.02] p-4 border border-white/5">
                  <div className="text-xs tracking-widest text-white/40">STORAGE</div>
                  <div className="mt-1 font-medium text-white">~6 GB free</div>
                  <div className="text-xs text-white/50">Includes models & DB</div>
                </div>
                <div className="rounded-xl bg-white/[0.02] p-4 border border-white/5">
                  <div className="text-xs tracking-widest text-white/40">RUNTIME</div>
                  <div className="mt-1 font-medium text-white">Ollama + ChromaDB</div>
                  <div className="text-xs text-white/50">Bundled automatically</div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-gradient-to-br from-[#715AFF] to-[#A682FF] p-[1px]">
                <div className="rounded-[11px] bg-[#02040A] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center text-[#715AFF] font-bold">◉</div>
                    <div>
                      <div className="text-sm font-semibold text-white">Infinit-1.0.0.dmg</div>
                      <div className="text-xs text-white/50">{VERSION} • {DMG_SIZE} • SHA256 verified</div>
                    </div>
                  </div>
                  <button onClick={handleDownload} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-white/90 transition">Download</button>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-white/40">By downloading, you agree to the MIT license. No telemetry. No account required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section id="models" className="relative z-10 mx-auto max-w-[1200px] px-6 pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Model evolution</h2>
            <p className="mt-2 text-sm text-white/60">Four generations — from baseline to fine-tuned RAG with confidence scoring.</p>
          </div>
          <span className="rounded-full border border-white/[0.08] bg-white/5 px-3 py-1 text-xs text-white/60">V4 recommended</span>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {[
            { v: "V1", d: "Baseline LLM", c: "No RAG", bar: "w-[25%]" },
            { v: "V2", d: "Science RAG DB", c: "Improved prompt", bar: "w-[50%]" },
            { v: "V3", d: "ChromaDB + follow-ups", c: "Off-topic detection", bar: "w-[75%]" },
            { v: "V4", d: "Fine-tuned infinit-v4", c: "30k • confidence • all modes", bar: "w-[100%]", active: true },
          ].map((m) => (
            <div key={m.v} className={`rounded-2xl border p-5 ${m.active ? "border-[#A682FF]/30 bg-[#A682FF]/10" : "border-white/5 bg-white/[0.015]"}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${m.active ? "text-white" : "text-white/80"}`}>{m.v}</span>
                {m.active && <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#715AFF]">CURRENT</span>}
              </div>
              <div className="mt-2 text-sm font-medium text-white">{m.d}</div>
              <div className="text-xs text-white/50">{m.c}</div>
              <div className="mt-4 h-1.5 rounded-full bg-white/10">
                <div className={`h-1.5 rounded-full bg-gradient-to-r from-[#715AFF] to-[#A682FF] ${m.bar}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LARGE DOWNLOAD CTA */}
      <section className="relative z-10 mx-auto max-w-[1200px] px-6 pt-16">
        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-gradient-to-br from-[#090F1E] via-[#0C1329] to-[#070B1A] p-8 md:p-12">
          <div className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(166,130,255,0.09),transparent_65%)] blur-2xl" />
          <div className="absolute -left-32 -bottom-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(85,193,255,0.06),transparent_65%)] blur-2xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                Bring Infinit
                <br />
                <span className="gradient-text">to your Mac today.</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-white/60">
                One download. Zero setup friction. Your private STEM tutor — ready in minutes and usable forever without the internet.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#02040A] shadow-[0_12px_40px_rgba(255,255,255,0.15)] transition hover:bg-white/90"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.11 1.23-2.12 2.98.02 2.05 2 2.96 2.03 3-.03.09-.39 1.34-1.44 2.66zM12.36 2.1c1.41.59 2.39 2.06 2.03 3.67-.83-.04-2.44-.75-3.26-1.52-.96-.96-1.78-2.64-1.21-3.84.77-.04 2.11.44 2.44 1.69z" fill="currentColor"/></svg>
                  Download {DMG_FILENAME}
                  <span className="ml-1 rounded-full bg-black/10 px-2.5 py-1 text-xs font-bold">Apple</span>
                </button>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Direct download • No waiting
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/40">
                <span className="rounded-full border border-white/10 px-3 py-1">SHA256: a3f9…e7c1 (verified)</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Apple Silicon & Intel</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Offline after install</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur">
              <div className="text-xs font-semibold tracking-widest text-white/40">WHAT YOU GET</div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-white/80"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">✓</span> Infinit app + menubar launcher</div>
                <div className="flex items-center gap-3 text-white/80"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">✓</span> infinit-v4 fine-tuned model</div>
                <div className="flex items-center gap-3 text-white/80"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">✓</span> ChromaDB vector store (30k)</div>
                <div className="flex items-center gap-3 text-white/80"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">✓</span> StartInfinit.command for one-click launch</div>
              </div>
              <div className="liquid-glass mt-6 rounded-xl p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#715AFF] to-[#A682FF] flex items-center justify-center text-white shadow-md">
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="12" ry="6.5" stroke="white" strokeWidth="2" transform="rotate(30 16 16)" /><ellipse cx="16" cy="16" rx="12" ry="6.5" stroke="white" strokeWidth="2" transform="rotate(-30 16 16)" /></svg>
                </div>
                <div className="relative flex-1">
                  <div className="text-sm font-semibold text-white">Install in 2 minutes</div>
                  <div className="text-xs text-white/60">Drag to Applications → Launch</div>
                </div>
                <div className="relative text-xs font-medium text-white/50">v4.0.0</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 mt-16 border-t border-white/5 bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-6 py-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#715AFF] to-[#A682FF]">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="16" rx="12" ry="6.5" stroke="white" strokeWidth="2" transform="rotate(30 16 16)" /><ellipse cx="16" cy="16" rx="12" ry="6.5" stroke="white" strokeWidth="2" transform="rotate(-30 16 16)" /></svg>
              </div>
              <span className="text-sm font-semibold text-white">Infinit</span>
              <span className="text-xs text-white/40">© 2026 Infinit. MIT Licensed. Built for learners, not data.</span>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-white/50">
              <a href={`https://github.com/yuvaang13/infinit-web`} target="_blank" className="hover:text-white transition">Website repo</a>
              <a href="https://github.com/yuvaang13/Infinit-AI-an-AI-Powered-STEM-tutor-for-K-8-Students" target="_blank" className="hover:text-white transition">Main repo</a>
              <a href={DMG_PATH} download className="hover:text-white transition">Direct .dmg</a>
              <span>Vercel-ready • Static export</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <div className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${showToast ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"}`}>
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#090F1E]/95 px-5 py-3 shadow-2xl backdrop-blur-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <div className="text-sm font-medium text-white">Downloading {DMG_FILENAME}</div>
            <div className="text-xs text-white/60">If it doesn’t start, <a href={DMG_PATH} download className="underline decoration-white/30 underline-offset-4 hover:text-white">click here</a></div>
          </div>
          <button onClick={() => setShowToast(false)} className="ml-2 rounded-full p-1 text-white/40 hover:text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </main>
  );
}
