"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import { Plus, ArrowUp, ArrowRight, Mic, Sparkles, SlidersHorizontal } from 'lucide-react';
import SearchInputContainer from '../dashboard/search/search-input-container';

const HeroSection = () => {
  const [prompt, setPrompt] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        const scrollY = window.scrollY;

        // Calculate scroll progress through the section (0 to 1)
        const progress = Math.min(Math.max((scrollY - sectionTop + window.innerHeight) / sectionHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [prompt]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const suggestionLinks = [
    {
      isNew: true,
      text: "Voice-to-video that ships 4K ads fast. See how.",
      href: "/research/introducing-zero-v1",
      isExternal: false,
      paddingClass: "py-3 md:p-3",
    },
    {
      text: "Script, cast, and render a 4K product ad in 60 seconds",
      href: "/signin",
      isExternal: false,
      paddingClass: "p-3",
    },
    {
      text: "Spin up UGC + performance variants for TikTok/Meta",
      href: "/signin",
      isExternal: false,
      paddingClass: "p-3",
    },
    {
      text: "List this ad in the marketplace for brands to rent",
      href: "/signin",
      isExternal: false,
      paddingClass: "p-3",
    },
  ];

  // Calculate video opacity and blur based on scroll
  const videoOpacity = Math.min(scrollProgress * 2, 1);
  const blurAmount = Math.max(2 - scrollProgress * 4, 0.4);
  const handleGenerate = (query: string) => {
    if (!query.trim()) return;
  };
  return (
    <section ref={sectionRef} className="bg-black relative transition-all duration-200 overflow-hidden h-screen flex items-center">
      {/* Background Video Layer - More visible */}
      <div
        className="absolute inset-0 z-0 transition-all duration-700"
        style={{
          opacity: 0.6 + (videoOpacity * 0.3),
          filter: `blur(${blurAmount * 0.5}px)`,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="herovideo.mp4" type="video/mp4" />
        </video>
        {/* Depth gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div
        className={`px-6 lg:px-10 w-full max-w-6xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="bg-black/35 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left side - Headline */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white/80">
                Voice-first • Ad-native
              </div>
              <h1 className="text-[42px] sm:text-[52px] lg:text-[62px] xl:text-[68px] tracking-[-0.03em] font-sans leading-[0.95] text-white font-medium">
                Voice-to-video ads by AI Co-Director
                <br />
                + marketplace.
              </h1>
              <p className="text-white/80 text-base lg:text-lg font-light leading-relaxed">
                Speak your brief. Zero Human scripts, casts, scores, and ships a
                4K ad in under 60 seconds—ready to publish or list.
              </p>
            </div>

            {/* Right side - Input Form */}
            <div className="lg:col-span-6 animate-fade-in-up flex flex-col gap-4" style={{ animationDelay: '200ms' }}>
              <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-white/25 via-white/10 to-white/25 rounded-2xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-4">
                  <SearchInputContainer
                    onGenerate={handleGenerate}
                    showRecommendations={false}
                    showSettingsButton={false}
                    blur={true}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {suggestionLinks.slice(0, 4).map((link, index) => {
                  const Wrapper = link.isExternal ? 'a' : Link;
                  return (
                    <div
                      key={index}
                      className="group animate-fade-in-up"
                      style={{ animationDelay: `${300 + index * 60}ms` }}>
                      <Wrapper
                        href={link.href}
                        className="block relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg border border-white/15 px-3.5 py-3 transition-all duration-300 hover:bg-white/10 hover:border-white/25 cursor-pointer">
                        <div className="flex items-center gap-2">
                          {link.isNew && (
                            <span className="text-[10px] font-semibold tracking-wide uppercase bg-white text-black px-2 py-0.5 rounded-full">New</span>
                          )}
                          <span className="text-sm text-white leading-snug flex-1">
                            {link.text}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 text-white/70 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </Wrapper>
                    </div>
                  );
                })}
              </div>

              <div className="text-white/50 text-[11px] text-center font-light leading-relaxed">
                By sending a message, you agree to our{' '}
                <Link href="/terms-of-use" target='_blank' className="text-white/70 hover:text-white transition-colors underline underline-offset-2">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" target='_blank' className="text-white/70 hover:text-white transition-colors underline underline-offset-2">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
};

export default HeroSection;
