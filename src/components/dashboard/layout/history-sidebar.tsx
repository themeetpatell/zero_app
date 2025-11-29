"use client";

import React, { useState } from "react";
import { Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message } from "../../../lib/hooks/use-threads";
import "@/app/dashboard/dashboard.css";

interface HistorySidebarProps {
  prompts: Message[];
  onPromptClick: (prompt: Message) => void;
  onViewAll: () => void;
}

export default function HistorySidebar({
  prompts,
  onPromptClick,
  onViewAll,
}: HistorySidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const displayedPrompts = prompts.slice(0, 30);
  const hasMore = prompts.length > 30;

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover trigger area */}
      <div className="absolute left-0 top-0 h-full w-6 z-10" />

      {/* Collapsed state indicator */}
      <div
        className={cn(
          "h-full w-1 bg-border-subtlest transition-all duration-200",
          isHovered && "bg-primary"
        )}
      />

      {/* Expanded sidebar */}
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-72 bg-bg-base border-r border-border-subtlest transition-all duration-300 ease-out overflow-hidden shadow-2xl",
          isHovered
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center gap-2.5 border-b border-border-subtlest px-5 py-4">
            <Clock className="h-4 w-4 text-primary" strokeWidth={2} />
            <span className="text-base font-semibold text-text-foreground">
              History
            </span>
          </div>

          {/* Prompt list */}
          <div className="flex-1 overflow-y-auto scrollbar-subtle">
            {displayedPrompts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-5 text-center">
                <Clock className="h-10 w-10 text-text-quieter mb-3" strokeWidth={1.5} />
                <p className="text-sm font-medium text-text-quiet">No prompts yet</p>
                <p className="text-xs text-text-quieter mt-1">
                  Your prompt history will appear here
                </p>
              </div>
            ) : (
              <div className="p-3">
                {displayedPrompts.map((prompt, index) => (
                  <button
                    key={prompt.id}
                    onClick={() => onPromptClick(prompt)}
                    className="w-full text-left px-3.5 py-3 rounded-lg hover:bg-bg-subtle transition-all duration-150 group mb-1"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-medium text-text-quieter mt-0.5 flex-shrink-0 w-5">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-quiet group-hover:text-text-foreground line-clamp-2 leading-relaxed">
                          {prompt.content}
                        </p>
                        <span className="text-xs text-text-quieter mt-1.5 block">
                          {new Date(prompt.timestamp).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View All button */}
          {hasMore && (
            <div className="border-t border-border-subtlest p-3">
              <button
                onClick={onViewAll}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-bg-subtle hover:bg-bg-offset transition-all duration-150 group"
              >
                <span className="text-sm font-semibold text-text-foreground">
                  View All ({prompts.length})
                </span>
                <ChevronRight className="h-4 w-4 text-text-quiet group-hover:text-text-foreground transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}