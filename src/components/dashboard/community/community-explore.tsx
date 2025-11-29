"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MoreVertical, Heart, Download, Copy, Sparkles, ArrowRight, Flag, X } from "lucide-react";
import ReportDialog from "@/components/dashboard/modals/report-dialog";
import ShareDialog from "../modals/share-dialog";

type TimeFilter = "hour" | "day" | "week" | "month" | "all";

interface CommunityAsset {
  id: string;
  type: "image" | "video";
  url: string;
  videoUrl?: string;
  prompt: string;
  aspectRatio: string;
  likes: number;
  isLiked: boolean;
  username: string;
  userAvatar: string;
  createdAt: string;
}

const mockCommunityAssets: CommunityAsset[] = [
  {
    id: "1",
    type: "image",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    prompt: "A professional portrait of a woman in natural lighting, soft focus background, Canon 85mm f/1.4",
    aspectRatio: "3:4",
    likes: 234,
    isLiked: false,
    username: "John",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    type: "video",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    prompt: "Cinematic drone shot flying over mountain peaks at sunset, golden hour lighting, 4K resolution",
    aspectRatio: "16:9",
    likes: 567,
    isLiked: true,
    username: "Sarah",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    createdAt: "2024-01-15T09:15:00Z",
  },
  // ... rest of your mock assets
];

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ");

const getAspectRatioClass = (ratio: string) => {
  switch (ratio) {
    case "1:1": return "aspect-square";
    case "16:9": return "aspect-video";
    case "9:16": return "aspect-[9/16]";
    case "4:3": return "aspect-[4/3]";
    case "3:4": return "aspect-[3/4]";
    default: return "aspect-square";
  }
};

