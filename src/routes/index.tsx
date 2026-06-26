import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Bento } from "@/components/landing/Bento";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noir/AI — The operating layer for intelligent enterprises" },
      {
        name: "description",
        content:
          "Noir/AI orchestrates agents, knowledge and workflows into a single calm surface so enterprise teams ship at the speed of thought.",
      },
      { property: "og:title", content: "Noir/AI — Agentic operations for the enterprise" },
      {
        property: "og:description",
        content:
          "Compose agents, eval them continuously, and ship with enterprise-grade guardrails.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Noir/AI" },
      {
        name: "twitter:description",
        content: "The operating layer for intelligent enterprises.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Noir/AI",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Bento />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
