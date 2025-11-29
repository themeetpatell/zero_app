"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const initiatives = [
{
  href: '/student-programs',
  imgSrc: '/student programs.jpeg',
  title: 'Student Programs',
  description: 'Empowering students to build product videos with professional support and guidance.',
  linkText: 'Learn More'
}];


const StudiosFeature = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
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
    <section ref={sectionRef} className="bg-black pt-24 lg:pt-32">
      <div className="pt-16 lg:pt-40">
        <div className="rw-container">
          <div className="text-center mb-10">
            <div className="rw-eyebrow mb-5 !whitespace-pre-line text-white">Zero Human studio</div>
            <h2 className="text-5xl lg:text-[80px] font-normal leading-none tracking-[-2px] lg:tracking-[-3.2px] text-white">
              For brands to create a professional advertisement
            </h2>
          </div>

          <div className="w-full relative rounded-lg overflow-hidden border border-white/10 mb-20 lg:mb-40 group cursor-pointer">
            <div className="aspect-[16/9]">
              <video
                className="w-full h-full object-cover"
                poster=""
                autoPlay
                loop
                muted
                playsInline>
                <source
                  src="zero human dialogues.mp4"
                  type="video/mp4" />
              </video>
            </div>
            <div className="text-xs absolute bottom-3 left-3 text-white/60">
              Creative Dialogues - Zero Human Studios
            </div>
          </div>

          {/* Studios Description */}
          <div className="pt-24 lg:pt-32 pb-16 lg:pb-32">
            <div className="rw-container">
              <div className={`max-w-[770px] mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-lg lg:text-[22px] leading-snug font-normal mb-8 !whitespace-pre-line text-white animate-fade-in-up animation-delay-200">Zero Human studios is the entertainment and production arm, dedicated to producing brand advertisement, videos that describes your product or service, short films, documentries, ads recommendation for your brand story, and much more beyond imagination on a click...
                </p>
                <a
                  className="rw-cta-text px-4 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap bg-transparent text-white border border-white hover:bg-white hover:text-black hover:scale-105 !whitespace-pre-line animate-fade-in-up animation-delay-400"
                  href="/signin">Go to experience Zero Co-Director 
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Initiatives Section */}
          <div className="bg-white">
            <div className="pt-24 lg:pt-20 pb-16 lg:pb-40">
              <div className="rw-container">
                <div className="pb-10 lg:pb-16 text-center lg:text-left animate-fade-in-up animation-delay-200">
                  <h3 className="text-[32px] lg:text-[40px] tracking-[-0.64px] lg:tracking-[-1.6px] leading-[1.2] lg:leading-none font-normal text-black !whitespace-pre-line">Zero Human Initiatives

                  </h3>
                </div>
                <div className="grid lg:grid-cols-1 gap-6 max-w-md mx-auto">
                  {initiatives.map((item, index) =>
                  <div key={index} className="animate-scale-in" style={{ animationDelay: `${400 + index * 200}ms` }}>
                      <div className="rounded-lg overflow-hidden mb-5 border border-black/10 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                        <div className="aspect-[16/9]">
                          <Image
                          src={item.imgSrc}
                          alt={item.title}
                          width={500}
                          height={375}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                        </div>
                      </div>
                      <div className="pb-4">
                        <h4 className="text-[22px] lg:text-[28px] tracking-[-0.44px] lg:tracking-[-0.56px] leading-[1.3] font-normal text-black mb-2 transition-colors duration-200 hover:text-medium-gray">
                          {item.title}
                        </h4>
                        <p className="text-base leading-relaxed text-medium-gray mb-4">
                          {item.description}
                        </p>
                        <a
                        href={item.href}
                        className="inline-flex items-center text-black hover:text-medium-gray transition-all duration-200 hover:translate-x-2 group">
                          <span className="text-base font-medium">{item.linkText}</span>
                          <span className="ml-2 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">Soon</span>
                          <svg className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default StudiosFeature;