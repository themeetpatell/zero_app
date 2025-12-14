import HeaderNavigation from "@/components/sections/header-navigation";
import FooterNavigation from "@/components/sections/footer-navigation";

const principles = [
  {
    title: "Voice-first creation",
    description:
      "Creation should be as natural as speaking. We built Zero Human to turn speech into direction, direction into shots, and shots into finished ads.",
  },
  {
    title: "Advertising intelligence",
    description:
      "Quality means performance, not just pixels. Scripts, music, pacing, and casting are optimized for CTR, conversion, and ROI.",
  },
  {
    title: "Global by default",
    description:
      "Built with cultural nuance baked into every frame. Great creative should travel without losing context.",
  },
  {
    title: "Marketplace moat",
    description:
      "A creation tool is not enough. Zero Human is the only platform with a marketplace so creators and brands both win.",
  },
];

const milestones = [
  {
    title: "Zero V1",
    description:
      "Our first voice-to-video engine delivering 4K broadcast ads with AI Co-Director guidance.",
  },
  {
    title: "Marketplace launch",
    description:
      "Buy, sell, or rent AI-generated ads with instant brand customization and performance data.",
  },
  {
    title: "Cultural intelligence",
    description:
      "Region-aware casting, wardrobe, and music for culturally intelligent ads.",
  },
];

export default function AboutPage() {
  return (
    <>
      <HeaderNavigation />
      <main className="bg-white text-off-black">
        <section className="bg-gradient-to-br from-black via-[#0b0b0b] to-black text-white pt-32 pb-20">
          <div className="rw-container">
            <div className="max-w-4xl">
              <p className="rw-eyebrow text-white/60 mb-3">ABOUT ZERO HUMAN</p>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-normal leading-tight mb-6">
                Building the first voice-to-video ad studio and marketplace.
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
                Zero Human is for marketers who need speed, quality, and reach.
                We turn a spoken brief into a 4K, advertising-optimized video in
                under a minute and give you a marketplace to monetize or source
                world-class creative.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="rw-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="space-y-4">
              <p className="rw-eyebrow text-medium-gray">OUR STORY</p>
              <h2 className="text-3xl font-normal leading-tight text-off-black">
                From production pain to production intelligence.
              </h2>
              <p className="text-gray-700 leading-relaxed max-w-2xl">
                We spent years watching teams burn time and budget on agencies,
                reshoots, and manual localization. Tools like Runway, HeyGen, and
                Synthesia made generation easier but stopped short of being ad-native.
                Zero Human closes the gap with an AI Co-Director that thinks like a
                marketer and a marketplace that turns every winning asset into
                revenue.
              </p>
            </div>
            <div className="grid gap-4 w-full">
              {milestones.map((item) => (
                <div
                  key={item.title}
                  className="border border-black/5 rounded-2xl p-5 bg-white shadow-sm"
                >
                  <h3 className="text-base font-semibold text-off-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-off-white">
          <div className="rw-container">
            <div className="max-w-3xl mb-8">
              <p className="rw-eyebrow text-medium-gray mb-2">HOW WE BUILD</p>
              <h2 className="text-3xl font-normal leading-tight text-off-black">
                Principles that keep us ahead.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {principles.map((principle) => (
                <div
                  key={principle.title}
                  className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="rw-container grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="rw-eyebrow text-medium-gray mb-3">THE TEAM</p>
              <h2 className="text-3xl font-normal leading-tight mb-4">
                Small, global, obsessed with outcomes.
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We operate as a close-knit, distributed team across markets we
                serve. Every feature is measured by how fast a marketer can launch
                a better ad—and how fast a creator can monetize it.
              </p>
              <div className="flex gap-3">
                <a
                  href="mailto:partnerships@zerohuman.co"
                  className="rw-cta-text px-4 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap bg-off-black text-white border border-off-black hover:bg-black"
                >
                  Partner with us
                </a>
                <a
                  href="/careers"
                  className="rw-cta-text px-4 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap border border-off-black text-off-black hover:bg-off-black hover:text-white"
                >
                  Careers
                </a>
              </div>
            </div>
            <div className="bg-off-white border border-black/5 rounded-2xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                Zero Human exists to democratize production-quality advertising.
                No cameras. No crews. No delays. Just a voice, a vision, and a
                marketplace that makes the best ideas travel.
              </p>
            </div>
          </div>
        </section>
      </main>
      <FooterNavigation />
    </>
  );
}
