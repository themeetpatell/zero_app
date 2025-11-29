"use client";

import { useState, useEffect, useRef } from "react";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import "@/app/dashboard/dashboard.css";

const RecommendationTooltip = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAbove, setShowAbove] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isHovered && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const tooltipHeight = 280; // Approximate height of tooltip

      // Show above if not enough space below
      setShowAbove(spaceBelow < tooltipHeight);
    }
  }, [isHovered]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        aria-label="AI Co-Director Recommendations"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="inline-flex h-8 aspect-square items-center justify-center rounded-lg text-muted-foreground transition-colors duration-300 ease-out hover:bg-accent hover:text-primary focus:outline-none"
      >
        <Lightbulb size={18} strokeWidth={2} />
      </button>

      {/* Tooltip Dialog - Position dynamically */}
      {isHovered && (
        <div
          className={cn(
            "absolute left-[-26px] z-50 w-[320px] rounded-xl bg-[#2C2E2E] border border-[rgba(255,255,255,0.12)] p-4 shadow-lg animate-in fade-in duration-200 transform scale-78",
            showAbove
              ? "bottom-full -mb-5" // tooltip appears above the parent
              : "top-full -mt-6"    // tooltip appears below the parent
          )}
        >
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                <Lightbulb size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  AI Co-Director Recommendations
                </h3>
                <p className="text-xs font-light text-muted-foreground leading-relaxed">
                  Get AI-powered suggestions to improve your prompts and discover new ways to explore your questions.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-border-subtlest font-light">
              <div className="flex items-center gap-2 text-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-muted-foreground">Smart prompt refinements</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-muted-foreground">Context-aware suggestions</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-muted-foreground">Enhanced search quality</span>
              </div>
            </div>

            <div className="">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1">
                <span className="text-[10px] font-semibold text-primary">PRO</span>
                <span className="text-[10px] text-muted-foreground">Enabled ✓</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationTooltip;