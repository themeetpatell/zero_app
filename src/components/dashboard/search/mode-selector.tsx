"use client";

import * as React from "react";
import "@/app/dashboard/dashboard.css";
import { Search, FlaskConical, Lightbulb, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { cn } from "../../../lib/utils";

type Mode = "search" | "research" | "labs";

interface ModeOption {
  id: Mode;
  name: string;
  description: string;
  icon: React.ElementType;
  pro?: boolean;
}

const modes: ModeOption[] = [
  {
    id: "search",
    name: "Search",
    description: "Fast answers to everyday questions.",
    icon: Search,
  },
  {
    id: "research",
    name: "Research",
    description: "Comprehensive, in-depth answers.",
    icon: FlaskConical,
    pro: true,
  },
  {
    id: "labs",
    name: "Labs",
    description: "Get smart, structured answers with AI Profiles.",
    icon: Lightbulb,
    pro: true,
  },
];

export default function ModeSelector() {
  const [activeMode, setActiveMode] = React.useState<Mode>("search");

  return (
    <div
      role="radiogroup"
      className="group relative isolate flex h-fit focus:outline-none"
    >
      <div className="absolute inset-0 rounded-md border border-[rgba(0,0,0,0.04)] bg-[rgba(0,0,0,0.18)] transition-colors duration-300"></div>
      <div className="flex shrink-0 items-center p-2">
        {modes.map((mode) => {
          const isActive = activeMode === mode.id;
          return (
            <TooltipProvider key={mode.id} delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    role="radio"
                    aria-checked={isActive}
                    aria-label={mode.name}
                    onClick={() => setActiveMode(mode.id)}
                    className="group/segmented-control relative focus:outline-none"
                  >
                    {isActive && (
                      <div className="pointer-events-none absolute inset-0 z-0 rounded-lg border border-primary/30 bg-black bg-gradient-to-b from-primary/20 to-primary/20 shadow-[0_1px_3px_0_rgba(32,181,167,0.05)] transition-colors duration-300 group-focus-visible/segmented-control:border-dashed" />
                    )}
                    <div
                      className={cn(
                        "relative z-10 flex h-8 min-w-9 items-center justify-center",
                        isActive && "px-2.5",
                      )}
                    >
                      {React.createElement(mode.icon, {
                          className: cn(
                            "h-4 w-4 transition-colors duration-300",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover/segmented-control:text-foreground",
                          ),
                          strokeWidth: 2,
                        })}
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  className="max-w-xs rounded-lg border-border bg-card p-3 font-sans shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {mode.name}
                    </p>
                    {mode.pro && (
                      <div className="flex items-center gap-0.5 rounded-sm bg-primary/10 px-1 py-0.5 text-xs font-medium text-primary">
                        <Check className="h-3 w-3" />
                         Pro
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {mode.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}