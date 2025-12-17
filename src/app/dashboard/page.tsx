"use client";

import { useState, useEffect } from "react";
import SearchInputContainer from "@/components/dashboard/search/search-input-container";
import ConversationView from "@/components/dashboard/layout/conversation-view";
import { useThreads } from "@/lib/hooks/use-threads";

export default function DashboardPage() {
  const {
    activeThreadId,
    setActiveThreadId,
    createThread,
    addMessage,
    getActiveThread,
  } = useThreads();

  const [showCanvas, setShowCanvas] = useState(true);
  const [isConversationMode, setIsConversationMode] = useState(false);

  const activeThread = getActiveThread();

  useEffect(() => {
    if (!activeThreadId) {
      createThread();
      setShowCanvas(true);
      setIsConversationMode(false);
    }
  }, []);

  const handleGenerate = (query: string) => {
    if (!query.trim()) return;

    let threadId = activeThreadId;
    if (!threadId) {
      const newThread = createThread(query);
      threadId = newThread.id;
    }

    const userMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: "user" as const,
      content: query,
      timestamp: Date.now(),
    };
    addMessage(threadId, userMessage);

    setTimeout(() => {
      const assistantMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: "assistant" as const,
        content: `I can help you create that! Here's what I recommend:\n\n• Use Voice Studio for quick 60-second generation\n• Browse Marketplace for similar high-performing ads\n• Check Analytics to see what's trending\n\nWould you like me to guide you through the creation process?`,
        timestamp: Date.now(),
      };
      addMessage(threadId, assistantMessage);
    }, 1000);

    setShowCanvas(false);
    setIsConversationMode(true);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showCanvas) {
          setShowCanvas(false);
          if (!activeThreadId) {
            setIsConversationMode(false);
          }
        } else if (isConversationMode) {
          setIsConversationMode(false);
          setActiveThreadId(null);
        }
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showCanvas, isConversationMode, activeThreadId, setActiveThreadId]);

  return (
    <div className="flex-1 relative overflow-hidden bg-bg-underlay">
      {isConversationMode && activeThread && !showCanvas && (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto overflow-x-hidden pt-4 md:pt-0">
            <ConversationView messages={activeThread.messages} />
          </div>

          <div className="sticky bottom-0 left-0 right-0 px-4 md:px-5 py-3 md:py-3.5 z-40 bg-bg-underlay border-t border-border-subtlest" style={{ paddingBottom: 'max(0.75rem, calc(0.875rem + env(safe-area-inset-bottom)))' }}>
            <div className="mx-auto max-w-xl w-full">
              <SearchInputContainer 
                onGenerate={handleGenerate} 
                showRecommendations={false}
              />
            </div>
          </div>
        </div>
      )}

      {showCanvas && (
        <div className="absolute inset-0 z-50 bg-bg-underlay flex items-center justify-center pt-16 md:pt-0 pb-20 md:pb-0">
          <div className="w-full max-w-xl px-4 md:px-5 flex flex-col items-center justify-center gap-6 md:gap-7">
            <div className="text-center space-y-2 md:space-y-3">
              <h1 className="text-2xl md:text-3xl font-light text-sidebar-foreground tracking-tight">
                What would you like to create?
              </h1>
            </div>

            <div className="w-full">
              <SearchInputContainer onGenerate={handleGenerate} showRecommendations={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
