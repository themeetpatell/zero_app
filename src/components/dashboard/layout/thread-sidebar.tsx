"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Thread } from "../../../lib/hooks/use-threads";
import ThreadList from "./thread-list";
import "@/app/dashboard/dashboard.css";

interface ThreadSidebarProps {
  isHovered: boolean;
  threads: Thread[];
  activeThreadId: string | null;
  onThreadClick: (threadId: string) => void;
  onThreadDelete: (threadId: string) => void;
  onHoverChange?: (isHovered: boolean) => void;
}

export default function ThreadSidebar({
  isHovered,
  threads,
  activeThreadId,
  onThreadClick,
  onThreadDelete,
  onHoverChange,
}: ThreadSidebarProps) {
  return (
    <aside
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={cn(
        "fixed md:left-13 left-0 top-0 h-full w-35 max-w-[85vw] md:max-w-none bg-sidebar border-r border-border-subtlest z-80 flex flex-col",
        isHovered ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none",
        "transition-transform duration-300 ease-out"
      )}
      style={{
        transitionProperty: "transform, opacity"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-subtlest px-4 py-3">
        <h2 className="text-sm font-semibold text-text-foreground">Threads</h2>
      </div>

      {/* Thread list */}
      <ThreadList
        threads={threads}
        activeThreadId={activeThreadId}
        onThreadClick={onThreadClick}
        onThreadDelete={onThreadDelete}
      />
    </aside>
  );
}