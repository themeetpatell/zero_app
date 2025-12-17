"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchInputContainer from "@/components/dashboard/search/search-input-container";
import CreationsClient from "./creations-client";
import ConversationView from "@/components/dashboard/layout/conversation-view";
import { useThreads } from "@/lib/hooks/use-threads";

export default function CreationsPage() {
  const router = useRouter();
  const {
    activeThreadId,
    setActiveThreadId,
    createThread,
    addMessage,
    getActiveThread,
  } = useThreads();

  const [showCanvas, setShowCanvas] = useState(false);
  const [isConversationMode, setIsConversationMode] = useState(false);

  const activeThread = getActiveThread();

  const handleNewThread = () => {
    const newThread = createThread();
    setShowCanvas(true);
    setIsConversationMode(false);
  };

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
        content: `This is a simulated response to: "${query}"\n\nIn a production environment, this would connect to your AI backend to generate real responses. The conversation history is being saved and you can access it through the History sidebar.`,
        timestamp: Date.now(),
      };
      addMessage(threadId, assistantMessage);
    }, 1000);

    setShowCanvas(false);
    setIsConversationMode(true);
  };

  const handleThreadClick = (threadId: string) => {
    setActiveThreadId(threadId);
    setIsConversationMode(true);
    setShowCanvas(false);
  };

  const handleInputFocus = () => {
    if (!isConversationMode && !showCanvas) {
      setIsConversationMode(true);
    }
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
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <ConversationView messages={activeThread.messages} />
          </div>

          <div className="sticky bottom-0 left-0 right-0 px-5 py-3.5 z-40 bg-bg-underlay border-t border-border-subtlest">
            <div className="mx-auto max-w-xl w-full">
              <SearchInputContainer 
                onGenerate={handleGenerate} 
                showRecommendations={false}
              />
            </div>
          </div>
        </div>
      )}

      {!isConversationMode && !showCanvas && (
        <div className="relative w-full h-full">
          <CreationsClient onInputFocus={handleInputFocus} />
          
          <div className="absolute bottom-0 left-0 right-0 px-5 py-3.5 z-40 pointer-events-none">
            <div className="mx-auto max-w-xl pointer-events-auto">
              <SearchInputContainer 
                onGenerate={handleGenerate} 
                showRecommendations={false}
              />
            </div>
          </div>
        </div>
      )}

      {showCanvas && (
        <div className="absolute inset-0 z-50 bg-bg-underlay flex items-center justify-center">
          <div className="w-full max-w-xl px-5 flex flex-col items-center justify-center gap-7">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-light text-sidebar-foreground tracking-tight">
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
