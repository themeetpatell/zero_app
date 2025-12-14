import React from 'react';

const FooterCta = () => {
  return (
    <section className="relative bg-black">
      <div className="relative min-h-[60vh] overflow-hidden rounded-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block h-full w-full object-cover"
        >
          <source src="/herovideo.mp4" type="video/webm" />
          <source src="/herovideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="rw-container">
            <div className="max-w-3xl space-y-4 text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                Built to outrun Runway, HeyGen, and ElevenLabs
              </div>
              <h2 className="text-[38px] sm:text-[46px] lg:text-[52px] leading-[1.05] font-normal">
                Launch voice-to-video ads faster than anyone.
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
                Zero Human’s AI Co-Director handles scripts, casting, music, and shots,
                delivering ad-optimized 4K video in under 60 seconds—ready to publish
                or list in the marketplace.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/signin"
                  className="rw-cta-text px-5 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap text-black bg-white border border-white hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)]"
                >
                  Start now
                </a>
                <a
                  href="/pricing"
                  className="rw-cta-text px-5 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap text-white border border-white/40 hover:bg-white/10"
                >
                  See pricing
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="absolute bottom-4 right-4 text-xs font-normal text-white md:bottom-8 md:right-8">
          Zero Human V1
        </p>
      </div>
    </section>
  );
};

export default FooterCta;
