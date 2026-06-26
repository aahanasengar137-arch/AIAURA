import { useReveal } from "@/hooks/useReveal";

export function CTA() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="cta" className="relative px-5 py-32">
      <div
        ref={ref}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 reveal"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, color-mix(in oklab, var(--saffron) 40%, transparent), transparent 60%), radial-gradient(ellipse at 80% 80%, color-mix(in oklab, var(--teal) 60%, transparent), transparent 70%), var(--noir)",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-full blur-3xl opacity-50"
          style={{ background: "var(--gradient-accent)" }}
        />
        <div className="relative px-8 md:px-16 py-20 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-saffron">
            / launch
          </span>
          <h2 className="mt-4 text-display text-gradient text-4xl md:text-6xl">
            Build the calm AI surface
            <br />
            your team deserves.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-powder/65">
            Spin up your first agent in under five minutes. No credit card,
            no vendor sales call.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#signup"
              className="magnetic inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-medium text-noir hover:glow-ring"
            >
              Start free <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="magnetic inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-powder hover:bg-white/5"
            >
              Talk to an engineer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
