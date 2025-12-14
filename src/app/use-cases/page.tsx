import HeaderNavigation from "@/components/sections/header-navigation";
import FooterNavigation from "@/components/sections/footer-navigation";

const useCases = [
  {
    title: "DTC launches in 60 seconds",
    description:
      "Speak your launch brief and get a 4K, ad-optimized cut with hooks, CTAs, and product hero shots—faster than Runway or HeyGen.",
    outcome: "60s to finished spot",
  },
  {
    title: "Performance UGC at scale",
    description:
      "Generate TikTok/Meta-native UGC with social pacing, influencer VO, and variant testing baked in. Refresh creatives without new shoots.",
    outcome: "8-12 variants per prompt",
  },
  {
    title: "Localized ads with cultural intelligence",
    description:
      "Scripts, casting, wardrobe, and music adapt to each market—no translators, no reshoots. Keep brand standards intact.",
    outcome: "1 click → localized set",
  },
  {
    title: "B2B explainers that convert",
    description:
      "Executive-grade narration, motion design, and data overlays so you can ship trust-first explainers and demos without production teams.",
    outcome: "Cut production timelines by 90%",
  },
  {
    title: "App install & product walkthroughs",
    description:
      "Auto-capture flows, generate channel-specific cuts (story/feed/CTV), and test CTA copy before spend. Ship daily, not quarterly.",
    outcome: "Channel-ready renders in <2 min",
  },
  {
    title: "Marketplace-ready creative",
    description:
      "Publish your AI-generated ads to the Zero Human marketplace for brands to buy, rent, or customize—monetize every winning idea.",
    outcome: "New revenue in minutes",
  },
];

const differentiators = [
  {
    label: "Voice-to-video",
    detail:
      "Voice-first flow beats keyboard-heavy tools. Speak a brief; get scripts, shots, talent, music, and motion automatically.",
  },
  {
    label: "AI Co-Director",
    detail:
      "Guides talent, pacing, lighting, and sound with ad performance in mind—not just pretty frames.",
  },
  {
    label: "Marketplace",
    detail:
      "The only platform where you can sell, rent, or customize AI-generated ads—no competitor offers this.",
  },
  {
    label: "Speed",
    detail:
      "60-second renders vs 3–10 minutes on Runway or Synthesia, plus instant variants for fatigue-proofing.",
  },
  {
    label: "Quality",
    detail:
      "4K broadcast output, ad-safe composition, and cultural intelligence baked in for any market.",
  },
];

const marketplaceFeatures = [
  "List, sell, or rent AI-generated ads with instant brand customization.",
  "Performance data alongside each asset: CTR, conversion, ROI benchmarks.",
  "Creator monetization built-in—earn from every download or customization.",
  "Advertising-optimized formats for Meta, TikTok, YouTube, CTV, and DOOH.",
];

export default function UseCasesPage() {
  return (
    <>
      <HeaderNavigation />
      <main className="bg-white text-off-black">
        <section className="bg-gradient-to-br from-black via-black to-[#0d0d0d] text-white pt-32 pb-20">
          <div className="rw-container">
            <div className="max-w-4xl">
              <p className="rw-eyebrow text-white/60 mb-4">USE CASES</p>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-normal leading-tight mb-6">
                Voice-to-video ads that outperform Runway, HeyGen, and Synthesia.
              </h1>
              <p className="text-lg text-white/80 max-w-3xl leading-relaxed mb-8">
                Zero Human is built for advertisers: an AI Co-Director that ships
                multilingual, 4K, performance-ready ads plus the only marketplace
                to buy, sell, or rent them.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/signin"
                  className="rw-cta-text px-4 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap bg-white text-black border border-white hover:bg-white/90"
                >
                  Start creating
                </a>
                <a
                  href="/pricing"
                  className="rw-cta-text px-4 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap border border-white/30 text-white hover:bg-white hover:text-black"
                >
                  See pricing
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-off-white">
          <div className="rw-container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((useCase) => (
                <div
                  key={useCase.title}
                  className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <p className="text-xs uppercase tracking-wide text-medium-gray mb-3">
                    {useCase.outcome}
                  </p>
                  <h2 className="text-xl font-semibold mb-3">{useCase.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="rw-container">
            <div className="max-w-3xl mb-10">
              <p className="rw-eyebrow mb-3 text-medium-gray">WHY TEAMS SWITCH</p>
              <h2 className="text-3xl lg:text-4xl font-normal leading-tight mb-4">
                Better than Runway, HeyGen, and Synthesia where it counts.
              </h2>
              <p className="text-lg text-gray-600">
                Zero Human is the first ad-native platform: voice-first input,
                AI co-direction, cultural intelligence, and a marketplace moat
                that competitors don’t have.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {differentiators.map((item) => (
                <div
                  key={item.label}
                  className="border border-black/5 rounded-2xl p-5 bg-off-white"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.label}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="marketplace" className="py-20 bg-black text-white">
          <div className="rw-container">
            <div className="max-w-3xl mb-8">
              <p className="rw-eyebrow text-white/60 mb-3">MARKETPLACE</p>
              <h2 className="text-3xl lg:text-4xl font-normal leading-tight mb-4">
                The first marketplace for AI-generated ads.
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                Create with Zero Human, then turn every winning spot into revenue.
                Buyers get instant brand customization; creators get monetization
                with performance transparency.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {marketplaceFeatures.map((item) => (
                <div
                  key={item}
                  className="border border-white/15 rounded-2xl p-5 bg-white/5 backdrop-blur"
                >
                  <p className="text-sm text-white leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <a
                href="/signin"
                className="rw-cta-text px-4 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap bg-white text-black border border-white hover:bg-white/90"
              >
                List my first ad
              </a>
            </div>
          </div>
        </section>
      </main>
      <FooterNavigation />
    </>
  );
}
