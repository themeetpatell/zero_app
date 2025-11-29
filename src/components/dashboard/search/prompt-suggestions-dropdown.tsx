"use client";

import { MoveUpRight, } from "lucide-react";
import "@/app/dashboard/dashboard.css";

interface PromptSuggestionsDropdownProps {
  isOpen: boolean;
  onSelect: (suggestion: string) => void;
}

const suggestions = [
  "Cinematic shot of a perfume deconstructed in mid-air.",
  "Smartphone unfolding reveal with holographic ui elements.",
  "Beach resort aerial shot, waves crashing, turquoise water, drone footage.",
  "Pizza slice stretching with melted cheese, food porn close-up.",
];

const PromptSuggestionsDropdown = ({
  isOpen,
  onSelect,
}: PromptSuggestionsDropdownProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-0 z-10 animate-in fade-in-0 slide-in-from-top-2 duration-200">
      <div className="rounded-xl border border-[rgba(255,255,255,0.12)] bg-sidebar shadow-lg overflow-hidden">
        <div className="py-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelect(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-[rgba(255,255,255,0.08)] transition-colors duration-200 flex items-start gap-3"
            >
              <MoveUpRight
                size={16}
                className="text-primary mt-1 flex-shrink-0"
              />
              <span className="text-xs font-light text-[rgba(255,255,255,0.85)] leading-relaxed">
                {suggestion}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptSuggestionsDropdown;