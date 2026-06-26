import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const HeroBackground = lazy(() => import("./HeroBackground"));

const LOGOS = ["Acumen", "Nimbus", "Heliox", "Pareto", "Volta", "Northwind"];

export function Hero() {
  const ref = useReveal<HTMLDivElement>();
  const [mountBg, setMountBg] = useState(false);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(() => setMountBg(true))
      : window.setTimeout(() => setMountBg(true), 200);
    return () => {
      if (window.cancelIdleCallback && typeof id === "number")
        window.cancelIdleCallback(id);
      else window.clearTimeout(id as number);
    };
  }, []);

  // Magnetic primary button
  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
    };
    const onLeave = () => (el.style.transform = "");
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-hero"
    >
      {mountBg && (
        <Suspense fallback={null}>
          <HeroBackground />
        </Suspense>
      )}

      {/* Top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--saffron) 35%, transparent), transparent)",
        }}
      />

      <div
        ref={ref}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 pt-40 pb-24 text-center reveal"
      >
        <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-mono text-powder/80">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-saffron animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-saffron" />
          </span>
          v3.0 · Agentic reasoning is here
        </div>

        <h1 className="text-display text-gradient text-[clamp(2.6rem,8vw,6.5rem)] font-bold max-w-5xl">
          The operating layer
          <br />
          for{" "}
          <span className="text-saffron-gradient italic font-light">
            intelligent
          </span>{" "}
          enterprises.
        </h1>

        <p className="mt-7 max-w-xl text-pretty text-base md:text-lg text-powder/65 leading-relaxed">
          Noir/AI orchestrates agents, knowledge and workflows into a single
          calm surface — so your teams can ship at the speed of thought.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            ref={btnRef}
            href="#cta"
            className="magnetic group relative inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-medium text-noir hover:glow-ring"
          >
            Start building free
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
          <a
            href="#demo"
            className="magnetic group inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-powder hover:bg-white/5"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-powder/10">
              ▶
            </span>
            Watch the keynote
          </a>
        </div>

        {/* Dashboard preview */}
        <div className="relative mt-20 w-full max-w-5xl">
          <div
            aria-hidden
            className="absolute -inset-x-10 -top-10 -bottom-10 -z-10 rounded-[2rem] blur-2xl opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at center, color-mix(in oklab, var(--saffron) 30%, transparent), transparent 70%)",
            }}
          />
          <div className="glass overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="font-mono text-[10px] text-powder/50">
                noir.ai/console
              </span>
              <span />
            </div>
            <div className="grid grid-cols-12 gap-px bg-white/5 text-left">
              <aside className="col-span-3 hidden md:flex flex-col gap-1 bg-[var(--noir)] p-4 text-xs">
                {[
                  "Workspaces",
                  "Agents",
                  "Knowledge",
                  "Workflows",
                  "Evaluations",
                  "Telemetry",
                ].map((s, i) => (
                  <div
                    key={s}
                    className={`rounded-md px-2 py-1.5 ${
                      i === 1
                        ? "bg-white/5 text-powder"
                        : "text-powder/50"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </aside>
              <main className="col-span-12 md:col-span-9 bg-[var(--noir)] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-powder/50">
                      AGENT · production
                    </div>
                    <div className="text-base font-medium">
                      Pricing-Ops Copilot
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-[11px]">
                    <span className="rounded-full bg-saffron/15 px-2 py-0.5 text-saffron">
                      ● Live
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-powder/60">
                      p95 312ms
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { l: "Runs / 24h", v: "12,408", d: "+18%" },
                    { l: "Success", v: "99.2%", d: "+0.4%" },
                    { l: "Cost / run", v: "$0.014", d: "-22%" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="rounded-lg bg-white/[0.03] p-3"
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider text-powder/50">
                        {s.l}
                      </div>
                      <div className="mt-1 text-lg font-mono">{s.v}</div>
                      <div className="text-[10px] text-saffron">{s.d}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-28 rounded-lg bg-white/[0.03] p-3 relative overflow-hidden">
                  <svg
                    viewBox="0 0 400 100"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#FF9932" stopOpacity="0.6" />
                        <stop offset="1" stopColor="#FF9932" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,70 C40,60 60,40 100,45 C140,50 160,20 200,25 C240,30 260,55 300,40 C340,30 360,15 400,20 L400,100 L0,100 Z"
                      fill="url(#g)"
                    />
                    <path
                      d="M0,70 C40,60 60,40 100,45 C140,50 160,20 200,25 C240,30 260,55 300,40 C340,30 360,15 400,20"
                      fill="none"
                      stroke="#FFC801"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* Trusted by */}
        <div className="mt-20 w-full">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-powder/40">
            Trusted by category-defining teams
          </p>
          <div className="mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
            <div className="flex w-max gap-12 animate-marquee">
              {[...LOGOS, ...LOGOS, ...LOGOS].map((l, i) => (
                <span
                  key={i}
                  className="font-mono text-xl text-powder/35 hover:text-powder/70 transition-colors"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
