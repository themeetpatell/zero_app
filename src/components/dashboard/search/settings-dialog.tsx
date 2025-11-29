"use client";

import { useState } from "react";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

const MorphSphere = dynamic(() => import("./camera-sphere"), { ssr: false });

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

type AspectRatioType = "16:10" | "16:9" | "1:1" | "4:5" | "9:16" | "5:2" | "4:3" | "1.85:1" | "2.39:1";

const aspectRatioIcons: Record<AspectRatioType, any> = {
  "16:10": () => <div className="w-4 h-2.5 border border-current" />,
  "16:9": () => <div className="w-4 h-2 border border-current" />,
  "1:1": () => <div className="w-3 h-3 border border-current" />,
  "4:5": () => <div className="w-2.5 h-3 border border-current" />,
  "9:16": () => <div className="w-2 h-4 border border-current" />,
  "5:2": () => <div className="w-5 h-2 border border-current" />,
  "4:3": () => <div className="w-3.5 h-2.5 border border-current" />,
  "1.85:1": () => <div className="w-4.5 h-2 border border-current" />,
  "2.39:1": () => <div className="w-5 h-1.5 border border-current" />,
};

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProps) => {
  const [seconds, setSeconds] = useState<5 | 10 | null>(null);
  const [resolution, setResolution] = useState<"HD" | "2K" | "4K" | "8K" | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType | null>(null);

  const handleReset = () => {
    setSeconds(null);
    setResolution(null);
    setIsPublic(false);
    setAspectRatio(null);
  };

  const handleApply = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 transition-all duration-300"
        onClick={onClose}
      />

      {/* Main Dialog */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[820px] max-h-[90vh] overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)] transition-all duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 transition-all duration-200"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <div className="p-6">
          {/* Main Grid */}
          <div className="grid grid-cols-[280px_1fr] gap-6">
            
            {/* Left Panel - Controls */}
            <div className="space-y-3">
              
              {/* Duration */}
              <div>
                <h3 className="text-[10px] font-semibold text-white/50 mb-2 uppercase tracking-wide">Duration</h3>
                <div className="flex gap-1.5">
                  {[5, 10].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setSeconds(sec as 5 | 10)}
                      className={cn(
                        "flex-1 rounded-lg px-2 py-1.5 text-sm font-medium transition-all duration-200",
                        seconds === sec
                          ? "bg-white/10 text-white border border-white/20"
                          : "bg-white/[0.02] text-white/40 hover:text-white/70 hover:bg-white/[0.05] border border-white/5"
                      )}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution */}
              <div>
                <h3 className="text-[10px] font-semibold text-white/50 mb-2 uppercase tracking-wide">Resolution</h3>
                <div className="flex gap-1.5">
                  {(["HD", "2K", "4K", "8K"] as const).map((res) => {
                    const isPro = res === "2K" || res === "4K" || res === "8K";
                    return (
                      <button
                        key={res}
                        onClick={() => setResolution(res)}
                        className={cn(
                          "relative flex-1 rounded-lg px-2 py-1.5 text-sm font-semibold transition-all duration-200",
                          resolution === res
                            ? "bg-white text-black"
                            : "bg-white/[0.05] text-white/50 hover:text-white/80 hover:bg-white/[0.08] border border-white/10"
                        )}
                      >
                        {res}
                        {isPro && (
                          <span className="absolute -top-1 -right-1 bg-primary text-black text-[9px] font-bold px-1.5 py-0.5 rounded">
                            PRO
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Options */}
              <div className="rounded-lg bg-white/[0.02] border border-white/5 p-3">
                <h3 className="text-[10px] font-semibold text-white/50 mb-3 uppercase tracking-wide">Options</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/70">Public</span>
                  <button
                    onClick={() => setIsPublic(!isPublic)}
                    className={cn(
                      "relative inline-flex h-5 w-9 items-center rounded-full transition-all duration-300",
                      isPublic ? "bg-white/90" : "bg-white/10"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-3.5 w-3.5 transform rounded-full transition-all duration-300",
                        isPublic ? "translate-x-5 bg-black" : "translate-x-0.5 bg-white"
                      )}
                    />
                  </button>
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <h3 className="text-[10px] font-semibold text-white/50 mb-2 uppercase tracking-wide">Aspect Ratio</h3>
                <div className="grid grid-cols-3 gap-1.5 max-h-[140px] overflow-y-auto pr-1 custom-scrollbar">
                  {(["16:10", "16:9", "1:1", "4:5", "9:16", "5:2", "4:3", "1.85:1", "2.39:1"] as const).map((ratio) => {
                    const Icon = aspectRatioIcons[ratio];
                    const isCinematic = ratio === "1.85:1" || ratio === "2.39:1";
                    return (
                      <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={cn(
                          "relative rounded-lg px-1.5 py-2 transition-all duration-200 flex flex-col items-center gap-1.5",
                          aspectRatio === ratio
                            ? "bg-white/10 text-white border border-white/20"
                            : "bg-white/[0.02] text-white/40 hover:text-white/70 hover:bg-white/[0.05] border border-white/5"
                        )}
                      >
                        <Icon />
                        <span className="text-[9px] font-semibold">{ratio}</span>
                        {isCinematic && (
                          <span className="text-[7px] font-bold text-[#1a1a1a] bg-primary px-1 py-0.5 rounded uppercase">
                            PRO
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-2 rounded-lg text-sm font-semibold text-white/60 hover:text-white/90 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  Reset All
                </button>
                <button
                  onClick={handleApply}
                  className="w-full px-4 py-2 rounded-lg text-sm font-semibold text-black bg-white hover:bg-white/90 transition-all duration-200"
                >
                  Apply Settings
                </button>
              </div>
            </div>

            {/* Right Panel - Camera */}
            <div className="rounded-2xl bg-black/[0.02] backdrop-blur-xl border border-white/10 p-6 flex flex-col items-center justify-center min-h-[580px]">
              <div className="mt-6 px-4 py-2 rounded-lg bg-white/5">
                <p className="text-xs font-semibold text-white/60 uppercase">
                  Camera
                </p>
              </div>
              <MorphSphere />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </>
  );
};

export default SettingsDialog;