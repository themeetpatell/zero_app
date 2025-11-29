"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HeaderNavigation from "@/components/sections/header-navigation";
import FooterNavigation from "@/components/sections/footer-navigation";


// Utility function for className merging
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

// ========== NAVIGATION HEADER ==========
const ZeroHumanLogo = () => (
  <svg
    width="87"
    height="15"
    viewBox="0 0 87.15 14.41"
    className="fill-current transition-all duration-200"
    aria-label="Zero Human logo"
  >
    <path d="M12.63,14.41V0H16.1V11.12H25.01v3.29Z" />
    <path d="M43.08,1.48V4.76H36.95V0H50.93V14.41H47.46V4.76h-4.38V1.48Z" />
    <path d="M29.5,14.41V0h11.84V3.29H32.97V5.57h7.53V8.86H32.97v2.22h8.59v3.33Z" />
    <path d="M62.06,14.41V0h3.47V14.41Z" />
    <path d="M80.1,14.41V0h6.12v11.23L76.14,0h-3.66V14.41h3.47V3.28L86.05,14.41h-5.95Z" />
    <path d="M5.9,14.41c-3.3,0-5.9-2.56-5.9-5.81S2.6,2.78,5.86,2.78c1.69,0,3.09,.62,4.08,1.71l-2.25,2.17c-.66-.58-1.39-.84-1.9-.84-1.46,0-2.3,1.09-2.3,2.77s.85,2.78,2.3,2.78c.53,0,1.16-.27,1.84-.84l2.25,2.17c-1.03,1.1-2.41,1.71-4.08,1.71Z" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="23" height="9" viewBox="0 0 23 9" className="fill-current">
    <rect y="0" width="23" height="1" />
    <rect y="4" width="23" height="1" />
    <rect y="8" width="23" height="1" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" className="fill-current">
    <path d="M1.06 17.99L0 16.93L7.94 8.99L0 1.06L1.06 0L8.99 7.94L16.93 0L17.99 1.06L10.05 8.99L17.99 16.93L16.93 17.99L8.99 10.05L1.06 17.99Z" />
  </svg>
);

const navLinks = [
  { name: "RESEARCH", href: "/research" },
  { name: "COMPANY", href: "/company" },
];

