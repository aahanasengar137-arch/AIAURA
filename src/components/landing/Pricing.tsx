import { memo, useCallback, useMemo, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

type Currency = "USD" | "EUR" | "INR";
type Cycle = "monthly" | "annual";

const MULTIPLIERS: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  INR: 83.5,
};
const SYMBOLS: Record<Currency, string> = { USD: "$", EUR: "€", INR: "₹" };
const ANNUAL_DISCOUNT = 0.2;

type Plan = {
  id: string;
  name: string;
  base: number;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
  custom?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    base: 0,
    tagline: "For builders shipping their first agent.",
    features: [
      "1 workspace",
      "Up to 5k runs / mo",
      "Community support",
      "Basic evals",
    ],
    cta: "Start free",
  },
  {
    id: "pro",
    name: "Professional",
    base: 49,
    tagline: "For product teams operating in production.",
    features: [
      "Unlimited workspaces",
      "250k runs / mo",
      "Priority support",
      "Custom evals & RAG",
      "SSO",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    base: 0,
    tagline: "For organizations with scale and compliance needs.",
    features: [
      "Unlimited runs",
      "Dedicated VPC",
      "SOC2 / HIPAA",
      "Solutions architect",
      "99.99% SLA",
    ],
    cta: "Talk to sales",
    custom: true,
  },
];

function formatPrice(base: number, currency: Currency, cycle: Cycle) {
  const multiplied = base * MULTIPLIERS[currency];
  const monthly =
    cycle === "annual" ? multiplied * (1 - ANNUAL_DISCOUNT) : multiplied;
  const rounded =
    currency === "INR" ? Math.round(monthly / 10) * 10 : Math.round(monthly);
  return `${SYMBOLS[currency]}${rounded.toLocaleString()}`;
}

const PlanCard = memo(function PlanCard({
  plan,
  currency,
  cycle,
}: {
  plan: Plan;
  currency: Currency;
  cycle: Cycle;
}) {
  const price = useMemo(
    () =>
      plan.custom
        ? "Custom"
        : plan.base === 0
        ? "Free"
        : formatPrice(plan.base, currency, cycle),
    [plan.base, plan.custom, currency, cycle],
  );

  const featured = "featured" in plan && plan.featured;

  return (
    <article
      className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 magnetic ${
        featured
          ? "bg-[var(--noir)] border border-saffron/50 shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--saffron)_40%,transparent)]"
          : "glass"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-saffron px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-noir">
          Most popular
        </span>
      )}
      <header>
        <h3 className="font-mono text-sm uppercase tracking-wider text-powder/70">
          {plan.name}
        </h3>
        <p className="mt-2 text-sm text-powder/55 min-h-[40px]">
          {plan.tagline}
        </p>
      </header>
      <div className="mt-6 flex items-baseline gap-1">
        <span
          className={`text-display text-5xl ${
            featured ? "text-saffron-gradient" : "text-gradient"
          }`}
        >
          {price}
        </span>
        {!plan.custom && plan.base > 0 && (
          <span className="text-xs text-powder/50">/ mo</span>
        )}
      </div>
      <ul className="mt-6 space-y-2.5 text-sm flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-powder/80">
            <span
              className="mt-1.5 inline-block h-1 w-1 rounded-full bg-saffron flex-none"
              aria-hidden
            />
            {f}
          </li>
        ))}
      </ul>
      <a
        href={plan.custom ? "#contact" : "#cta"}
        className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition ${
          featured
            ? "bg-saffron text-noir hover:glow-ring"
            : "border border-white/15 text-powder hover:bg-white/5"
        }`}
      >
        {plan.cta} <span aria-hidden>→</span>
      </a>
    </article>
  );
});

export function Pricing() {
  const ref = useReveal<HTMLDivElement>();
  const [currency, setCurrency] = useState<Currency>("USD");
  const [cycle, setCycle] = useState<Cycle>("annual");

  const setMonthly = useCallback(() => setCycle("monthly"), []);
  const setAnnual = useCallback(() => setCycle("annual"), []);

  return (
    <section id="pricing" className="relative px-5 py-32 border-t border-white/5">
      <div ref={ref} className="mx-auto max-w-6xl reveal">
        <div className="flex flex-col items-center text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-saffron">
            / pricing
          </span>
          <h2 className="mt-3 text-display text-gradient text-4xl md:text-6xl">
            Predictable. Transparent.
          </h2>
          <p className="mt-4 max-w-xl text-powder/60">
            Start free. Scale when you're ready. No per-seat surprise lock-in.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <div
              role="tablist"
              aria-label="Billing cycle"
              className="glass relative flex rounded-full p-1"
            >
              <button
                role="tab"
                aria-selected={cycle === "monthly"}
                onClick={setMonthly}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                  cycle === "monthly" ? "text-noir" : "text-powder/70"
                }`}
              >
                {cycle === "monthly" && (
                  <span className="absolute inset-0 -z-0 rounded-full bg-saffron transition-all" />
                )}
                <span className="relative z-10">Monthly</span>
              </button>
              <button
                role="tab"
                aria-selected={cycle === "annual"}
                onClick={setAnnual}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                  cycle === "annual" ? "text-noir" : "text-powder/70"
                }`}
              >
                {cycle === "annual" && (
                  <span className="absolute inset-0 -z-0 rounded-full bg-saffron transition-all" />
                )}
                <span className="relative z-10">
                  Annual <span className="text-[10px] opacity-80">−20%</span>
                </span>
              </button>
            </div>

            <div className="glass flex rounded-full p-1">
              {(["USD", "EUR", "INR"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  aria-pressed={currency === c}
                  className={`relative rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
                    currency === c
                      ? "text-noir"
                      : "text-powder/60 hover:text-powder"
                  }`}
                >
                  {currency === c && (
                    <span className="absolute inset-0 -z-0 rounded-full bg-forsythia" />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((p) => (
            <PlanCard
              key={p.id}
              plan={p}
              currency={currency}
              cycle={cycle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
