"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import Sidebar from "@/components/dashboard/layout/sidebar";
import { useThreads, Message } from "../../../../lib/hooks/use-threads";
import "@/app/dashboard/dashboard.css";

export default function AllHistoryPage() {
  const router = useRouter();
  const { getActiveThread, getUserPrompts } = useThreads();
  const activeThread = getActiveThread();
  const [searchQuery, setSearchQuery] = useState("");
  const [prompts, setPrompts] = useState<Message[]>([]);

  useEffect(() => {
    if (activeThread) {
      const allPrompts = getUserPrompts(activeThread.id);
      setPrompts(allPrompts);
    }
  }, [activeThread]);

  const filteredPrompts = prompts.filter((prompt) =>
    prompt.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-underlay">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-none border-b border-border-subtlest bg-bg-base px-6 py-4">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg hover:bg-bg-subtle transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-text-quiet" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-text-foreground">
                  All History
                </h1>
                <p className="text-sm text-text-quiet mt-0.5">
                  {activeThread?.title || "No active thread"}
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-quiet" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                className="w-full pl-10 pr-4 py-2 bg-bg-raised border border-border-subtlest rounded-lg text-sm text-text-foreground placeholder:text-text-quieter focus:outline-none focus:ring-2 focus:ring-accent-super/50"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-subtle">
          <div className="mx-auto max-w-4xl px-6 py-6">
            {filteredPrompts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-text-quiet">
                  {searchQuery
                    ? "No prompts found matching your search"
                    : "No prompts in this thread yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredPrompts.map((prompt, index) => (
                  <div
                    key={prompt.id}
                    className="p-4 rounded-lg bg-bg-raised border border-border-subtlest hover:border-border-subtle transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-sm text-text-quieter mt-1 flex-shrink-0 font-medium">
                        #{prompts.length - index}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-foreground leading-relaxed">
                          {prompt.content}
                        </p>
                        <p className="text-xs text-text-quieter mt-2">
                          {new Date(prompt.timestamp).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
