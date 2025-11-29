"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download, Share2, Check, X } from 'lucide-react';

const IntroducingZeroV1Page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const shareUrl = "https://www.zerohuman.co/research/introducing-zero-v1";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownloadPDF = () => {
    // Add print-friendly class to body
    document.body.classList.add('printing');
    
    // Use browser's native print dialog
    // User can then save as PDF from the print dialog
    window.print();
    
    // Remove print-friendly class after print dialog closes
    setTimeout(() => {
      document.body.classList.remove('printing');
    }, 1000);
  };

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          /* Hide elements that shouldn't be in PDF */
          header,
          .print-hide,
          button {
            display: none !important;
          }
          
          /* Ensure content flows properly */
          body {
            background: white !important;
          }
          
          /* Remove fixed positioning */
          * {
            position: static !important;
          }
          
          /* Optimize images for print */
          img {
            max-width: 100% !important;
            page-break-inside: avoid;
          }
          
          /* Better page breaks */
          section {
            page-break-inside: avoid;
          }
          
          h1, h2, h3 {
            page-break-after: avoid;
          }
          
          /* Remove shadows and borders that don't print well */
          .shadow-xl,
          .shadow-lg,
          .shadow-2xl {
            box-shadow: none !important;
          }
          
          /* Ensure proper spacing */
          .pt-32 {
            padding-top: 2rem !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-white">
        {/* Share Dialog */}
        {showShareDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm print-hide">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-lg font-semibold">Share Link</h3>
                <button 
                  onClick={() => setShowShareDialog(false)}
                  className="p-1 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Copy the link below to share this research
                </p>
                <div className="flex items-center gap-2 p-3 bg-off-white rounded-lg border border-border">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
                <button
                  onClick={handleCopyLink}
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-off-black text-white rounded-full hover:bg-dark-gray transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="fixed w-full z-40 bg-white/95 backdrop-blur-sm border-b border-border print-hide">
          <div className="rw-container py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-semibold">Zero Human</span>
              </Link>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowShareDialog(true)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleDownloadPDF}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  title="Download as PDF"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div 
          ref={heroRef}
          className={`pt-32 pb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="rw-container max-w-4xl mx-auto text-center">
            <p className="text-sm font-medium text-muted-foreground mb-4">RESEARCH / JANUARY 15, 2025</p>
            <h1 className="text-[40px] lg:text-[60px] font-normal leading-[1.1] tracking-[-2px] mb-6">
              Introducing Zero V1
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The world's first voice-directed cinematic AI engine for effortless product advertising. 
              Physically accurate, brand-aligned 4K video ads in under 60 seconds—just speak your vision.
            </p>
          </div>
        </div>

        {/* Featured Image */}
        <div className={`rw-container mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/zero human v1 research.jpg"
              alt="Cinematic product advertising with Zero V1"
              width={1200}
              height={675}
              className="w-full"
            />
          </div>
        </div>

        {/* Content */}
        <article className="rw-container max-w-3xl mx-auto pb-20">
          <div className="prose prose-lg max-w-none">
            <section className="mb-16">
              <h2 className="text-3xl font-normal mb-6 tracking-tight">Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Zero V1 represents a leap forward in AI-powered video generation, specifically designed for 
                product advertising. Built on breakthrough research in multimodal AI and world simulation, 
                Zero V1 enables brands to create cinematic, physically accurate video ads simply by speaking 
                their vision—no cameras, actors, or production teams required.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our AI Co-Director acts as your creative partner, recommending scripts, scenes, camera movements, 
                soundtracks, and brand-consistent visuals. The result: professional 4K video ads in under 60 seconds 
                that drive engagement and conversions across every channel from TikTok to YouTube.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-normal mb-6 tracking-tight">Key Capabilities</h2>
              <div className="space-y-6">
                <div className="bg-off-white rounded-xl p-6">
                  <h3 className="text-xl font-medium mb-3">Voice-Directed Creation</h3>
                  <p className="text-muted-foreground">
                    Simply describe your product and vision in natural language. Zero V1 understands intent, 
                    brand requirements, and platform specifications to generate channel-native ads optimized 
                    for TikTok, Reels, Shorts, YouTube, and paid placements.
                  </p>
                </div>
                <div className="bg-off-white rounded-xl p-6">
                  <h3 className="text-xl font-medium mb-3">AI Co-Director Intelligence</h3>
                  <p className="text-muted-foreground">
                    Our recommendation system guides every creative decision—from hook composition and scene 
                    pacing to soundtrack selection and CTA placement. It learns from performance data to 
                    continuously improve ad effectiveness and ROAS.
                  </p>
                </div>
                <div className="bg-off-white rounded-xl p-6">
                  <h3 className="text-xl font-medium mb-3">Physical Realism & Brand Consistency</h3>
                  <p className="text-muted-foreground">
                    Zero V1 simulates worlds with accurate physics, lighting, and motion. Products interact 
                    realistically with environments while maintaining persistent brand identity, visual style, 
                    and emotional tone across multi-shot sequences.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-normal mb-6 tracking-tight">Technical Innovation</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Zero V1 is powered by a novel architecture that combines transformer-based models with advanced 
                diffusion techniques and world simulation. This allows the model to maintain persistent understanding 
                of 3D space, object permanence, and physics while generating content—solving the hardest problems 
                in generative video AI.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Trained on millions of product ads, brand campaigns, and cinematic footage paired with rich 
                performance metadata, Zero V1 understands not just what makes video look good, but what drives 
                conversions. The model generates synchronized dialogue, sound effects, and music that amplify 
                emotional impact and viewer engagement.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-normal mb-6 tracking-tight">Applications</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Zero V1 unlocks new possibilities for brands across industries:
              </p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-off-black font-medium">•</span>
                  <span><strong className="text-off-black">E-commerce & DTC Brands:</strong> Scale video ad production 10x while cutting costs by 90%. Create product reveals, lifestyle shots, and comparison ads at the speed of demand.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-off-black font-medium">•</span>
                  <span><strong className="text-off-black">Performance Marketing:</strong> Generate and test dozens of ad variations instantly. Optimize hooks, CTAs, and messaging for maximum ROAS across paid channels.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-off-black font-medium">•</span>
                  <span><strong className="text-off-black">Social Media Campaigns:</strong> Create platform-native TikTok, Reels, and Shorts content with trending hooks, captions, and aspect ratios automatically optimized.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-off-black font-medium">•</span>
                  <span><strong className="text-off-black">Product Launches:</strong> Go from concept to launch campaign in minutes. Test positioning, messaging, and visual styles before committing to production budgets.</span>
                </li>
              </ul>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-normal mb-6 tracking-tight">Availability</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Zero V1 is currently in private beta with select brands and performance marketing agencies. 
                We're rapidly expanding access while ensuring responsible deployment and optimal results for 
                every customer. Enterprise pilots and agency partnerships are available now.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/signin"
                  className="inline-flex items-center justify-center px-6 py-3 bg-off-black text-white rounded-full hover:bg-dark-gray transition-colors"
                >
                  Get Started
                </Link>
                <Link 
                  href="/sales"
                  className="inline-flex items-center justify-center px-6 py-3 border border-off-black rounded-full hover:bg-off-black hover:text-white transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </section>
          </div>
        </article>

        {/* Related Research */}
        <section className="bg-off-white py-20">
          <div className="rw-container max-w-4xl mx-auto">
            <h2 className="text-2xl font-normal mb-8 tracking-tight">Related Research</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/research/zero-co-director" className="group bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src="/zero co-director research.jpeg"
                    alt="Zero Co-Director AI recommendation system"
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs text-muted-foreground mb-2">Research / December 8, 2024</p>
                  <h3 className="font-medium group-hover:text-medium-gray transition-colors">
                    Intelligently built Zero Co-Director
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default IntroducingZeroV1Page;