export default function CommunityExplore() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("day");
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<CommunityAsset | null>(null);
  const [shareAsset, setShareAsset] = useState<CommunityAsset | null>(null);
  const [likedAssets, setLikedAssets] = useState<Set<string>>(
    new Set(mockCommunityAssets.filter((a) => a.isLiked).map((a) => a.id))
  );
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedAsset(null);
        setOpenMenuId(null);
        setIsReportDialogOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLike = (assetId: string) => {
    setLikedAssets((prev) => {
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

  const handleDownload = async (asset: CommunityAsset) => {
    try {
      const response = await fetch(asset.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `creation-${asset.id}.${asset.type === "video" ? "mp4" : "jpg"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleVideoHover = (assetId: string, isHovering: boolean) => {
    const video = videoRefs.current[assetId];
    if (video) {
      if (isHovering) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const filteredAssets = mockCommunityAssets.filter((asset) => {
    if (searchQuery) {
      return (
        asset.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#1a1a1a]">
      {/* Header */}
      <div className="flex-none border-b border-border-subtlest bg-bg-base px-6 py-2">
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-quiet" />
            <input
              type="text"
              placeholder="Search videos and prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-sm bg-bg-raised border border-border-subtlest pl-10 pr-4 py-1.5 text-xs font-light text-foreground placeholder:text-text-quieter focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          {/* Time Filter Dropdown */}
          <div className="relative">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
              className="appearance-none rounded-sm bg-bg-base border border-border-subtlest pl-3 pr-9 py-1.5 text-xs font-light text-text-foreground hover:bg-bg-raised focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer transition-colors"
            >
              <option value="hour">Top hour</option>
              <option value="day">Top day</option>
              <option value="week">Top week</option>
              <option value="month">Top month</option>
              <option value="all">All time</option>
            </select>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
              <svg className="h-3.5 w-3.5 text-text-quiet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {filteredAssets.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-gray-500">
            No creations found matching your search
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer"
                onMouseEnter={() => asset.type === "video" && handleVideoHover(asset.id, true)}
                onMouseLeave={() => asset.type === "video" && handleVideoHover(asset.id, false)}
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="relative w-full bg-[#2a2a2a] overflow-hidden rounded-xl">
                  {asset.type === "video" ? (
                    <div className="relative w-full">
                      <video
                        ref={(el) => { videoRefs.current[asset.id] = el; }}
                        src={asset.videoUrl}
                        poster={asset.url}
                        loop
                        muted
                        playsInline
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity pointer-events-none">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                          <div className="ml-1 h-0 w-0 border-l-8 border-y-6 border-l-white border-y-transparent" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img src={asset.url} alt="Creation" className="w-full h-auto object-cover" />
                  )}

                  {/* Top Bar */}
                  <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={asset.userAvatar} alt={asset.username} className="h-6 w-6 rounded-full" />
                        <span className="text-xs text-white font-medium">{asset.username}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === asset.id ? null : asset.id);
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                      >
                        <MoreVertical className="h-4 w-4 text-white" />
                      </button>

                      {openMenuId === asset.id && (
                        <div className="absolute right-0 top-10 w-48 rounded-lg bg-[#2C2E2E] border border-[#3a3a3a] shadow-xl z-20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(null);
                              setIsReportDialogOpen(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-xs text-white hover:bg-[#3a3a3a]"
                          >
                            <Flag className="h-4 w-4" />
                            Report
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(asset);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-xs text-white hover:bg-[#3a3a3a]"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="space-y-1">
                      <p className="text-[11px] text-white line-clamp-2">{asset.prompt}</p>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(asset.id);
                          }}
                          className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2 py-1 hover:bg-white/30"
                        >
                          <Heart className={cn("h-3.5 w-3.5", likedAssets.has(asset.id) ? "fill-red-500 text-red-500" : "text-white")} />
                          <span className="text-xs text-white font-medium">
                            {asset.likes + (likedAssets.has(asset.id) && !asset.isLiked ? 1 : 0) - (asset.isLiked && !likedAssets.has(asset.id) ? 1 : 0)}
                          </span>
                        </button>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyPrompt(asset.prompt);
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                          >
                            <Copy className="h-3.5 w-3.5 text-white" />
                          </button>
                          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                            <Sparkles className="h-3.5 w-3.5 text-white" />
                          </button>
                          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30">
                            <ArrowRight className="h-3.5 w-3.5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {likedAssets.has(asset.id) && (
                    <div className="absolute right-3 top-3 z-[5]">
                      <Heart className="h-5 w-5 fill-red-500 text-red-500 drop-shadow-lg" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Viewer */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedAsset(null)}>
          <button
            onClick={() => setSelectedAsset(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          <div className="max-w-6xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative">
                {selectedAsset.type === "video" ? (
                  <video
                    src={selectedAsset.videoUrl}
                    poster={selectedAsset.url}
                    controls
                    autoPlay
                    loop
                    className="w-full max-h-[70vh] object-contain bg-black"
                  />
                ) : (
                  <img src={selectedAsset.url} alt="Creation" className="w-full max-h-[70vh] object-contain bg-black" />
                )}
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={selectedAsset.userAvatar} alt={selectedAsset.username} className="h-10 w-10 rounded-full" />
                    <div>
                      <p className="text-white font-medium">{selectedAsset.username}</p>
                      <p className="text-gray-400 text-xs">{new Date(selectedAsset.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLike(selectedAsset.id)}
                    className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 hover:bg-white/20"
                  >
                    <Heart className={cn("h-5 w-5", likedAssets.has(selectedAsset.id) ? "fill-red-500 text-red-500" : "text-white")} />
                    <span className="text-white font-medium">
                      {selectedAsset.likes + (likedAssets.has(selectedAsset.id) && !selectedAsset.isLiked ? 1 : 0) - (selectedAsset.isLiked && !likedAssets.has(selectedAsset.id) ? 1 : 0)}
                    </span>
                  </button>
                </div>

                <div>
                  <p className="text-gray-300 leading-relaxed">{selectedAsset.prompt}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyPrompt(selectedAsset.prompt)}
                    className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 text-white text-sm"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Prompt
                  </button>
                  <button className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 text-white text-sm">
                    <Sparkles className="h-4 w-4" />
                    Remix
                  </button>
                  <button
                    onClick={() => handleDownload(selectedAsset)}
                    className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 text-white text-sm"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Dialog */}
      <ReportDialog
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
      />
      
      {/* Share Dialog */}
      {shareAsset && (
        <ShareDialog
          open={!!shareAsset}
          onOpenChange={(open) => !open && setShareAsset(null)}
          url={shareAsset.url}
        />
      )}
    </div>
  );
}
