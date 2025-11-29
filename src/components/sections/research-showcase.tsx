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
    <section ref={sectionRef} className="bg-black pt-20 text-white lg:pt-32 pb-10">
      <div className="rw-container">
        <div className={`lg:w-7/12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="mb-4 text-xs font-medium text-white/60">OUR RESEARCH</p>
          <h2 className="mb-8 text-[36px] font-normal leading-[1.15] tracking-[-0.72px] lg:text-[40px] lg:leading-none lg:tracking-[-1.6px]">
            Pioneering voice-directed cinematic AI that transforms how brands create video advertising.
          </h2>
          <Link
            href="/research"
            className="rw-cta-text mb-10 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white px-4 pt-[10px] pb-[11px] text-white transition-all duration-200 hover:bg-white hover:text-black lg:mb-20"
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
              <div className="relative mb-4 overflow-hidden rounded-xl">
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