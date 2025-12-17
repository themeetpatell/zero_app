"use client";

import { useState } from "react";
import { Clock, Video, MessageSquare, Sparkles, Download, Eye, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface HistoryItem {
  id: string;
  type: "creation" | "prompt";
  title: string;
  thumbnail?: string;
  prompt: string;
  timestamp: string;
  stats?: {
    views: number;
    likes: number;
    ctr?: number;
  };
}

export default function HistoryPage() {
  const [filter, setFilter] = useState<"all" | "creations" | "prompts">("all");

  const history: HistoryItem[] = [
    {
      id: "1",
      type: "creation",
      title: "Luxury Watch Campaign",
      thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400",
      prompt: "Create a luxury watch advertisement with sophisticated feel and dark elegant background",
      timestamp: "2 hours ago",
      stats: { views: 1243, likes: 234, ctr: 4.8 },
    },
    {
      id: "2",
      type: "prompt",
      title: "Fashion Collection Ad",
      prompt: "Generate a spring fashion collection ad with vibrant colors and upbeat music",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      type: "creation",
      title: "Tech Product Launch",
      thumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400",
      prompt: "Modern tech product launch with sleek animations and contemporary feel",
      timestamp: "1 day ago",
      stats: { views: 892, likes: 156, ctr: 5.2 },
    },
    {
      id: "4",
      type: "prompt",
      title: "Real Estate Showcase",
      prompt: "Create luxury villa showcase with aerial drone shots and cinematic music",
      timestamp: "2 days ago",
    },
    {
      id: "5",
      type: "creation",
      title: "Restaurant Opening",
      thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      prompt: "Restaurant grand opening ad with food closeups and ambient lighting",
      timestamp: "3 days ago",
      stats: { views: 2145, likes: 445, ctr: 7.1 },
    },
  ];

  const filtered = history.filter((item) => 
    filter === "all" || item.type === (filter === "creations" ? "creation" : "prompt")
  );

  return (
    <div className="flex-1 overflow-y-auto bg-bg-underlay">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-4xl font-light text-sidebar-foreground mb-2">History</h1>
          <p className="text-text-quiet">Your creations and prompts timeline</p>
        </div>

        <div className="flex items-center gap-2">
          {(["all", "creations", "prompts"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                filter === f
                  ? "bg-teal-500 text-white"
                  : "bg-bg-subtle hover:bg-bg-offset text-text-quiet hover:text-sidebar-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-bg-subtle border border-border-subtle rounded-xl overflow-hidden hover:border-teal-500/50 transition-all"
            >
              <div className="flex gap-4 p-4">
                {item.type === "creation" && item.thumbnail ? (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-bg-underlay group">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-8 h-8 text-teal-400" />
                  </div>
                )}

                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-medium text-sidebar-foreground">{item.title}</h3>
                        {item.type === "creation" && (
                          <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 text-xs font-medium">
                            Created
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-quiet line-clamp-2">{item.prompt}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-quiet flex-shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      {item.timestamp}
                    </div>
                  </div>

                  {item.stats && (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Eye className="w-4 h-4 text-text-quiet" />
                        <span className="text-sidebar-foreground">{(item.stats.views / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Sparkles className="w-4 h-4 text-text-quiet" />
                        <span className="text-sidebar-foreground">{(item.stats.likes / 1000).toFixed(1)}K</span>
                      </div>
                      {item.stats.ctr && (
                        <div className="flex items-center gap-1.5 text-sm">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-medium">{item.stats.ctr}% CTR</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    {item.type === "creation" ? (
                      <>
                        <button className="px-4 py-2 rounded-lg bg-bg-offset hover:bg-bg-subtle border border-border-subtle hover:border-teal-500/50 text-sm text-sidebar-foreground transition-all flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-sm text-white transition-all">
                          View Details
                        </button>
                      </>
                    ) : (
                      <button className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-sm text-white transition-all flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Generate Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

