"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp, Sparkles, Zap, Wand2, Palette, TrendingUp, Play, ArrowRight, Check } from "lucide-react";

// Simple cn utility function
const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter((c): c is string => Boolean(c)).join(" ");

const useCases = [
  "Product Ads",
  "TikTok & Reels",
  "E-commerce Videos",
  "Brand Storytelling",
  "Product Reveals",
  "Social Campaigns",
  "Virtual Try-On",
  "Mood Boards",
  "Video Commerce",
  "Performance Ads",
];

const TechnologyOverview = () => {
  const [activeTab, setActiveTab] = useState("Product Ads");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1) as section scrolls through viewport
      const start = windowHeight;
      const end = -rect.height;
      const current = rect.top;
      
      const progress = Math.max(0, Math.min(1, (start - current) / (start - end)));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate opacity and scale based on scroll
  const opacity = Math.min(1, scrollProgress * 1.5);
  const scale = 0.8 + (scrollProgress * 0.2);

  const features = [
    { icon: Wand2, title: 'Smart Scripts', desc: 'AI writes hooks & CTAs' },
    { icon: Play, title: 'Scene Design', desc: 'Shot sequences & angles' },
    { icon: Zap, title: 'Audio Match', desc: 'Voice, music & sound' },
    { icon: Palette, title: 'Visual Style', desc: 'Color, light & effects' },
    { icon: TrendingUp, title: 'Performance', desc: 'Data-driven optimization' }
  ];

  return (
    <>
      {/* Full Screen Hero Section */}
      <section 
        ref={heroRef}
        className="relative flex min-h-screen w-full items-center justify-center bg-white px-6 py-12"
      >
        <div 
          className="mx-auto max-w-5xl text-center"
          style={{
            opacity: opacity,
            transform: `scale(${scale})`,
            transition: 'opacity 0.05s ease-out, transform 0.05s ease-out'
          }}
        >
          <h1 className="mb-8 text-[48px] font-normal leading-[1.1] tracking-[-0.02em] text-off-black sm:text-[64px] md:text-[80px] lg:text-[96px] xl:text-[120px]">
            Cinematic ads.<br />
            Born from voice.
          </h1>
          
          <p className="mx-auto mb-12 max-w-4xl text-[18px] leading-relaxed text-medium-gray sm:text-[20px] md:text-[22px] lg:text-[24px]">
            Zero Human is the world's first voice-directed cinematic AI engine. 
            Simply speak your vision—our AI Co-Director creates fully customized, 
            professional-quality 4K video ads in under 60 seconds. No cameras, 
            actors, or production teams needed. From product reveals to social campaigns, 
            we make premium video advertising accessible, affordable, and instant.
          </p>
          
          <a
            href="/signin"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-off-black px-8 py-4 text-[16px] font-medium text-off-black transition-all duration-200 hover:bg-off-black hover:text-white sm:text-[18px]"
          >
            Start Creating
          </a>
        </div>
      </section>

      {/* Original Content Section */}
      <section className="bg-white py-24 text-off-black lg:py-32">
        <div className="rw-container">
          <div className="mx-auto flex w-full flex-col items-center">
            <div className="w-full">
              <p className="rw-eyebrow mb-6 text-center text-medium-gray">
                WHAT YOU CAN CREATE
              </p>
              <div className="flex items-center justify-center">
                <div className="flex space-x-2 overflow-x-auto px-4 pb-4 [scrollbar-width:none] lg:space-x-4 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {useCases.map((useCase) => (
                    <button
                      key={useCase}
                      onClick={() => setActiveTab(useCase)}
                      className={cn(
                        "rw-eyebrow whitespace-nowrap rounded-full px-4 py-2 font-medium transition-colors duration-200",
                        activeTab === useCase
                          ? "bg-off-black text-white"
                          : "bg-transparent text-off-black hover:bg-off-white",
                      )}
                    >
                      {useCase}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Co-Director Section - LUXURY MINIMAL */}
            <div className="mt-16 w-full lg:mt-24">
              <div className="mx-auto max-w-7xl px-6">
                
                {/* Header */}
                <div className="mb-32 text-center">
                  <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium uppercase tracking-wider text-gray-900 shadow-sm">
                    <Sparkles className="h-5 w-5 text-gray-900" />
                    Zero AI Co-Director
                  </div>
                  
                  <h2 className="mb-8 text-6xl font-normal tracking-tight text-gray-900 sm:text-7xl lg:text-8xl">
                    Professional Direction.<br />Instant Creation.
                  </h2>
                  
                  <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                    Our AI Co-Director analyzes your product or service, then crafts professional recommendations including talent selection, dialogues, scripts, music, and guided shot sequences—delivering broadcast-quality ads in under 90 seconds.
                  </p>
                </div>

                {/* Main Feature Showcase */}
                <div className="mb-32">
                  <div className="overflow-hidden rounded-none border border-gray-900 bg-gray-900">
                    
                    {/* Top Banner */}
                    <div className="border-b border-gray-700 px-12 py-8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-light tracking-tight text-white">
                          Your Professional Production Team
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
                          <span className="text-sm font-medium uppercase tracking-wider text-gray-400">Active</span>
                        </div>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid divide-y divide-gray-700 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
                      
                      {/* Talent Selection */}
                      <div 
                        className="group cursor-pointer p-12 transition-all duration-500 hover:bg-gray-800"
                        onMouseEnter={() => setHoveredFeature(0)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className="mb-6 flex items-center justify-between">
                          <Wand2 className="h-8 w-8 text-white" />
                          <span className="text-sm font-light uppercase tracking-widest text-gray-500">01</span>
                        </div>
                        <h4 className="mb-4 text-3xl font-light text-white">Talent & Casting</h4>
                        <p className="mb-6 text-gray-400">
                          AI selects perfect talent matching your brand identity, target audience, and campaign objectives
                        </p>
                        <div className={`h-px w-full bg-gradient-to-r from-transparent via-white to-transparent transition-opacity duration-500 ${hoveredFeature === 0 ? 'opacity-100' : 'opacity-0'}`}></div>
                      </div>

                      {/* Script & Dialogue */}
                      <div 
                        className="group cursor-pointer p-12 transition-all duration-500 hover:bg-gray-800"
                        onMouseEnter={() => setHoveredFeature(1)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className="mb-6 flex items-center justify-between">
                          <Play className="h-8 w-8 text-white" />
                          <span className="text-sm font-light uppercase tracking-widest text-gray-500">02</span>
                        </div>
                        <h4 className="mb-4 text-3xl font-light text-white">Scripts & Dialogues</h4>
                        <p className="mb-6 text-gray-400">
                          Professional copywriting with compelling hooks, emotional beats, and conversion-optimized CTAs
                        </p>
                        <div className={`h-px w-full bg-gradient-to-r from-transparent via-white to-transparent transition-opacity duration-500 ${hoveredFeature === 1 ? 'opacity-100' : 'opacity-0'}`}></div>
                      </div>

                      {/* Music & Sound */}
                      <div 
                        className="group cursor-pointer p-12 transition-all duration-500 hover:bg-gray-800"
                        onMouseEnter={() => setHoveredFeature(2)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className="mb-6 flex items-center justify-between">
                          <Zap className="h-8 w-8 text-white" />
                          <span className="text-sm font-light uppercase tracking-widest text-gray-500">03</span>
                        </div>
                        <h4 className="mb-4 text-3xl font-light text-white">Music & Sound Design</h4>
                        <p className="mb-6 text-gray-400">
                          Curated soundtracks, voiceover direction, and audio mixing perfectly synchronized to your narrative
                        </p>
                        <div className={`h-px w-full bg-gradient-to-r from-transparent via-white to-transparent transition-opacity duration-500 ${hoveredFeature === 2 ? 'opacity-100' : 'opacity-0'}`}></div>
                      </div>

                      {/* Cinematography */}
                      <div 
                        className="group cursor-pointer p-12 transition-all duration-500 hover:bg-gray-800"
                        onMouseEnter={() => setHoveredFeature(3)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className="mb-6 flex items-center justify-between">
                          <Palette className="h-8 w-8 text-white" />
                          <span className="text-sm font-light uppercase tracking-widest text-gray-500">04</span>
                        </div>
                        <h4 className="mb-4 text-3xl font-light text-white">Guided Shot Sequences</h4>
                        <p className="mb-6 text-gray-400">
                          Professional camera movements, lighting setups, and shot compositions guided by cinematic principles
                        </p>
                        <div className={`h-px w-full bg-gradient-to-r from-transparent via-white to-transparent transition-opacity duration-500 ${hoveredFeature === 3 ? 'opacity-100' : 'opacity-0'}`}></div>
                      </div>

                    </div>

                  </div>
                </div>

                {/* Process Timeline */}
                <div className="mb-32">
                  <div className="space-y-px">
                    
                    {/* Step 1 */}
                    <div className="group flex border border-gray-300 bg-white transition-all duration-300 hover:border-gray-900">
                      <div className="flex w-32 items-center justify-center border-r border-gray-300 bg-gray-50 group-hover:bg-gray-900">
                        <span className="text-4xl font-light text-gray-400 group-hover:text-white">01</span>
                      </div>
                      <div className="flex-1 p-10">
                        <h4 className="mb-3 text-2xl font-light text-gray-900">Describe Your Vision</h4>
                        <p className="mb-6 text-gray-600">Tell us about your product, service, or campaign goals</p>
                        <div className="rounded-sm border border-gray-300 bg-gray-50 px-6 py-4">
                          <p className="font-mono text-sm text-gray-700">
                            "Create a luxury watch ad emphasizing craftsmanship and heritage"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="group flex border border-gray-300 bg-white transition-all duration-300 hover:border-gray-900">
                      <div className="flex w-32 items-center justify-center border-r border-gray-300 bg-gray-50 group-hover:bg-gray-900">
                        <span className="text-4xl font-light text-gray-400 group-hover:text-white">02</span>
                      </div>
                      <div className="flex-1 p-10">
                        <h4 className="mb-3 text-2xl font-light text-gray-900">AI Analyzes & Recommends</h4>
                        <p className="mb-6 text-gray-600">Professional recommendations across all production elements</p>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                          {['Talent', 'Script', 'Music', 'Shots'].map((item) => (
                            <div key={item} className="border border-gray-900 bg-gray-900 p-4 text-center">
                              <Check className="mx-auto mb-2 h-5 w-5 text-white" />
                              <span className="text-xs font-medium uppercase tracking-wider text-white">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex border border-gray-900 bg-gray-900">
                      <div className="flex w-32 items-center justify-center border-r border-gray-700 bg-black">
                        <span className="text-4xl font-light text-white">03</span>
                      </div>
                      <div className="flex-1 p-10">
                        <h4 className="mb-3 text-2xl font-light text-white">Generate in Under 90s</h4>
                        <p className="mb-6 text-gray-400">Professional 4K video ready for broadcast or social</p>
                        <div className="flex items-center justify-between rounded-sm border border-gray-700 bg-black px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-white"></div>
                            <span className="font-mono text-sm uppercase tracking-wider text-white">Rendering</span>
                          </div>
                          <span className="text-3xl font-light tracking-tight text-white">87s</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Stats */}
                <div className="mb-32 border-t border-gray-300 pt-20">
                  <div className="grid gap-16 sm:grid-cols-3">
                    <div className="text-center">
                      <div className="mb-3 text-7xl font-light tracking-tight text-gray-900">95%</div>
                      <p className="text-sm font-medium uppercase tracking-wider text-gray-500">Physics Accuracy</p>
                    </div>
                    <div className="text-center">
                      <div className="mb-3 text-7xl font-light tracking-tight text-gray-900">&lt;90s</div>
                      <p className="text-sm font-medium uppercase tracking-wider text-gray-500">Generation Time</p>
                    </div>
                    <div className="text-center">
                      <div className="mb-3 text-7xl font-light tracking-tight text-gray-900">3x</div>
                      <p className="text-sm font-medium uppercase tracking-wider text-gray-500">Higher Engagement</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <a
                    href="/signin"
                    className="group inline-flex items-center gap-4 border border-gray-900 bg-gray-900 px-12 py-6 text-lg font-light uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-gray-900"
                  >
                    Start Creating
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </a>
                  <p className="mt-6 text-sm font-medium uppercase tracking-wider text-gray-500">No Credit Card Required</p>
                </div>

              </div>
            </div>



          </div>
        </div>
      </section>
    </>
  );
};

export default TechnologyOverview;