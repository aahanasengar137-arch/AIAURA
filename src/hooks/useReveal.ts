import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("reveal-in");
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("reveal-in");
          io.unobserve(e.target);
        }
      });
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