// ========== HERO SECTION ==========
const HeroSection = () => {
  return (
    <section className="bg-white">
      <div className="relative mx-auto flex h-[470px] w-full flex-col items-center justify-center overflow-hidden text-white lg:aspect-video lg:max-h-[900px] xl:h-auto">
        <img
          src="/zero human company.jpeg"
          alt="An office workspace with two people collaborating on a laptop."
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mt-auto mb-6 w-full text-center lg:mb-12 z-10">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
            <div className="mx-auto w-full">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-normal mb-2 tracking-tight lg:mb-25">
                Every business deserves to tell a story.
                <br className="hidden lg:block" /><br className="hidden lg:block" />
                {' '}Every brand deserves to be seen.
              </h1>
              <div className="flex flex-col items-center justify-center gap-1.5 md:flex-row mt-9">
                {/* <a
                  href="/careers"
                  className="text-sm inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white bg-white px-4 py-2 text-black transition-all duration-200 hover:bg-gray-200"
                >
                  View Careers
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ========== MISSION STATEMENT ==========
const MissionStatement = () => {
  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="mx-auto flex flex-col gap-6 pt-16 pb-16 lg:w-7/12 lg:pt-40 lg:pb-40">
            <div className="whitespace-pre-line text-lg leading-relaxed font-light text-black">
  <span className="font-normal">Zero Human turns voice to light.</span>
  {`
Speak your vision, clear and bright.

Born from resilience,
Built through countless nights,
From zero to vision—
We democratize creation.

No cameras. No crews. No delays.
Just your voice, your vision, your story.

Where traditional production takes weeks,
We deliver in seconds.
Where budgets reach tens of thousands,
We make it accessible to all.

Zero Human is more than technology—
It's empowerment through AI.
Voice-directed. Cinematic. Instant.

Every business deserves to tell their story.
Every brand deserves to be seen.
We're building the future of advertising,

AI-powered, made for you,
Zero Human makes your vision true.`}
</div>

    </div>
      </div>
    </section>
  );
};

// ========== VIDEO SHOWCASE ==========
const VideoShowcase = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <section className="bg-white">
      <div className="mx-auto pb-12 max-w-6xl px-4 lg:pb-24">
        <div className="relative">
          <img
            className="w-full rounded-sm object-cover cursor-pointer"
            src="/AI-History-Timeline Zero Human.jpg"
            alt="About video poster"
            onClick={() => {
              setIsPlaying(true);
              handlePlayPause();
            }}
          />

          
        </div>
      </div>
    </section>
  );
};

// ========== OFFICE LOCATIONS ==========
const officeImages = [
  "/team.jpeg",
  "/team 1.jpg",
  "/team 2.jpg",
  "/team 3.jpg",
  "/team 4.jpg",
  "/team 5.jpg",

];

const OfficeLocations = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-white pt-10 lg:pt-20">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="mx-auto mb-24 text-center text-xl lg:text-2xl lg:w-10/12">
          Currently, we operate as a close-knit founding team from different countries, collaborating closely to develop our vision
        </div>
      </div>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>

        <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
          <div 
            ref={scrollContainerRef}
            className="flex gap-2 px-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {officeImages.map((src, index) => (
              <div
                key={index}
                className="h-[200px] w-2/3 shrink-0 overflow-hidden rounded-sm lg:h-[500px] lg:w-auto"
              >
                <img
                  src={src}
                  alt={`Runway office photo ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ========== RESEARCH SHOWCASE ==========
const researchCards = [
  {
    href: "/research/introducing-zero-v1",
    imgSrc: "/zero human v1 research.jpg",
    imgAlt: "Introducing Zero V1",
    title: "Introducing Zero V1",
    category: "Research",
    date: "August 20, 2025",
  },
  {
    href: "/research/zero-co-director",
    imgSrc: "/zero co-director research.jpeg",
    imgAlt: "Intelligently built Zero Co-Director",
    title: "Intelligently built Zero Co-Director",
    category: "Research",
    date: "December 11, 2025",
  },
];

const ResearchShowcase = () => {
  return (
    <section className="flex flex-col items-start bg-black text-white relative pt-20 lg:pt-24 pb-10">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 w-full">
        <div className="mx-auto">
          <div className="lg:w-1/2 mb-4">
            <div className="text-xs tracking-wider mb-2">OUR RESEARCH</div>
            <div className="text-xl lg:text-2xl">Creating AI Foundation Models that Merge Dialogue, Physics, and Visuals.</div>
          </div>
          <a
            href="/research/introducing-zero-v1"
            className="text-sm px-4 py-2 rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap text-white border border-white hover:bg-white hover:text-black"
          >
            Read more
          </a>
          <div className="grid md:grid-cols-2 w-full mt-8 lg:mt-10 gap-9 md:gap-6">
            {researchCards.map((card, index) => (
              <a key={index} href={card.href} className="group">
                <div className="aspect-video w-full mb-3 rounded-sm overflow-hidden">
                  <img
                    src={card.imgSrc}
                    alt={card.imgAlt}
                    className="w-full h-full object-cover transform-gpu group-hover:scale-110 transition-all duration-[3s] ease-linear"
                  />
                </div>
                <h3 className="text-2xl leading-tight pr-5 group-hover:opacity-70 transition-opacity duration-200">
                  {card.title}
                </h3>
                <div className="mt-1">
                  <span className="text-sm text-gray-400">{card.category} /</span>
                  <span className="text-sm text-gray-400 ml-1">{card.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ========== OPEN ROLES ==========
const OpenRoles = () => {
  return (
    <section className="pt-20 lg:pt-36 mb-16 lg:mb-32 bg-white text-black">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="lg:w-11/12 mx-auto">
          <div className="flex flex-col items-center justify-center mb-5 lg:mb-10">
            <h2 className="text-4xl lg:text-5xl font-light text-center">Open Roles</h2>
          </div>
          <div className="border-t border-gray-300 py-16 text-center">
            <p className="text-lg text-gray-500">Soon Hiring</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ========== MAIN PAGE COMPONENT ==========
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNavigation />
      <main>
        <HeroSection />
        <MissionStatement />
        <VideoShowcase />
        <OfficeLocations />
        <ResearchShowcase />
        <OpenRoles />
      </main>
        <FooterNavigation />
    </div>
  );
}