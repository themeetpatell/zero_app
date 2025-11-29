"use client";

import * as React from "react";
import "@/app/dashboard/dashboard.css";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModeTooltipProps {
  title: string;
  description: string;
  isProEnabled?: boolean;
  proDetails?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

const ModeTooltip = ({
  title,
  description,
  isProEnabled = false,
  proDetails,
  children,
  className,
  side = "top",
  align = "center",
}: ModeTooltipProps) => {
  if (!title && !description) {
    return <>{children}</>;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={8}
            className={cn(
              "z-50 max-w-[280px] overflow-hidden rounded-md border bg-popover px-4 py-3 text-sm text-popover-foreground shadow-lg",
              "border-[var(--color-border-subtle)]",
              "animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2",
              "data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2",
              "data-[side=top]:slide-in-from-bottom-2",
              className
            )}
          >
            <div className="flex flex-col gap-2 text-left">
              <p className="font-medium text-sm text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground">{description}</p>

              {isProEnabled && (
                <div className="mt-1 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5">
                    <Check
                      className="size-3.5 text-primary"
                      strokeWidth={2.5}
                    />
                    <span className="font-medium text-xs text-primary">
                      Pro Enabled
                    </span>
                  </div>
                  {proDetails && (
                    <div className="text-xs text-muted-foreground">
                      {proDetails}
                    </div>
                  )}
                </div>
              )}
            </div>
            <TooltipPrimitive.Arrow
              className="fill-popover"
              width={10}
              height={5}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default ModeTooltip;