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
      text: "Voice-directed video ads. Learn more.",
      href: "/research/introducing-zero-v1",
      isExternal: false,
      paddingClass: "py-3 md:p-3"
    },
    {
      text: "Create a cinematic product ad for my sneaker brand",
      href: "/generate?ask=Create%20a%20cinematic%20product%20ad%20for%20my%20sneaker%20brand",
      isExternal: true,
      paddingClass: "p-3"
    },
    {
      text: "Generate a 30-second TikTok ad for my skincare line",
      href: "/generate?ask=Generate%20a%2030-second%20TikTok%20ad%20for%20my%20skincare%20line",
      isExternal: true,
      paddingClass: "p-3"
    },
    {
      text: "Make a dramatic product reveal video for my watch",
      href: "/generate?ask=Make%20a%20dramatic%20product%20reveal%20video%20for%20my%20watch",
      isExternal: true,
      paddingClass: "p-3"
    }];

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
        {/* Right to left gradient - darker on right where form is */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-black/20" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      </div>

      <div className={`px-6 lg:px-8 w-full max-w-7xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Headline */}
          <div className="lg:col-span-5">
            <h1 className="text-[48px] lg:text-[64px] xl:text-[72px] tracking-[-0.02em] font-sans leading-[0.95] text-white font-medium mb-4 animate-fade-in-up">
              Speak your
              <br />
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                vision and get cinematic ads in seconds.
              </span>
            </h1>
            <p className="text-[#b3b3b3] text-base lg:text-lg font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              Just describe your product—our AI Co-Director handles the rest.
            </p>
          </div>

          {/* Right side - Input Form */}
          <div className="lg:col-span-7 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <form className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-white/30 via-white/5 to-white/30 rounded-[18px] blur-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Main glassmorphic container with stronger effect */}
              {/* <div className="relative flex flex-col w-full bg-black/[0.42] backdrop-blur-2xl border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-white rounded-[18px] p-6 transition-all duration-500 group-hover:bg-white/[0.15] group-hover:border-white/40 group-hover:shadow-[0_8px_48px_0_rgba(255,255,255,0.1)]">
                
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <textarea
                      ref={textareaRef}
                      value={prompt}
                      onChange={handleInputChange}
                      placeholder="Describe your product or service ad..."
                      className="border-0 bg-transparent text-white text-base outline-none resize-none w-full min-h-[80px] max-h-[120px] overflow-y-auto placeholder:text-white/50 font-light leading-relaxed"
                      rows={3} />
                  </div>
                  
                  <button
                    type="button"
                    disabled
                    className="h-10 w-10 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 cursor-not-allowed opacity-30 transition-all duration-200 flex-shrink-0">
                    <SlidersHorizontal className="h-4 w-4 text-white" />
                  </button>
                </div>

                <div className="flex justify-between items-center gap-3 pt-3 border-t border-white/20">
                  <div className="text-white/50 text-xs font-light">
                    {prompt.length > 0 ? `${prompt.length} characters` : 'Start typing to generate...'}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-11 w-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/25 hover:border-white/50 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 active:scale-95"
                      disabled={!prompt}>
                      <Mic className="h-5 w-5 text-white" />
                    </button>
                    <button
                      type="submit"
                      className="h-11 px-6 rounded-xl bg-white text-black flex items-center justify-center gap-2 border-0 hover:bg-white/95 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 active:scale-95 font-medium"
                      disabled={!prompt}>
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm">Generate</span>
                    </button>
                  </div>
                </div>
              </div> */}
              <SearchInputContainer
  onGenerate={handleGenerate}
  showRecommendations={false}
  showSettingsButton={false}
  blur={true}                    // ← enables 2xl background blur
/>


            </form>

            {/* Suggestion chips - compact with enhanced glass */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {suggestionLinks.slice(0, 4).map((link, index) => {
                const Wrapper = link.isExternal ? 'a' : Link;
                return (
                  <div
                    key={index}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${450 + index * 75}ms` }}>
                    <Wrapper
                      href={link.href}
                      className="block relative overflow-hidden rounded-xl bg-sidebar/80 backdrop-blur-3xl border border-white/20 px-3 py-2.5 transition-all duration-300 hover:bg-white/[0.12] hover:border-white/35 hover:translate-y-[-2px] cursor-pointer">
                      <div className="flex items-center gap-2">
                        {link.isNew && (
                          <div className="px-2 py-0.5 bg-white rounded-md inline-flex justify-center items-center flex-shrink-0">
                            <div className="text-black text-[10px] font-bold leading-none tracking-wider">NEW</div>
                          </div>
                        )}
                        <div className="text-white/80 group-hover:text-white transition-colors duration-300 text-xs font-light truncate flex-1">
                          {link.isNew ? link.text.replace(' Learn more.', '') : link.text}
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-white/40 group-hover:text-white/90 transition-all duration-300 group-hover:translate-x-0.5 flex-shrink-0" />
                      </div>
                    </Wrapper>
                  </div>
                );
              })}
            </div>

            {/* Footer - compact */}
            <div className="text-white/40 text-[11px] text-center mt-6 animate-fade-in font-light leading-relaxed" style={{ animationDelay: '750ms' }}>
              By sending a message, you agree to our{' '}
              <Link href="/terms-of-use" target='_blank' className="text-white/60 hover:text-white/90 transition-colors underline underline-offset-2">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" target='_blank' className="text-white/60 hover:text-white/90 transition-colors underline underline-offset-2">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);
};

export default HeroSection;