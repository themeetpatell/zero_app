"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface UseCase {
  number: number;
  title: string;
  description: string;
  imageUrl: string;
}

const useCases: UseCase[] = [
  {
    number: 1,
    title: "DTC Product Launch",
    description:
      "Voice your brief; Zero Human writes the hook, casts talent, designs shots, and exports a 4K launch ad in under a minute.",
    imageUrl:
      "https://images.pexels.com/photos/16445642/pexels-photo-16445642/free-photo-of-smartphone-with-shopping-app-on-screen.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    number: 2,
    title: "Performance UGC",
    description:
      "Generate TikTok/Meta-ready UGC ads with native pacing, social hooks, and performance-driven CTAs.",
    imageUrl:
      "https://images.pexels.com/photos/6898852/pexels-photo-6898852.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    number: 3,
    title: "Localization without reshoots",
    description:
      "Culturally tuned scripts, voices, and visuals for each market—no translators or reshoots.",
    imageUrl:
      "https://images.pexels.com/photos/8887877/pexels-photo-8887877.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    number: 4,
    title: "B2B Explainers",
    description:
      "High-trust explainers with data-driven storytelling, clean motion, and executive-grade narration.",
    imageUrl:
      "https://images.pexels.com/photos/6802040/pexels-photo-6802040.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    number: 5,
    title: "App Install Ads",
    description:
      "Auto-generate channel-optimized cuts (stories, feed, CTV) with live app flows and CTA testing.",
    imageUrl:
      "https://images.pexels.com/photos/3831849/pexels-photo-3831849.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    number: 6,
    title: "Retail & OOH Adaptations",
    description:
      "Instantly resize and reversion ads for in-store screens, DOOH, and window displays without agencies.",
    imageUrl:
      "https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    number: 7,
    title: "Creator Marketplace Listings",
    description:
      "List your AI-generated spots for brands to buy, rent, or customize—turn creativity into revenue.",
    imageUrl:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    number: 8,
    title: "Ad Refresh in 60s",
    description:
      "Swap offers, colors, or hooks on the fly to beat fatigue and keep winning creatives live.",
    imageUrl:
      "https://images.pexels.com/photos/8217546/pexels-photo-8217546.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    number: 9,
    title: "Brand Films",
    description:
      "Cinematic storytelling with AI-directed lighting, music, and pacing—no crews or cameras required.",
    imageUrl:
      "https://images.pexels.com/photos/6898857/pexels-photo-6898857.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    number: 10,
    title: "Cultural Intelligence",
    description:
      "Tone, faces, wardrobe, and soundtracks adapt to each region while preserving brand standards.",
    imageUrl:
      "https://images.pexels.com/photos/1181527/pexels-photo-1181527.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const AppsShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getCardsPerView = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());
  const maxIndex = Math.max(0, useCases.length - cardsPerView);

  useEffect(() => {
    const handleResize = () => {
      const newCardsPerView = getCardsPerView();
      setCardsPerView(newCardsPerView);
      setCurrentIndex((prev) =>
        Math.min(prev, Math.max(0, useCases.length - newCardsPerView))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleCards = useCases.slice(currentIndex, currentIndex + cardsPerView);

  return (
    <section className="bg-gradient-to-b from-white via-[#f7f7f7] to-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-normal tracking-[-1px] sm:tracking-[-2px] text-gray-900 mb-3">
            Use cases made for advertisers
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-gray-600 px-4 sm:px-0">
            Zero Human outperforms Runway, HeyGen, and Synthesia where it
            matters—shipping voice-directed, 4K, performance-ready ads and
            marketplace listings across every channel and region.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-gray-900 transition-colors hover:text-gray-600 text-sm font-medium"
            >
              View all use cases
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full sm:w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {useCases.map((useCase) => (
                  <button
                    key={useCase.number}
                    onClick={() => {
                      setCurrentIndex(Math.min(useCase.number - 1, maxIndex));
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="font-medium text-sm text-gray-900">
                      {useCase.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {useCase.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="rounded-full border border-gray-200 p-2 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="rounded-full border border-gray-200 p-2 text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={currentIndex >= maxIndex}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs text-gray-500">
              {currentIndex + 1} - {Math.min(currentIndex + cardsPerView, useCases.length)} of {useCases.length}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCards.map((useCase) => (
            <div
              key={useCase.number}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] bg-white"
            >
              <div className="aspect-[4/5]">
                <img
                  src={useCase.imageUrl}
                  alt={useCase.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="text-xs text-gray-500 font-medium">
                  #{useCase.number.toString().padStart(2, "0")}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {useCase.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppsShowcase;
