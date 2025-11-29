"use client";

import React, { useEffect, useRef, useState } from 'react';

const MiaLogo = () => (
    <svg viewBox="0 0 102 32" className="w-full h-auto" fill="currentColor">
        <path d="M16.48 31.06V2.26h5.36v5.88l10.74 16.24L43.32 8.14v-5.88h5.36v28.8H43.32V11.22l-10.74 16.24-10.74-16.24v19.84H16.48zM68.5 31.06V2.26h5.36v28.8H68.5zM96.25 12.34c-4.66 0-7.73 2.96-7.73 7.51s3.07 7.51 7.73 7.51h5.79V2.26H96.25v28.8h5.79v-7.51h-5.79zm0 9.87c-1.56 0-2.42-1.12-2.42-2.36s.86-2.36 2.42-2.36h.1v4.72h-.1zM0 31.06V2.26h5.36v28.8H0z" />
    </svg>
);

const AdobeLogo = () => (
    <svg viewBox="0 0 30 26" className="w-full h-auto" fill="currentColor">
        <path d="M18.88,19.62H15.12L12,26H7.63l10.25-26h4.5L30,26H25.5ZM17,7.75,14.62,14.5h4.75ZM0,0V26H9.75V0Z" />
    </svg>
);

const AllstateLogo = () => (
    <svg viewBox="0 0 145 32" className="w-full h-auto" fill="currentColor">
        <path d="M17.4,12.7H29L23.2,0,17.4,12.7ZM14.9,18.3,7.4,32,23.1,15.1l5.5,11.2L34.1,15,50,32,42.5,18.3h2.1L53.2,32,37.3,15.1l-5.6,11.2-5.5-11.2L10.6,32,22.2,15.1h2.2L14.9,18.3ZM56,18.3V32h8.7V18.3H56Zm20.8,0V32h8.7V18.3H76.8Zm19.1,13.7h8.8a12.3,12.3,0,0,0,0-24.6H95.9v24.6Zm8.4-18a5.6,5.6,0,0,1,0,11.2h-2.9V22.8H104Zm19.9-1.2h-5.5l-6,14.9h8.8l1.3-3.7h7.2l1.3,3.7h8.8Zm.4,7.5h-5.7l2.9-7,2.8,7ZM145,18.3V32h-8.7V22.2h-2.1v9.8H125.5V18.3h8.7v2.7h2.1V18.3Z" />
    </svg>
);

const AbcNetworksLogo = () => (
    <svg viewBox="0 0 116 32" className="w-full h-auto" fill="currentColor">
        <path d="M16 32C7.16 32 0 24.84 0 16S7.16 0 16 0s16 7.16 16 16-7.16 16-16 16zm0-5a11 11 0 1 0 0-22 11 11 0 0 0 0 22zM52.32 10.37c-3.5-3.5-8-3.5-11.5 0-3.15 3.15-3.5 7.65-1.05 11.2l-2.45 2.45L40 26.72l2.45-2.45c3.55 2.45 8.05 2.1 11.2-1.05 3.5-3.5 3.5-8 .35-11.5zM48.82 22a6.3 6.3 0 0 1-9 0 6.3 6.3 0 0 1 0-9c2.45-2.45 6.65-2.45 9 0s2.45 6.65 0 9zM88.75 10.37c-3.15-3.5-7.65-3.5-11.2-1.05L75.1 7.22 72.35 10l2.1 2.1c-2.45 3.55-2.1 8.05 1.05 11.2 3.5 3.5 8 3.5 11.5 0s3.5-8 .35-11.5zm-3.5 7.88a6.3 6.3 0 0 1-9 0c-2.45-2.45-2.45-6.65 0-9s6.65-2.45 9 0 2.45 6.65 0 9z" />
    </svg>
);

