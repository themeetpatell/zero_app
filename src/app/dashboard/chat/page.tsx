"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Mic, Image, Video, TrendingUp } from "lucide-react";
import { useThreads } from "@/lib/hooks/use-threads";

export default function ChatPage() {
  const { activeThreadId, getActiveThread, addMessage, createThread } = useThreads();
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = getActiveThread();

  useEffect(() => {
    if (!activeThreadId) {
      createThread();
    }
  }, [activeThreadId, createThread]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages]);

  const handleSend = () => {
    if (!input.trim() || !activeThreadId) return;

    const userMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      role: "user" as const,
      content: input,
      timestamp: Date.now(),
    };

    addMessage(activeThreadId, userMessage);
    setInput("");
    setIsGenerating(true);

    setTimeout(() => {
      const assistantMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        role: "assistant" as const,
        content: `I can help you create amazing 4K video ads! Here's what I can do:\n\n• Generate ads from voice or text\n• Recommend optimal talent, scripts, and music\n• Provide performance predictions\n• Create variations for A/B testing\n\nWhat would you like to create today?`,
        timestamp: Date.now(),
      };
      addMessage(activeThreadId, assistantMessage);
      setIsGenerating(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeThread) {
    return (
      <div className="flex-1 flex items-center justify-center bg-bg-underlay">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-bg-underlay">
      {activeThread.messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-3xl w-full space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-teal-400" />
              </div>
              <h1 className="text-4xl font-light text-sidebar-foreground">
                What would you like to create?
              </h1>
              <p className="text-text-quiet text-lg">
                I can help you generate professional 4K video ads in seconds
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Luxury Product Ad", desc: "Create sophisticated brand video", icon: Sparkles },
                { title: "Social Media Reel", desc: "Generate viral short-form content", icon: Video },
                { title: "Product Launch", desc: "Announce new product with impact", icon: TrendingUp },
                { title: "Brand Story", desc: "Tell your brand's unique story", icon: Image },
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setInput(suggestion.title)}
                  className="p-6 bg-bg-subtle border border-border-subtle rounded-xl hover:border-teal-500/50 transition-all text-left group"
                >
                  <suggestion.icon className="w-6 h-6 text-teal-400 mb-3" />
                  <h3 className="text-sm font-medium text-sidebar-foreground mb-1 group-hover:text-teal-400 transition-colors">
                    {suggestion.title}
                  </h3>
                  <p className="text-xs text-text-quiet">{suggestion.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {activeThread.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-teal-500 text-white"
                      : "bg-bg-subtle border border-border-subtle text-sidebar-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}

            {isGenerating && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
                </div>
                <div className="bg-bg-subtle border border-border-subtle px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-text-quiet animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-text-quiet animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-text-quiet animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      <div className="flex-none border-t border-border-subtle bg-bg-subtle/50 backdrop-blur-xl p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the video ad you want to create..."
              rows={1}
              className="w-full px-4 py-3 pr-32 bg-bg-underlay border border-border-subtle rounded-xl text-sidebar-foreground placeholder:text-text-quiet focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
              style={{ minHeight: "48px", maxHeight: "200px" }}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-bg-subtle hover:bg-bg-offset border border-border-subtle flex items-center justify-center transition-all">
                <Mic className="w-4 h-4 text-text-quiet" />
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                className="w-8 h-8 rounded-lg bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

