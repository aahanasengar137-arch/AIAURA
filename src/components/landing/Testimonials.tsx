import { useReveal } from "@/hooks/useReveal";

const ITEMS = [
  {
    quote:
      "Noir/AI compressed three quarters of platform work into six weeks. Our agents ship like product, not science projects.",
    name: "Priya Ramanathan",
    role: "VP Engineering",
    company: "Heliox",
    initials: "PR",
  },
  {
    quote:
      "The evals layer alone justified the move. We finally trust what our agents do in production.",
    name: "Marcus Adeyemi",
    role: "Head of AI",
    company: "Pareto",
    initials: "MA",
  },
  {
    quote:
      "It feels like a product designed by engineers who actually run agents at scale. Calm, fast, opinionated.",
    name: "Yuki Tanaka",
    role: "Staff Eng",
    company: "Northwind",
    initials: "YT",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-saffron text-xs">
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="customers"
      className="relative px-5 py-32 border-t border-white/5"
    >
      <div ref={ref} className="mx-auto max-w-6xl reveal">
        <div className="flex flex-col items-start mb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-saffron">
            / customers
          </span>
          <h2 className="mt-3 text-display text-gradient text-4xl md:text-6xl max-w-3xl">
            Operators ship faster on Noir.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ITEMS.map((t, i) => (
            <figure
              key={t.name}
              className="glass relative flex flex-col rounded-2xl p-6 magnetic hover:-translate-y-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Stars />
              <blockquote className="mt-4 text-base text-powder/85 leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gradient-accent)] font-mono text-xs text-noir"
                >
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-powder/55">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
