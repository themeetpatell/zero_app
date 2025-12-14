import HeaderNavigation from "@/components/sections/header-navigation";
import FooterNavigation from "@/components/sections/footer-navigation";

const plans = [
  {
    name: "Launch",
    price: "$59",
    period: "per month",
    description: "For founders and small teams shipping ads weekly.",
    cta: { label: "Start now", href: "/signin" },
    features: [
      "Voice-to-video generation",
      "AI Co-Director for scripts, shots, music",
      "4K exports and advertising-safe framing",
      "Up to 20 renders/month + instant variants",
      "Marketplace listing access",
    ],
  },
  {
    name: "Growth",
    price: "$199",
    period: "per month",
    description: "For performance teams refreshing creatives daily.",
    cta: { label: "Talk to sales", href: "mailto:sales@zerohuman.co" },
    features: [
      "Unlimited renders and variants",
      "Brand kits + product feed ingestion",
      "Cultural intelligence for localization",
      "Performance data overlay (CTR, CVR, ROI)",
      "Priority marketplace placement",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For global brands and agencies needing scale and control.",
    cta: { label: "Book a demo", href: "mailto:sales@zerohuman.co" },
    features: [
      "Custom SLAs and dedicated environments",
      "Advanced governance and SSO",
      "Fine-tuned voice + visual models per market",
      "Collaboration seats and approvals",
      "Marketplace revenue share for networks",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <HeaderNavigation />
      <main className="bg-white text-off-black">
        <section className="bg-gradient-to-br from-black via-[#0b0b0b] to-black text-white pt-32 pb-20">
          <div className="rw-container">
            <div className="max-w-4xl">
              <p className="rw-eyebrow text-white/60 mb-3">PRICING</p>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-normal leading-tight mb-6">
                Faster than Runway. Smarter than HeyGen. Built for advertisers.
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
                Choose a plan that matches your creative velocity. Every plan
                includes the AI Co-Director, 4K exports, and marketplace access so
                you can publish or monetize instantly.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-off-white">
          <div className="rw-container grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wide text-medium-gray mb-1">
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-semibold text-off-black">
                      {plan.price}
                    </span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mt-2">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1 h-2 w-2 rounded-full bg-off-black" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.cta.href}
                  className="rw-cta-text w-full text-center px-4 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap border border-off-black text-off-black hover:bg-off-black hover:text-white"
                >
                  {plan.cta.label}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="rw-container grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="rw-eyebrow text-medium-gray mb-3">COMPARE</p>
              <h2 className="text-3xl font-normal leading-tight mb-4">
                What you get that competitors don&apos;t.
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Zero Human combines a voice-first workflow, an AI Co-Director tuned
                for advertising, and a marketplace. Runway, HeyGen, and Synthesia
                stop at generation—we deliver performance and monetization.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                "Voice-to-video with cultural intelligence",
                "AI Co-Director: scripts, talent, music, shots optimized for ROI",
                "4K broadcast quality with brand-safe composition",
                "Marketplace listing and revenue share for creators",
                "Instant variants and localization to beat ad fatigue",
              ].map((item) => (
                <div
                  key={item}
                  className="border border-black/5 rounded-2xl p-4 bg-off-white"
                >
                  <p className="text-sm text-gray-800 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterNavigation />
    </>
  );
}
