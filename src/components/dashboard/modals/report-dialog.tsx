"use client";

import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
 

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReportDialog({ open, onOpenChange }: ReportDialogProps) {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [additionalFeedback, setAdditionalFeedback] = useState("");

  const issues = [
    "Didn't match prompt",
    "Blurring or morphing",
    "Slow or static motion",
    "Style consistency",
    "Bad composition",
    "Offensive"
  ];

  const toggleIssue = (issue: string) => {
    setSelectedIssues(prev =>
      prev.includes(issue)
        ? prev.filter(i => i !== issue)
        : [...prev, issue]
    );
  };

  const handleSubmit = () => {
    console.log("Feedback submitted:", { selectedIssues, additionalFeedback });
    onOpenChange(false);
    setSelectedIssues([]);
    setAdditionalFeedback("");
  };

  const isSubmitDisabled = selectedIssues.length === 0 && additionalFeedback.trim() === "";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* Content - Centered */}
        <DialogPrimitive.Content className="scale-80 fixed left-1/2 top-1/2 z-50 w-[380px] -translate-x-1/2 -translate-y-1/2 bg-[#2C2E2E] border border-[#3a3a3a] rounded-xl overflow-hidden shadow-2xl data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          
          {/* Close Button */}
          <DialogPrimitive.Close className="absolute top-3 right-3 rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#9CA3AF] focus:ring-offset-2 focus:ring-offset-[#2C2E2E]">
            <X className="h-4 w-4 text-[#9CA3AF]" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Header */}
          <div className="px-5 pt-5 pb-3 border-b border-[#3a3a3a]">
            <DialogPrimitive.Title className="text-base font-light text-[#e5e5e5]">
              What can we do better?
            </DialogPrimitive.Title>
          </div>

          {/* Content with custom scrollbar */}
          <div className="px-5 py-3 space-y-2 max-h-[350px] overflow-y-auto custom-scrollbar">
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 5px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #9CA3AF;
                border-radius: 3px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #B0B7BF;
              }
            `}</style>
            
            {issues.map((issue) => (
              <button
                key={issue}
                onClick={() => toggleIssue(issue)}
                className={`w-full flex font-light items-center gap-2.5 px-3 py-2 rounded-lg border transition-all ${
                  selectedIssues.includes(issue)
                    ? "bg-[#3a3a3a] border-[#4a4a4a]"
                    : "bg-transparent border-[#3a3a3a] hover:bg-[#353535]"
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                  selectedIssues.includes(issue)
                    ? "bg-[#9CA3AF] border-[#9CA3AF]"
                    : "border-[#5a5a5a]"
                }`}>
                  {selectedIssues.includes(issue) && (
                    <svg className="w-2.5 h-2.5 text-[#2C2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-[#b5b5b5] text-sm">{issue}</span>
              </button>
            ))}

            {/* Additional Feedback */}
            <div className="pt-1">
              <textarea
                value={additionalFeedback}
                onChange={(e) => setAdditionalFeedback(e.target.value)}
                placeholder="Additional feedback (optional)"
                maxLength={250}
                rows={2}
                className="w-full rounded-lg border border-[#3a3a3a] bg-transparent px-3 py-2 text-[#e5e5e5] text-sm placeholder:text-[#6a6a6a] focus:outline-none focus:ring-2 focus:ring-[#9CA3AF]/50 focus:border-[#9CA3AF]/50 resize-none"
              />
              <div className="text-right text-xs text-[#6a6a6a] mt-1">
                {additionalFeedback.length}/250
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-[#3a3a3a]">
            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className="w-full rounded-lg bg-[#9CA3AF] px-4 py-2 text-sm font-medium text-[#2C2E2E] hover:bg-[#B0B7BF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send feedback
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}