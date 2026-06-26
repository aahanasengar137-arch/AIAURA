const COLS = [
  {
    title: "Product",
    links: ["Agents", "Knowledge", "Workflows", "Evals", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "Changelog", "Status", "Security", "API"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-5 pt-20 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--gradient-accent)] font-mono font-bold text-noir">
                N
              </span>
              <span className="font-mono text-sm">
                NOIR<span className="text-saffron">/</span>AI
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-powder/55">
              The operating layer for intelligent enterprises. Built in calm,
              shipped at speed.
            </p>
            <form
              className="mt-6 flex max-w-sm glass rounded-full p-1"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                placeholder="you@company.com"
                className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-powder/40"
              />
              <button
                type="submit"
                className="rounded-full bg-saffron px-4 py-2 text-sm font-medium text-noir hover:glow-ring transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {COLS.map((c) => (
            <nav
              key={c.title}
              aria-label={c.title}
              className="md:col-span-2"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-powder/40">
                {c.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href={`#${l.toLowerCase()}`}
                      className="text-powder/70 hover:text-powder transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-1 flex md:flex-col gap-3 md:items-end">
            {["X", "Gh", "In"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                aria-label={s}
                className="glass flex h-9 w-9 items-center justify-center rounded-full text-xs font-mono text-powder/70 hover:text-saffron transition"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-between gap-4 border-t border-white/5 pt-6 text-xs text-powder/45">
          <span>© {new Date().getFullYear()} Noir/AI Labs, Inc.</span>
          <div className="flex gap-5 font-mono">
            <a href="#privacy" className="hover:text-powder">
              Privacy
            </a>
            <a href="#terms" className="hover:text-powder">
              Terms
            </a>
            <a href="#dpa" className="hover:text-powder">
              DPA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
