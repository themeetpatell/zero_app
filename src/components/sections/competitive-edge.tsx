"use client";

import { CheckCircle, Sparkles, Rocket, Shield, ShoppingBag } from "lucide-react";

const competitors = [
  {
    name: "HeyGen",
    gap: "Avatars, limited ad intelligence, no marketplace.",
  },
  {
    name: "Runway",
    gap: "Clips and effects, no performance focus, no marketplace.",
  },
  {
    name: "ElevenLabs",
    gap: "Voice only, no video, no ad pipeline.",
  },
];

const differentiators = [
  {
    icon: Sparkles,
    title: "Voice-to-video + AI Co-Director",
    desc: "Speak a brief; Zero Human scripts, casts, scores, lights, and exports 4K ads in under 60 seconds.",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace moat",
    desc: "Rent, buy, or customize ads. Creators monetize instantly; brands get on-brand creative without agencies.",
  },
  {
    icon: Rocket,
    title: "Ad-optimized by default",
    desc: "Hooks, CTAs, pacing, and framing tuned for performance across TikTok, Meta, CTV, and retail screens.",
  },
  {
    icon: Shield,
    title: "Brand-safe + governance",
    desc: "Style locks, approvals, and brand kits so teams can scale creation without losing control.",
  },
];

const CompetitiveEdge = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#0c0d0f] to-black py-20 lg:py-28 text-white">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -left-10 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="absolute right-0 bottom-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_45%)]" />
      </div>
      <div className="rw-container relative">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/80">
            Beyond HeyGen, Runway, and ElevenLabs
          </div>
          <h2 className="text-[38px] sm:text-[46px] lg:text-[52px] leading-[1.05] font-normal">
            Built to outperform every creative AI stack.
          </h2>
          <p className="text-white/80 text-base sm:text-lg max-w-3xl leading-relaxed">
            Others generate clips, voices, or avatars. Zero Human delivers finished, performance-ready ads and the only marketplace to monetize them.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] mt-12">
          <div className="space-y-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-emerald-300" />
                <span className="text-sm uppercase tracking-[0.14em] text-white/70">Where competitors stop</span>
              </div>
              <div className="space-y-3">
                {competitors.map((c) => (
                  <div key={c.name} className="flex items-start gap-3">
                    <div className="text-sm font-semibold text-white">{c.name}</div>
                    <div className="text-sm text-white/70 leading-relaxed">{c.gap}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-xl bg-white/10 border border-white/10 p-2">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/marketplace"
            className="rw-cta-text px-5 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap text-black bg-white border border-white hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)]"
          >
            Explore marketplace feed
          </a>
          <a
            href="/signin"
            className="rw-cta-text px-5 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap text-white border border-white/40 hover:bg-white/10"
          >
            Try AI Co-Director
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveEdge;
