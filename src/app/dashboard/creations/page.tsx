"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/layout/sidebar";
import SearchInputContainer from "@/components/dashboard/search/search-input-container";
import CreationsClient from "./creations-client";
import ConversationView from "@/components/dashboard/layout/conversation-view";
import ThreadSidebar from "@/components/dashboard/layout/thread-sidebar";
import { useThreads } from "@/lib/hooks/use-threads";

export default function CreationsPage() {
  const router = useRouter();
  const {
    threads,
    activeThreadId,
    setActiveThreadId,
    createThread,
    addMessage,
    deleteThread,
    getActiveThread,
  } = useThreads();

  const [showCanvas, setShowCanvas] = useState(false);
  const [isConversationMode, setIsConversationMode] = useState(false);
  const [historyIconHovered, setHistoryIconHovered] = useState(false);
  const [threadSidebarHovered, setThreadSidebarHovered] = useState(false);

  // Combine hover states - show sidebar if EITHER is hovered
  const showThreadSidebar = historyIconHovered || threadSidebarHovered;

  const activeThread = getActiveThread();

  const handleNewThread = () => {
    // Create new thread
    const newThread = createThread();
    
    // Show generation canvas - centered and full screen
    setShowCanvas(true);
    setIsConversationMode(false);
  };

  const handleGenerate = (query: string) => {
    if (!query.trim()) return;

    // Create thread if none active
    let threadId = activeThreadId;
    if (!threadId) {
      const newThread = createThread(query);
      threadId = newThread.id;
    }

    // Add user message
    const userMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: "user" as const,
      content: query,
      timestamp: Date.now(),
    };
    addMessage(threadId, userMessage);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: "assistant" as const,
        content: `This is a simulated response to: "${query}"\n\nIn a production environment, this would connect to your AI backend to generate real responses. The conversation history is being saved and you can access it through the History sidebar.`,
        timestamp: Date.now(),
      };
      addMessage(threadId, assistantMessage);
    }, 1000);

    // Collapse canvas and switch to conversation mode
    setShowCanvas(false);
    setIsConversationMode(true);
  };

  const handleThreadClick = (threadId: string) => {
    setActiveThreadId(threadId);
    setIsConversationMode(true);
    setShowCanvas(false);
  };

  // Handle input focus from CreationsClient - transition to conversation mode
  const handleInputFocus = () => {
    if (!isConversationMode && !showCanvas) {
      setIsConversationMode(true);
    }
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showCanvas) {
          // If canvas is open, close it and return to explore or conversation
          setShowCanvas(false);
          if (!activeThreadId) {
            setIsConversationMode(false);
          }
        } else if (isConversationMode) {
          // If in conversation, return to creations
          setIsConversationMode(false);
          setActiveThreadId(null);
        }
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showCanvas, isConversationMode, activeThreadId, setActiveThreadId]);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-bg-underlay">
      <Sidebar 
        onNewThread={handleNewThread}
        onHistoryHover={setHistoryIconHovered}
      />

      {/* Thread sidebar - shows on hover over history icon */}
      <ThreadSidebar
        isHovered={showThreadSidebar}
        threads={threads}
        activeThreadId={activeThreadId}
        onThreadClick={handleThreadClick}
        onThreadDelete={deleteThread}
        onHoverChange={setThreadSidebarHovered}
      />

      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden">
        {/* CONVERSATION MODE - with partition for fixed generation box */}
        {isConversationMode && activeThread && !showCanvas && (
          <div className="flex flex-col h-full">
            {/* Scrollable conversation content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <ConversationView messages={activeThread.messages} />
            </div>

            {/* Fixed generation box at bottom */}
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

        {/* CREATIONS MODE - generation box centered, no partition */}
        {!isConversationMode && !showCanvas && (
          <div className="relative w-full h-full">
            <CreationsClient onInputFocus={handleInputFocus} />
            
            {/* Full screen generation box - centered */}
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

         {/* Generation Canvas - Full Screen with centered prompt */}
        {showCanvas && (
          <div className="absolute inset-0 z-50 bg-bg-underlay flex items-center justify-center">
            <div className="w-full max-w-xl px-5 flex flex-col items-center justify-center gap-7">
              <div className="text-center space-y-3">
                <h1 className="text-3xl font-light text-sidebar-foreground tracking-tight">
                  What would you like to create?
                </h1>
                {/* <p className="text-lg text-text-quiet font-light">
                  Ask me to build your next video.
                </p> */}
              </div>

              {/* Search input in center */}
              <div className="w-full">
                <SearchInputContainer onGenerate={handleGenerate} showRecommendations={true} />
              </div>

              {/* Tags/Suggestions
              <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
                {[
                  "✨ Generate",
                  "🎨 Create",
                  "💡 Ideas",
                  "📝 Write",
                  "🔍 Research",
                  "🎯 Analyze",
                ].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-bg-subtle hover:bg-bg-offset text-text-quiet hover:text-text-foreground border border-border-subtlest hover:border-border-subtle transition-all duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}