const GutLogo = () => (
    <svg viewBox="0 0 68 28" className="w-full h-auto" fill="currentColor">
        <path d="M22.51 27.68h-9.9C5.41 27.68.91 22.18.91 14.18S5.01.68 13.91.68c5.4 0 9.2 2.6 10.4 7.4l-7.3 2.1c-.5-2-2.3-3.2-5.2-3.2-4.1 0-5.8 2.8-5.8 7.2s1.7 7.2 5.8 7.2c3 0 5-1.3 5.4-3.5l7.2 2C29.61 24.78 26.11 27.68 22.51 27.68zM41.71 27.28V.98h7.9v26.3h-7.9zM52.81 27.28l6-10.9-5.9-10.9h8.8l1.6 3.6 3.9-3.6h8.8L69.81 16.38l6.3 10.9h-8.8l-2.4-4.8-3.7 4.8h-8.38z" />
    </svg>
);

const LegendaryLogo = () => (
    <svg viewBox="0 0 102 14" className="w-full h-auto" fill="currentColor">
        <path d="M0 13.2V0h5.2v8h10.4V0h5.2v13.2H15.6v-2h-10v2zm26 0V0h5.2v13.2zm20.8-2.8V2.8H41.6v10.4h10.4V8H46.8V5.6h5.2zm20.8 2.8V0h13.2c4.4 0 7.6 2.8 7.6 6.6s-3.2 6.6-7.6 6.6zm5.2-9.6h2.8c1.6 0 2.4.8 2.4 2.8s-.8 2.8-2.4 2.8h-2.8z M102 13.2l-5.2-6.6L102 0h-6l-5.2 6.6-5.2-6.6h-6l5.2 6.6-5.2 6.6h6l5.2-6.6 5.2 6.6z" />
    </svg>
);

const LionsgateLogo = () => (
    <svg viewBox="0 0 103 27" className="w-full h-auto" fill="currentColor">
        <path d="M0 26.1V0h7v26.1H0zM15.4.4h7v25.7h-7V.4zM30.7 26.1V.4h23.4v6.5H37.7v3.6h14.9v6.5H37.7v2.6h16.4v6.5H30.7zM62.6.4h7v25.7h-7V.4zM77.9.4h7v14.9L95.5.4h9.1v25.7h-6.7V10.8L84.8 26.1h-6.9V.4z" />
    </svg>
);

const UbisoftLogo = () => (
    <svg viewBox="0 0 26 28" className="w-full h-auto" fill="currentColor">
        <path d="M13.2.3c-2.3 0-4.5.3-6.6.9 7.4 1 13.1 7.2 13.1 14.8C19.7 9.1 17 3.5 13.2.3zM3.4 4.5C1.3 6.6.1 9.3.1 12.3c0 7.4 6 13.4 13.4 13.4 2.7 0 5.2-.8 7.2-2.1-1.2 3-4.2 5.1-7.7 5.1-4.7 0-8.6-3.8-8.6-8.6 0-3.3 1.9-6.2 4.6-7.6C9.2 8.6 6.2 6.4 3.4 4.5z" />
        <path d="M25.6 15.9c0-6-4.9-10.9-10.9-10.9-3.3 0-6.2 1.5-8.2 3.8C4 10.9 2.5 14 .9 17.5c1.4 6.7 7.3 11.6 14.3 10.7 5.4-.7 9.8-5 10.4-10.4.1-.7.1-1.3.1-2z" />
    </svg>
);

const MicrosoftLogo = () => (
    <svg viewBox="0 0 21 21" className="w-full h-auto" fill="currentColor">
        <path d="M1 1h9v9H1z" /><path d="M1 11h9v9H1z" /><path d="M11 1h9v9h-9z" /><path d="M11 11h9v9h-9z" />
    </svg>
);

