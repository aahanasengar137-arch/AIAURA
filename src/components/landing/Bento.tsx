import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

type Feature = {
  id: string;
  title: string;
  desc: string;
  body: React.ReactNode;
  span: string; // tailwind grid spans for desktop
};

const FEATURES: Feature[] = [
  {
    id: "agents",
    title: "Composable agents",
    desc: "Orchestrate specialist agents that plan, retrieve, act and verify — with full audit trails.",
    span: "md:col-span-2 md:row-span-2",
    body: (
      <div className="relative h-full min-h-[220px]">
        <div className="absolute inset-0 grid grid-cols-3 gap-2 p-2">
          {["Plan", "Retrieve", "Act"].map((s, i) => (
            <div
              key={s}
              className="glass rounded-lg p-3 flex flex-col justify-between animate-float"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <span className="font-mono text-[10px] text-powder/50">
                node.{i + 1}
              </span>
              <span className="text-sm">{s}</span>
              <span className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                <span
                  className="block h-full bg-saffron"
                  style={{ width: `${30 + i * 25}%` }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "rag",
    title: "Living knowledge",
    desc: "Continuously synced retrieval over your docs, tickets and code.",
    span: "md:col-span-1",
    body: (
      <div className="flex h-full items-center justify-center">
        <div className="relative h-24 w-24">
          <span className="absolute inset-0 rounded-full border border-saffron/40 animate-pulse-glow" />
          <span className="absolute inset-3 rounded-full border border-forsythia/40 animate-pulse-glow" style={{ animationDelay: "1s" }}/>
          <span className="absolute inset-6 rounded-full bg-saffron/80 animate-pulse-glow" style={{ animationDelay: "2s" }}/>
        </div>
      </div>
    ),
  },
  {
    id: "evals",
    title: "Continuous evals",
    desc: "Ground-truth scoring, drift alerts, regression guards.",
    span: "md:col-span-1",
    body: (
      <div className="font-mono text-[11px] leading-relaxed text-powder/70 space-y-1">
        <div>✓ factuality <span className="text-saffron">0.94</span></div>
        <div>✓ helpfulness <span className="text-saffron">0.91</span></div>
        <div>✓ safety <span className="text-saffron">1.00</span></div>
        <div className="text-powder/40">… 14 more passing</div>
      </div>
    ),
  },
  {
    id: "guard",
    title: "Enterprise guardrails",
    desc: "SOC2, RBAC, PII redaction, regional residency.",
    span: "md:col-span-1",
    body: (
      <div className="flex flex-wrap gap-1.5">
        {["SOC2", "HIPAA", "GDPR", "RBAC", "SSO", "VPC", "EU-residency"].map(
          (b) => (
            <span
              key={b}
              className="rounded-full border border-white/10 px-2 py-1 font-mono text-[10px] text-powder/70"
            >
              {b}
            </span>
          ),
        )}
      </div>
    ),
  },
  {
    id: "obs",
    title: "Observability that thinks",
    desc: "Traces, replays and cost attribution per agent, per decision, per user.",
    span: "md:col-span-2",
    body: (
      <svg viewBox="0 0 400 90" className="w-full">
        <defs>
          <linearGradient id="bg2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FFC801" stopOpacity="0.5" />
            <stop offset="1" stopColor="#FFC801" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,70 C50,40 90,80 140,55 C190,30 230,70 280,45 C330,20 370,55 400,35 L400,90 L0,90 Z"
          fill="url(#bg2)"
        />
        <path
          d="M0,70 C50,40 90,80 140,55 C190,30 230,70 280,45 C330,20 370,55 400,35"
          fill="none"
          stroke="#FF9932"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

export function Bento() {
  const ref = useReveal<HTMLDivElement>();
  const isMobile = useIsMobile();
  // Preserve active feature across breakpoint changes
  const [active, setActive] = useState<string>(FEATURES[0].id);

  return (
    <section id="features" className="relative px-5 py-32">
      <div ref={ref} className="mx-auto max-w-6xl reveal">
        <div className="mb-14 flex flex-col items-start gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-saffron">
            / capabilities
          </span>
          <h2 className="text-display text-gradient text-4xl md:text-6xl max-w-2xl">
            Built for teams that operate{" "}
            <span className="text-saffron-gradient italic font-light">
              at the edge.
            </span>
          </h2>
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-2">
            {FEATURES.map((f) => {
              const open = active === f.id;
              return (
                <div
                  key={f.id}
                  className="glass rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActive(open ? "" : f.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-base font-medium">{f.title}</span>
                    <span
                      className={`transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                      } text-saffron text-xl`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5">
                        <p className="text-sm text-powder/60 mb-4">{f.desc}</p>
                        <div className="rounded-xl bg-black/30 p-4">
                          {f.body}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[220px] gap-4">
            {FEATURES.map((f) => {
              const isActive = active === f.id;
              return (
                <article
                  key={f.id}
                  onMouseEnter={() => setActive(f.id)}
                  onFocus={() => setActive(f.id)}
                  tabIndex={0}
                  className={`group relative overflow-hidden rounded-2xl p-6 glass magnetic ${f.span} ${
                    isActive ? "border-saffron/40" : ""
                  }`}
                  style={{
                    boxShadow: isActive
                      ? "0 0 0 1px color-mix(in oklab, var(--saffron) 35%, transparent), 0 30px 80px -30px rgba(0,0,0,0.6)"
                      : undefined,
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(closest-side, color-mix(in oklab, var(--saffron) 25%, transparent), transparent)",
                      opacity: isActive ? 0.8 : 0.25,
                    }}
                  />
                  <div className="relative flex h-full flex-col">
                    <header>
                      <h3 className="text-lg font-medium">{f.title}</h3>
                      <p className="mt-1.5 max-w-xs text-sm text-powder/55">
                        {f.desc}
                      </p>
                    </header>
                    <div className="mt-5 flex-1">{f.body}</div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
