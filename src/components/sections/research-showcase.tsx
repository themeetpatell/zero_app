"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const researchData = [
  {
    title: 'Introducing Zero V1',
    date: 'Research / Auguest 20, 2025',
    href: '/research/introducing-zero-v1',
    imgSrc: '/zero-v1.jpg', // Added leading slash
    imgAlt: 'Voice-directed video generation breakthrough',
  },
  {
    title: 'Intelligently built Zero Co-Director',
    date: 'Research / December 11, 2025',
    href: '/research/zero-co-director',
    imgSrc: '/zero co-director img.jpg', // Added leading slash
    imgAlt: 'AI Co-Director recommendation system',
  },
];

const ResearchShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-black via-[#0d0f11] to-black pt-20 text-white lg:pt-32 pb-12 overflow-hidden">
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        <div className="absolute left-[-20%] top-0 h-full w-2/3 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="absolute right-[-10%] bottom-0 h-full w-2/3 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.06),transparent_45%)]" />
      </div>
      <div className="rw-container relative">
        <div className={`lg:w-7/12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="mb-4 text-xs font-medium text-white/60">OUR RESEARCH</p>
          <h2 className="mb-8 text-[36px] font-normal leading-[1.15] tracking-[-0.72px] lg:text-[40px] lg:leading-none lg:tracking-[-1.6px]">
            Pioneering voice-directed cinematic AI that transforms how brands create video advertising.
          </h2>
          <Link
            href="/research"
            className="rw-cta-text mb-10 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white px-4 pt-[10px] pb-[11px] text-black bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] lg:mb-20"
          >
            Read more
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {researchData.map((item, index) => (
            <Link 
              href={item.href}
              key={item.title} 
              className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  width={506}
                  height={285}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <p className="text-base text-white transition-colors duration-200 group-hover:text-white/70">{item.title}</p>
              <p className="text-xs text-white/60">{item.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchShowcase;
