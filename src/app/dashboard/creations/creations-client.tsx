"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Heart, Download, Share2, Copy, Eye } from "lucide-react";

type Category = "all" | "saved" | "public" | "private";

interface Asset {
  id: string;
  type: "image" | "video";
  url: string;
  prompt: string;
  aspectRatio: string;
  isPublic: boolean;
  isSaved: boolean;
  createdAt: string;
}

interface CreationsClientProps {
  onInputFocus?: () => void;
}

const mockAssets: Asset[] = [
  {
    id: "1",
    type: "video",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    prompt: "A professional portrait of a woman in natural lighting, soft focus background",
    aspectRatio: "3:4",
    isPublic: true,
    isSaved: false,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    type: "video",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    prompt: "Cinematic portrait with dramatic lighting and composition",
    aspectRatio: "16:9",
    isPublic: false,
    isSaved: true,
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    type: "video",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    prompt: "Modern minimalist interior design with natural elements",
    aspectRatio: "16:9",
    isPublic: true,
    isSaved: false,
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    type: "video",
    url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    prompt: "Abstract digital art with vibrant colors and geometric patterns",
    aspectRatio: "1:1",
    isPublic: false,
    isSaved: false,
    createdAt: "2024-01-12",
  },
];

export default function CreationsClient({ onInputFocus }: CreationsClientProps) {
  const [category, setCategory] = useState<Category>("all");
  const [savedAssets, setSavedAssets] = useState<Set<string>>(
    new Set(mockAssets.filter((a) => a.isSaved).map((a) => a.id))
  );

  const handleToggleSaved = (assetId: string) => {
    setSavedAssets((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(assetId)) {
        newSet.delete(assetId);
      } else {
        newSet.add(assetId);
      }
      return newSet;
    });
  };

  const handleCopyPrompt = async (prompt: string) => {
    await navigator.clipboard.writeText(prompt);
  };

  const filterAssets = () => {
    let filtered = mockAssets;
    if (category === "saved") {
      filtered = filtered.filter((a) => savedAssets.has(a.id));
    } else if (category === "public") {
      filtered = filtered.filter((a) => a.isPublic);
    } else if (category === "private") {
      filtered = filtered.filter((a) => !a.isPublic);
    }
    return filtered;
  };

  const filteredAssets = filterAssets();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-bg-underlay">
      <div className="flex-none border-b border-border-subtle bg-bg-subtle/50 backdrop-blur-xl px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            {(["all", "saved", "public", "private"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  category === cat
                    ? "bg-teal-500 text-white"
                    : "bg-bg-subtle hover:bg-bg-offset text-text-quiet hover:text-sidebar-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-sm text-text-quiet">
            {filteredAssets.length} {filteredAssets.length === 1 ? 'video' : 'videos'}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {filteredAssets.length === 0 ? (
            <div className="flex h-96 items-center justify-center">
              <div className="text-center">
                <Eye className="h-12 w-12 text-text-quiet mx-auto mb-3" />
                <p className="text-sm text-text-quiet">No videos in this category</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-xl bg-bg-subtle border border-border-subtle hover:border-teal-500/50 transition-all"
                >
                  <div className={`relative w-full overflow-hidden ${
                    asset.aspectRatio === "1:1" ? "aspect-square" :
                    asset.aspectRatio === "16:9" ? "aspect-video" :
                    asset.aspectRatio === "9:16" ? "aspect-[9/16]" :
                    asset.aspectRatio === "4:3" ? "aspect-[4/3]" :
                    asset.aspectRatio === "3:4" ? "aspect-[3/4]" :
                    "aspect-square"
                  }`}>
                    <img
                      src={asset.url}
                      alt="Creation"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSaved(asset.id);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 transition-all hover:scale-110 border border-white/10"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            savedAssets.has(asset.id)
                              ? "fill-red-500 text-red-500"
                              : "text-white"
                          }`}
                        />
                      </button>
                    </div>

                    {savedAssets.has(asset.id) && (
                      <div className="absolute top-3 left-3">
                        <Heart className="h-5 w-5 fill-red-500 text-red-500 drop-shadow-lg" />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyPrompt(asset.prompt);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-bg-subtle/95 backdrop-blur-xl border border-border-subtle hover:border-teal-500/50 px-4 py-2.5 text-sm font-medium text-sidebar-foreground transition-all"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </button>
                        <button className="flex items-center justify-center rounded-xl bg-bg-subtle/95 backdrop-blur-xl border border-border-subtle hover:border-teal-500/50 px-4 py-2.5 transition-all">
                          <Share2 className="h-4 w-4 text-sidebar-foreground" />
                        </button>
                        <button className="flex items-center justify-center rounded-xl bg-teal-500/95 backdrop-blur-xl hover:bg-teal-600 px-4 py-2.5 transition-all">
                          <Download className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-text-quiet line-clamp-2 leading-relaxed mb-2">
                      {asset.prompt}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-quiet">{asset.createdAt}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        asset.isPublic 
                          ? "bg-teal-500/10 text-teal-400" 
                          : "bg-gray-500/10 text-gray-400"
                      }`}>
                        {asset.isPublic ? "Public" : "Private"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
