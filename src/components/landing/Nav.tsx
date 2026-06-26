import { useEffect, useState } from "react";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#customers", label: "Customers" },
  { href: "#docs", label: "Docs" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
          scrolled
            ? "glass rounded-full px-4 py-2 shadow-[var(--shadow-card)]"
            : ""
        }`}
        style={{ width: scrolled ? "min(960px, 92%)" : "100%" }}
      >
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--gradient-accent)] text-noir font-mono font-bold">
            <span className="absolute inset-0 rounded-lg blur-md opacity-60 bg-[var(--gradient-accent)] group-hover:opacity-100 transition" />
            <span className="relative">N</span>
          </span>
          <span className="font-mono text-sm tracking-tight text-powder">
            NOIR<span className="text-saffron">/</span>AI
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1 text-sm">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-3 py-2 text-powder/70 hover:text-powder transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="#login"
            className="text-sm px-3 py-2 text-powder/70 hover:text-powder transition"
          >
            Sign in
          </a>
          <a
            href="#cta"
            className="magnetic relative inline-flex items-center gap-2 rounded-full bg-saffron px-4 py-2 text-sm font-medium text-noir hover:scale-[1.03] hover:glow-ring"
          >
            Start free
            <span aria-hidden>→</span>
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden relative h-9 w-9 rounded-full glass flex items-center justify-center"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`absolute h-px w-4 bg-powder transition-all duration-300 ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-px w-4 bg-powder transition-all duration-300 ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`md:hidden fixed inset-x-0 top-[64px] transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="mx-4 glass rounded-2xl p-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 rounded-lg text-powder/80 hover:bg-white/5 hover:text-powder transition"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="mt-2 text-center rounded-lg bg-saffron px-4 py-3 text-sm font-medium text-noir"
          >
            Start free
          </a>
        </div>
      </div>
    </header>
  );
}
