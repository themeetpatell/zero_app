"use client";

import React, { useState } from "react";
import { X, Check } from "lucide-react";

type PlanTab = "Personal" | "Education" | "Business";

const ACCENT = "#00bdb0ff";

interface ZeroHumanPricingProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ZeroHumanPricing({ isOpen, onClose }: ZeroHumanPricingProps) {
  const [activeTab, setActiveTab] = useState<PlanTab>("Personal");

  if (!isOpen) return null;

  const tabs: PlanTab[] = ["Personal", "Education", "Business"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative h-full w-full flex flex-col bg-[#0c0c0c]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 rounded-md p-2 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modern Tab Navigation - Morphing Style */}
        <div className="flex-shrink-0 z-40 pt-3 pb-3 px-8">
          <div className="flex items-center justify-center">
            <div className="relative inline-flex gap-1 p-1 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl backdrop-blur-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-2 text-xs font-normal rounded-xl transition-all duration-500 overflow-hidden ${
                    activeTab === tab ? "text-black" : "text-white/50 hover:text-white/70"
                  }`}
                  style={
                    activeTab === tab
                      ? {
                          background: `linear-gradient(135deg, ${ACCENT} 10%, rgba(0, 189, 176, 0.6) 50%)`,
                        }
                      : undefined
                  }
                >
                  {activeTab === tab && (
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 70%)`,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-subtle px-3 pb-8 flex justify-center items-start">
          <div className="w-full max-w-[70%] scale-[0.7] origin-top mx-auto">
            {activeTab === "Personal" && <PersonalPlans accent={ACCENT} accentDark={ACCENT} onClose={onClose} />}
            {activeTab === "Education" && <EducationPlans accent={ACCENT} />}
            {activeTab === "Business" && <BusinessPlans accent={ACCENT} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalPlans({ accent, accentDark, onClose }: { accent: string; accentDark?: string; onClose?: () => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-start">

      {/* Free Plan */}
      <div className="relative rounded-2xl border border-[#2f2f2f] bg-[#0f0f0f] p-8 flex flex-col min-h-[600px] min-w-[340px]">
        <h3 className="text-2xl font-semibold text-white mb-3">Free</h3>

        <div className="mb-5">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-extrabold text-white">$0</span>
            <span className="text-sm text-[#bdbdbd]">USD / month</span>
          </div>
        </div>

        <p className="text-sm text-[#bdbdbd] mb-6 leading-relaxed">
          Try Zero Human with essential features to create your first cinematic ad.
        </p>

        <button className="w-full rounded-lg py-3 text-sm font-semibold border border-[#2f2f2f] text-white hover:bg-white/5">
          Get Started Free
        </button>

        <div className="space-y-4 flex-1 mt-6">
          {[
            "1 free AI Co-Director recommendation",
            "3 cinematic video ads per month",
            "Up to 30-second video outputs",
            "720p video quality",
            "Watermarked videos",
            "Voice-directed creation",
            "5GB cloud storage",
            "Community support",
            "Access to 5 basic templates",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[rgba(24,183,179,0.95)] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-xs text-[#bdbdbd] leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Plan */}
      <div className="relative rounded-2xl border border-[rgba(24,183,179,0.3)] bg-[#0f0f0f] p-8 flex flex-col min-h-[600px] min-w-[340px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-semibold text-white">Pro</h3>
          <span className="rounded-full bg-[rgba(24,183,179,0.14)] px-3 py-1 text-xs font-semibold text-[rgba(24,183,179,0.98)]">
            Popular
          </span>
        </div>

        <div className="mb-5">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-extrabold text-white">$29</span>
            <span className="text-sm text-[#bdbdbd]">USD / month</span>
          </div>
          <p className="text-xs text-[#888] mt-2">or $24/month billed annually</p>
        </div>

        <p className="text-sm text-[#bdbdbd] mb-6 leading-relaxed">
          Perfect for creators, freelancers, and small businesses creating professional ads.
        </p>

        <button className="w-full rounded-lg py-3 text-sm font-semibold text-black" style={{ background: accent }}>
          Get Pro
        </button>

        <div className="space-y-4 flex-1 mt-6">
          {[
            "30 cinematic video ads per month",
            "4K video quality with no watermarks",
            "Voice-directed creation",
            "AI Co-Director recommendations",
            "Up to 60-second video outputs",
            "Product ads, TikTok/Reels, e-commerce videos",
            "50GB cloud storage",
            "Standard render priority",
            "Commercial use license",
            "Access to 10+ cinematic templates",
            "Basic analytics dashboard",
            "Email support (48-hour response)",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[rgba(24,183,179,0.95)] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-xs text-[#bdbdbd] leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Max Plan */}
      <div className="relative rounded-2xl border border-[#2f2f2f] bg-[#0f0f0f] p-8 flex flex-col min-h-[600px] min-w-[340px]">
        <h3 className="text-2xl font-semibold text-white mb-3">Max</h3>

        <div className="mb-5">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-extrabold text-white">$99</span>
            <span className="text-sm text-[#bdbdbd]">USD / month</span>
          </div>
          <p className="text-xs text-[#888] mt-2">or $79/month billed annually</p>
        </div>

        <p className="text-sm text-[#bdbdbd] mb-6 leading-relaxed">
          Unleash unlimited creativity with premium features and advanced controls.
        </p>

        <button
          className="w-full rounded-lg py-3 text-sm font-semibold"
          style={{ background: "white", color: "#0f0f0f", border: `1px solid ${accent}` }}
        >
          Get Max
        </button>

        <div className="space-y-4 flex-1 mt-6">
          {[
            "Everything in Pro",
            "Unlimited cinematic video ads",
            "Extended video length (up to 120 seconds)",
            "Priority AI Co-Director with A/B testing",
            "Early access to new features",
            "Custom brand voice and style presets",
            "Advanced editing controls",
            "Virtual location scouting (100+ environments)",
            "500GB cloud storage",
            "Expedited rendering (2x faster)",
            "Video performance analytics",
            "Downloadable storyboards and scripts",
            "Priority support (12-hour response)",
            "API access (5,000 calls/month)",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[rgba(24,183,179,0.95)] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-xs text-[#bdbdbd] leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EducationPlans({ accent }: { accent: string }) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-2xl border border-[#2f2f2f] bg-[#0f0f0f] p-8">
        <h3 className="text-2xl font-semibold text-white mb-4">Education Pro</h3>

        <div className="mb-4">
          <span className="text-3xl font-semibold text-white">12 months free trial</span>
          <p className="text-sm text-[#888] mt-2">Then $15/month after trial</p>
        </div>

        <p className="text-sm text-[#bdbdbd] mb-6 leading-relaxed">
          Empowering students and educators to learn cinematic storytelling with professional support.
        </p>

        <div className="space-y-3 mb-6">
          <button className="w-full rounded-lg py-3 text-sm font-semibold text-black" style={{ background: accent }}>
            Verify as student
          </button>
          <button className="w-full rounded-lg border border-[#2f2f2f] py-3 text-sm font-semibold text-white hover:bg-white/5">
            Verify as educator
          </button>
        </div>

        <div className="space-y-3">
          {[
            "20 cinematic video ads per month",
            "4K video quality with no watermarks",
            "Voice-directed creation and AI Co-Director",
            "Up to 60-second video outputs",
            "30GB cloud storage",
            "Access to educational templates and tutorials",
            "Classroom collaboration tools",
            "Portfolio building features",
            "Student community access",
            "Commercial use license for portfolio projects",
            "Dedicated education support",
            "Bonus: Refer 3 classmates for 6 months free extension",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[rgba(24,183,179,0.95)] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-xs text-[#bdbdbd] leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BusinessPlans({ accent }: { accent: string }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
      {/* Enterprise Pro */}
      <div className="rounded-2xl border border-[#2f2f2f] bg-[#0f0f0f] p-8 flex flex-col min-h-[600px]">
        <h3 className="text-2xl font-semibold text-white mb-3">Enterprise Pro</h3>

        <div className="mb-5">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-white">$149</span>
            <span className="text-sm text-[#bdbdbd]">USD / per seat / month</span>
          </div>
          <p className="text-xs text-[#888] mt-2">Minimum 5 seats</p>
        </div>

        <p className="text-sm text-[#bdbdbd] mb-6 leading-relaxed">
          Scale your video advertising with team collaboration and professional support.
        </p>

        <button className="w-full rounded-lg py-3 text-sm font-semibold text-black" style={{ background: accent }}>
          Continue with Enterprise Pro
        </button>

        <div className="space-y-4 flex-1 mt-6">
          {[
            "Unlimited cinematic video ads per seat",
            "4K video quality with no watermarks",
            "Voice-directed creation and AI Co-Director",
            "Up to 120-second video outputs",
            "Team collaboration workspace",
            "1TB shared cloud storage per seat",
            "Brand identity management",
            "Advanced user permissions",
            "SSO (Single Sign-On) integration",
            "API access (50,000 calls/month per seat)",
            "Dedicated account manager",
            "Priority rendering and generation",
            "Advanced analytics dashboard",
            "Quarterly strategy sessions",
            "Email & chat support (6-hour response)",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[rgba(24,183,179,0.95)] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-xs text-[#bdbdbd] leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Max */}
      <div className="rounded-2xl border border-[#2f2f2f] bg-[#0f0f0f] p-8 flex flex-col min-h-[600px]">
        <h3 className="text-2xl font-semibold text-white mb-3">Enterprise Max</h3>

        <div className="mb-5">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-white">$499</span>
            <span className="text-sm text-[#bdbdbd]">USD / per seat / month</span>
          </div>
          <p className="text-xs text-[#888] mt-2">Minimum 3 seats</p>
        </div>

        <p className="text-sm text-[#bdbdbd] mb-6 leading-relaxed">
          Enterprise-grade video production at scale with unlimited possibilities.
        </p>

        <button className="w-full rounded-lg py-3 text-sm font-semibold text-black" style={{ background: accent }}>
          Continue with Enterprise Max
        </button>

        <div className="space-y-4 flex-1 mt-6">
          {[
            "Everything in Enterprise Pro",
            "Unlimited seats and collaborators",
            "Extended video length (up to 180 seconds)",
            "White-label capabilities",
            "Custom AI Co-Director training",
            "Unlimited API calls",
            "10TB shared cloud storage (expandable)",
            "SOC 2 Type II compliance",
            "Custom integration support",
            "On-demand rendering infrastructure",
            "Advanced video versioning",
            "Multilingual support (20+ languages)",
            "Dedicated technical support team (1-hour SLA)",
            "Custom contract terms and invoicing",
            "Early access to enterprise-only features",
          ].map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-[rgba(24,183,179,0.95)] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span className="text-xs text-[#bdbdbd] leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}