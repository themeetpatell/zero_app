"use client";

import { useState, useRef, useEffect } from "react";
import {
  Mic,
  ArrowRight,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PromptSuggestionsDropdown from "./prompt-suggestions-dropdown";
import RecommendationTooltip from "./recommendation-tooltip";
import SettingsDialog from "./settings-dialog";
import "@/app/dashboard/dashboard.css";

const IconButton = ({
  icon: Icon,
  label,
  className,
  onClick,
}: {
  icon: React.ComponentType<{ strokeWidth?: number; size?: number }>;
  label: string;
  className?: string;
  onClick?: () => void;
}) => (
  <button
    aria-label={label}
    onClick={onClick}
    className={cn(
      "inline-flex h-7 w-7 items-center justify-center rounded-lg text-text-quiet transition-all duration-200 ease-out hover:bg-bg-subtle hover:text-text-foreground focus:outline-none active:scale-95",
      className
    )}
  >
    <Icon strokeWidth={2} size={16} />
  </button>
);

interface SearchInputContainerProps {
  onGenerate?: (query: string) => void;
  showRecommendations?: boolean;
  showSettingsButton?: boolean;
  blur?: boolean;                    
}



const SearchInputContainer = ({ onGenerate, showRecommendations = true, showSettingsButton = true, blur = false }: SearchInputContainerProps) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-expand textarea up to 11 lines
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    const lineHeight = 20;
    const maxLines = 11;
    const maxHeight = lineHeight * maxLines;

    const newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [query]);

  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  const handleVoiceMode = () => {
    if (query.trim()) {
      onGenerate?.(query);
    }
    setShowSuggestions(false);
  };

  return (
    <div className="w-full" ref={containerRef}>
      <div className="relative">
        <div
  className={cn(
    "w-full rounded-xl border border-border-subtle bg-sidebar/90 shadow-lg shadow-black/5 transition-all duration-200 hover:border-border-subtle hover:shadow-xl focus-within:border-border-subtle focus-within:shadow-xl",
    blur && "backdrop-blur-3xl"
  )}
>


          <div className="p-3">
            {/* Text Area */}
            <div className="w-full overflow-hidden pb-2">
              <div className="relative w-full">
                <textarea
                  ref={textareaRef}
                  id="ask-input"
                  rows={1}
                  placeholder="Ask anything..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  className="font-sans text-[13.5px] w-full resize-none bg-transparent text-text-foreground placeholder:select-none placeholder:text-text-quieter focus:outline-none caret-primary selection:bg-primary/10 overflow-auto scrollbar-subtle leading-[20px] font-normal"
                />
              </div>
            </div>

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between">
              {/* Left: Recommendation Icon - always visible */}
              <div className="flex items-center">
                <RecommendationTooltip />
              </div>

              {/* Right: Action Icons */}
              <div className="flex items-center gap-0.5">
                {showSettingsButton && (
                  <IconButton
                    icon={Settings}
                    label="Settings"
                    onClick={() => setShowSettings(true)}
                  />
                )}

                <IconButton icon={Mic} label="Voice" />
                <button
                  aria-label="Generate"
                  onClick={handleVoiceMode}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-200 ease-out hover:bg-primary/90 hover:scale-105 focus:outline-none active:scale-95 ml-0.5"
                >
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Only show dropdown when showRecommendations is true */}
        {showRecommendations && (
          <PromptSuggestionsDropdown
            isOpen={showSuggestions && query === ""}
            onSelect={handleSuggestionSelect}
          />
        )}
      </div>

      <SettingsDialog
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};

export default SearchInputContainer;