const RobinhoodLogo = () => (
    <svg viewBox="0 0 119 21" className="w-full h-auto" fill="currentColor">
        <path d="M0 20.3V.6h8.3v19.7H0zm55.4 0c-4.4 0-7.8-1.2-10-3.7l5.3-5.2c1.4 1.5 3.3 2.3 5.7 2.3 2.8 0 4.2-.9 4.2-2.6 0-.7-.1-1.3-.4-1.8l-.4-.7-6.1-2.9c-4.7-2.2-7-4.6-7-9 0-3.9 2.8-6.9 7.8-6.9 3.5 0 6.1 1 8.1 3l-4.7 5.4c-1.1-.9-2.5-1.4-4-1.4-1.9 0-2.8.7-2.8 2s.9 2 3.1 2.9l5.9 2.8c5.4 2.5 7.9 5.2 7.9 9.6 0 4.5-3.4 7.5-8.8 7.5zM22.2 20.3c-4.9 0-8.4-3.5-8.4-9.8s3.5-9.8 8.4-9.8 8.4 3.5 8.4 9.8-3.5 9.8-8.4 9.8zm0-14.4c-2 0-3.1 2-3.1 4.6s1.1 4.6 3.1 4.6 3.1-2 3.1-4.6-1.1-4.6-3.1-4.6zm78.1 14.1L88.9 14v6.3h-8V.6h11.2c7.2 0 11.2 3.9 11.2 9.5 0 4.2-2.3 7-6.1 8.5l9.3 8.3h-10zm-2.8-14.1h3.3c3.7 0 5.6-2.1 5.6-5.2s-2-5.2-5.6-5.2h-3.3v10.4z" />
    </svg>
);

const logoData = [
    { Component: MiaLogo, className: 'max-w-[71px]' },
    { Component: AdobeLogo, className: 'max-w-[25px]' },
    { Component: AllstateLogo, className: 'max-w-[115px]' },
    { Component: AbcNetworksLogo, className: 'max-w-[80px]' },
    { Component: GutLogo, className: 'max-w-[65px]' },
    { Component: LegendaryLogo, className: 'max-w-[95px]' },
    { Component: LionsgateLogo, className: 'max-w-[95px]' },
    { Component: UbisoftLogo, className: 'max-w-[25px]' },
    { Component: MicrosoftLogo, className: 'max-w-[21px]' },
    { Component: RobinhoodLogo, className: 'max-w-[110px]' },
];

const EnterprisePartnersMarquee = () => {
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
        <section ref={sectionRef} className="bg-white py-20 lg:py-32 relative overflow-hidden">
            <div className={`rw-container transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-center mb-12 animate-fade-in-up">
                    <p className="text-sm font-medium text-medium-gray tracking-wide uppercase">
                        Select Enterprise Partners
                    </p>
                </div>

                <div className="relative animate-fade-in animation-delay-400">
                    <div className="absolute left-0 top-0 bottom-0 z-10 w-10 lg:w-20 bg-gradient-to-r from-white" />
                    
                    <div className="flex animate-marquee will-change-transform hover:pause">
                        <div className="flex flex-shrink-0 items-center justify-around gap-20 px-10">
                            {logoData.map(({ Component, className }, index) => (
                                <div 
                                    key={`primary-${index}`} 
                                    className={`flex-shrink-0 flex items-center justify-center ${className} transition-all duration-300 hover:scale-110 hover:opacity-100`}
                                >
                                    <Component />
                                </div>
                            ))}
                        </div>
                        <div aria-hidden="true" className="flex flex-shrink-0 items-center justify-around gap-20 px-10">
                            {logoData.map(({ Component, className }, index) => (
                                <div 
                                    key={`duplicate-${index}`} 
                                    className={`flex-shrink-0 flex items-center justify-center ${className} transition-all duration-300 hover:scale-110 hover:opacity-100`}
                                >
                                    <Component />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute right-0 top-0 bottom-0 z-10 w-10 lg:w-20 bg-gradient-to-l from-white" />
                </div>
            </div>
        </section>
    );
};

export default EnterprisePartnersMarquee;