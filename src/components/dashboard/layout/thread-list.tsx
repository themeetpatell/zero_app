"use client";

import React from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Thread } from "../../../lib/hooks/use-threads";
import "@/app/dashboard/dashboard.css";

interface ThreadListProps {
  threads: Thread[];
  activeThreadId: string | null;
  onThreadClick: (threadId: string) => void;
  onThreadDelete: (threadId: string) => void;
}

export default function ThreadList({
  threads,
  activeThreadId,
  onThreadClick,
  onThreadDelete,
}: ThreadListProps) {
  // Filter out threads with no messages
  const threadsWithMessages = threads.filter(
    (thread) => thread.messages && thread.messages.length > 0
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-subtle p-2">
      {threadsWithMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full px-4 text-center">
          <MessageSquare className="h-6 w-6 text-text-quieter mb-2" />
          <p className="text-xs text-text-quiet">No threads yet</p>
          <p className="text-[10px] text-text-quieter mt-1">
            Click the + button to start
          </p>
        </div>
      ) : (
        <div className="space-y-0.5">
          {threadsWithMessages.map((thread) => (
            <div
              key={thread.id}
              className={cn(
                "group relative flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer transition-all duration-150",
                activeThreadId === thread.id
                  ? "bg-accent-super/10 border border-accent-super/20"
                  : "hover:bg-bg-subtle"
              )}
              onClick={() => onThreadClick(thread.id)}
            >
              <MessageSquare
                className={cn(
                  "h-3 w-3 flex-shrink-0",
                  activeThreadId === thread.id
                    ? "text-accent-super"
                    : "text-text-quiet"
                )}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-[11px] truncate leading-tight",
                    activeThreadId === thread.id
                      ? "text-text-foreground font-medium"
                      : "text-text-quiet"
                  )}
                >
                  {thread.title}
                </p>
                <p className="text-[10px] text-text-quieter leading-tight mt-0.5">
                  {new Date(thread.updatedAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onThreadDelete(thread.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 transition-opacity duration-150"
              >
                <Trash2 className="h-2.5 w-2.5 text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}