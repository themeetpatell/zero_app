"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, PlayCircle, Search, ShoppingBag, Sparkles, Download, Eye } from "lucide-react";

type MarketplaceAsset = {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  category: string;
  duration: string;
  quality: string;
  downloads: number;
  likes: number;
  isLiked?: boolean;
  prompt: string;
};

interface CommunityExploreProps {
  onInputFocus?: () => void;
  onGenerate?: (prompt: string) => void;
}

const assets: MarketplaceAsset[] = [
  {
    id: "watch-1",
    title: "Cinematic launch for a DTC watch",
    creator: "Studio North",
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
    category: "DTC",
    duration: "30s",
    quality: "4K",
    downloads: 1820,
    likes: 890,
    isLiked: false,
    prompt: "Cinematic aerial city night drive, sleek transitions, upscale soundtrack, hero shots of premium DTC watch with neon reflections.",
  },
  {
    id: "app-1",
    title: "Hook-first launch for a mobile app",
    creator: "Peak Studio",
    thumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    category: "Apps",
    duration: "20s",
    quality: "4K",
    downloads: 2360,
    likes: 1210,
    isLiked: true,
    prompt: "POV swipe cuts of mobile app, fast-paced UI closeups, energetic VO and captions, CTA anchored to App Store + Play.",
  },
  {
    id: "beauty-1",
    title: "UGC review for clean skincare",
    creator: "Creator Lane",
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    category: "Beauty",
    duration: "25s",
    quality: "4K",
    downloads: 1640,
    likes: 980,
    isLiked: false,
    prompt: "Handheld UGC with soft daylight, closeups of clean skincare texture, lower-third testimonials, soft piano + subtle captions.",
  },
  {
    id: "saas-1",
    title: "Founder split-screen for B2B SaaS",
    creator: "Northbeam Labs",
    thumbnail: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
    category: "B2B",
    duration: "35s",
    quality: "4K",
    downloads: 940,
    likes: 420,
    isLiked: false,
    prompt: "Founder direct-to-camera split-screen with product UI, concise value props, clean captions, confident scoring, CTA to demo.",
  },
];

export default function CommunityExplore({ onInputFocus, onGenerate }: CommunityExploreProps) {
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<Set<string>>(
    new Set(assets.filter((a) => a.isLiked).map((a) => a.id))
  );

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return assets.filter(
      (asset) =>
        asset.title.toLowerCase().includes(term) ||
        asset.creator.toLowerCase().includes(term) ||
        asset.category.toLowerCase().includes(term)
    );
  }, [search]);

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleGenerate = (asset: MarketplaceAsset) => {
    onInputFocus?.();
    onGenerate?.(asset.prompt);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-bg-underlay">
      <div className="flex-none border-b border-border-subtle bg-bg-subtle/50 backdrop-blur-xl px-6 py-4">
        <div className="flex items-center gap-4 max-w-7xl mx-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-quiet" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={onInputFocus}
              placeholder="Search templates..."
              className="w-full rounded-xl border border-border-subtle bg-bg-underlay pl-11 pr-4 py-2.5 text-sm text-sidebar-foreground placeholder:text-text-quiet focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-quiet">{filtered.length} templates</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((asset, index) => {
              const isLiked = liked.has(asset.id);
              const likeCount = asset.likes + (isLiked && !asset.isLiked ? 1 : 0) - (asset.isLiked && !isLiked ? 1 : 0);

              return (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-xl bg-bg-subtle border border-border-subtle hover:border-teal-500/50 transition-all cursor-pointer"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <img
                      src={asset.thumbnail}
                      alt={asset.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                        {asset.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                        {asset.duration} / {asset.quality}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(asset.id);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 transition-all hover:scale-110 border border-white/10"
                      >
                        <Heart
                          className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`}
                        />
                      </button>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 hover:bg-teal-600 shadow-lg transition-all"
                      >
                        <PlayCircle className="h-7 w-7 text-white" />
                      </motion.button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGenerate(asset);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-bg-subtle/95 backdrop-blur-xl border border-border-subtle hover:border-teal-500/50 px-4 py-2.5 text-sm font-medium text-sidebar-foreground transition-all"
                        >
                          <Sparkles className="h-4 w-4" />
                          Customize
                        </button>
                        <button className="flex items-center justify-center rounded-xl bg-teal-500/95 backdrop-blur-xl hover:bg-teal-600 px-4 py-2.5 transition-all">
                          <ShoppingBag className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-sidebar-foreground leading-tight mb-1 line-clamp-2">
                        {asset.title}
                      </h3>
                      <p className="text-xs text-text-quiet">By {asset.creator}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-text-quiet">
                      <div className="flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span>{(asset.downloads / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                        <span>{(likeCount / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <Eye className="h-12 w-12 text-text-quiet mx-auto mb-3" />
                <p className="text-sm text-text-quiet">No templates match your search</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
