"use client";

import { useState, useEffect } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface Thread {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = "zerohuman_threads";
const MAX_THREADS = 100;

export function useThreads() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  // Load threads from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setThreads(parsed);
      } catch (e) {
        console.error("Failed to parse threads:", e);
      }
    }
  }, []);

  // Save threads to localStorage whenever they change
  useEffect(() => {
    if (threads.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
    }
  }, [threads]);

  const createThread = (firstPrompt?: string) => {
    const newThread: Thread = {
      id: `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: firstPrompt?.slice(0, 50) || "New Conversation",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setThreads((prev) => {
      const updated = [newThread, ...prev].slice(0, MAX_THREADS);
      return updated;
    });
    setActiveThreadId(newThread.id);
    return newThread;
  };

  const addMessage = (threadId: string, message: Message) => {
    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          const updatedMessages = [...thread.messages, message];
          // Update title with first user message if still default
          const newTitle =
            thread.title === "New Conversation" && message.role === "user"
              ? message.content.slice(0, 50)
              : thread.title;
          
          return {
            ...thread,
            title: newTitle,
            messages: updatedMessages,
            updatedAt: Date.now(),
          };
        }
        return thread;
      })
    );
  };

  const deleteThread = (threadId: string) => {
    setThreads((prev) => prev.filter((t) => t.id !== threadId));
    if (activeThreadId === threadId) {
      setActiveThreadId(null);
    }
  };

  const getActiveThread = () => {
    return threads.find((t) => t.id === activeThreadId);
  };

  const getUserPrompts = (threadId: string) => {
    const thread = threads.find((t) => t.id === threadId);
    if (!thread) return [];
    return thread.messages.filter((m) => m.role === "user");
  };

  return {
    threads,
    activeThreadId,
    setActiveThreadId,
    createThread,
    addMessage,
    deleteThread,
    getActiveThread,
    getUserPrompts,
  };
}
