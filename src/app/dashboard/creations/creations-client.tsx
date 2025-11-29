"use client";

import { useEffect, useState } from "react";
import { Search, Heart, Download, Share2, MoreVertical, Flag, Copy, Sparkles } from "lucide-react";

type Category = "all" | "saved" | "public" | "private";
type SubCategory = "videos" | "uploads";

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

const mockAssets: Asset[] = [
  {
    id: "1",
    type: "image",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    prompt: "A professional portrait of a woman in natural lighting, soft focus background",
    aspectRatio: "3:4",
    isPublic: true,
    isSaved: false,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    type: "image",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    prompt: "Cinematic portrait with dramatic lighting and composition",
    aspectRatio: "1:1",
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
    type: "image",
    url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    prompt: "Abstract digital art with vibrant colors and geometric patterns",
    aspectRatio: "4:3",
    isPublic: false,
    isSaved: false,
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    type: "image",
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    prompt: "Time-lapse of city lights at night with urban skyline",
    aspectRatio: "9:16",
    isPublic: true,
    isSaved: true,
    createdAt: "2024-01-11",
  },
  {
    id: "6",
    type: "image",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    prompt: "Fashion photography with dramatic lighting and bold colors",
    aspectRatio: "1:1",
    isPublic: true,
    isSaved: false,
    createdAt: "2024-01-10",
  },
];

const getAspectRatioClass = (ratio: string) => {
  switch (ratio) {
    case "1:1":
      return "aspect-square";
    case "16:9":
      return "aspect-video";
    case "9:16":
      return "aspect-[9/16]";
    case "4:3":
      return "aspect-[4/3]";
    case "3:4":
      return "aspect-[3/4]";
    default:
      return "aspect-square";
  }
};

export default function CreationsPage() {
  const [category, setCategory] = useState<Category>("all");
  const [subCategory, setSubCategory] = useState<SubCategory>("videos");
  const [shareAsset, setShareAsset] = useState<Asset | null>(null);
  const [reportAsset, setReportAsset] = useState<Asset | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [savedAssets, setSavedAssets] = useState<Set<string>>(
    new Set(mockAssets.filter((a) => a.isSaved).map((a) => a.id))
  );
  const [showCanvas, setShowCanvas] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowCanvas(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleDownload = async (asset: Asset) => {
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

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowCanvas(true);
      // Handle generation logic here
    }
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

    if (category === "all") {
      if (subCategory === "videos") {
        filtered = filtered.filter((a) => a.type === "video");
      } else {
        filtered = filtered.filter((a) => a.type === "image");
      }
    }

    return filtered;
  };

  const filteredAssets = filterAssets();

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#1A1B1B]">
      {/* Header */}
      <div className="flex-none border-b border-[#2C2E2E] bg-[#1F2020] px-6 py-2">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-[#9B9C9C]" />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-6">
            {(["all", "saved", "public", "private"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`relative pb-1 text-[13px] font-normal transition-colors capitalize ${
                  category === cat ? "text-[#E8E9E9]" : "text-[#9B9C9C] hover:text-[#E8E9E9]"
                }`}
              >
                {cat}
                {category === cat && (
                  <hr className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CC785C]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-category for "All" */}
        {category === "all" && (
          <div className="mt-2 flex items-center gap-4 border-t border-[#2C2E2E] pt-2">
            {(["videos", "uploads"] as SubCategory[]).map((sub) => (
              <button
                key={sub}
                onClick={() => setSubCategory(sub)}
                className={`relative pb-1 text-[13px] font-normal transition-colors capitalize ${
                  subCategory === sub ? "text-[#E8E9E9]" : "text-[#9B9C9C] hover:text-[#E8E9E9]"
                }`}
              >
                {sub}
                {subCategory === sub && (
                  <hr className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CC785C]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {showCanvas ? (
          <div className="flex h-full items-center justify-center bg-[#1A1B1B]">
            <div className="text-[#9B9C9C]">Generation canvas area</div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              {filteredAssets.length === 0 ? (
                <div className="flex h-64 items-center justify-center text-[#9B9C9C]">
                  No assets found in this category
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredAssets.map((asset) => (
                    <div key={asset.id} className="group relative overflow-hidden rounded-lg">
                      <div className={`w-full overflow-hidden rounded-lg bg-[#252626] relative ${getAspectRatioClass(asset.aspectRatio)}`}>
                        {asset.type === "video" ? (
                          <div className="relative h-full w-full">
                            <img
                              src={asset.url}
                              alt="Video thumbnail"
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50">
                                <div className="ml-1 h-0 w-0 border-l-8 border-y-6 border-l-white border-y-transparent" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={asset.url}
                            alt="Creation"
                            className="h-full w-full object-cover"
                          />
                        )}

                        {/* Top Bar - Shows on hover */}
                        <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          <div className="flex items-center justify-end">
                            <div className="relative">
                              <button 
                                onClick={() => setOpenMenuId(openMenuId === asset.id ? null : asset.id)}
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                              >
                                <MoreVertical className="h-4 w-4 text-white" />
                              </button>
                              
                              {openMenuId === asset.id && (
                                <div className="absolute right-0 top-8 w-48 rounded-lg bg-[#2C2E2E] border border-[#3C3E3E] shadow-lg overflow-hidden z-20">
                                  <button
                                    onClick={() => {
                                      setReportAsset(asset);
                                      setOpenMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#E8E9E9] hover:bg-[#252626] transition-colors"
                                  >
                                    <Flag className="h-4 w-4" />
                                    Report
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleDownload(asset);
                                      setOpenMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#E8E9E9] hover:bg-[#252626] transition-colors"
                                  >
                                    <Download className="h-4 w-4" />
                                    Download
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Action Bar - Shows on hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="space-y-2">
                            <p className="text-xs text-white line-clamp-2 leading-relaxed">
                              {asset.prompt}
                            </p>

                            <div className="flex items-center justify-between">
                              <button
                                onClick={() => handleToggleSaved(asset.id)}
                                className="flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 hover:bg-white/30 transition-colors"
                              >
                                <Heart
                                  className={`h-3.5 w-3.5 ${
                                    savedAssets.has(asset.id)
                                      ? "fill-[#CC785C] text-[#CC785C]"
                                      : "text-white"
                                  }`}
                                />
                              </button>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleCopyPrompt(asset.prompt)}
                                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                                  title="Copy Prompt"
                                >
                                  <Copy className="h-3.5 w-3.5 text-white" />
                                </button>

                                <button
                                  onClick={() => setShareAsset(asset)}
                                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                                  title="Share"
                                >
                                  <Share2 className="h-3.5 w-3.5 text-white" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {savedAssets.has(asset.id) && (
                          <div className="absolute right-3 top-3 z-[5]">
                            <Heart className="h-5 w-5 fill-[#CC785C] text-[#CC785C] drop-shadow-lg" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>


      {/* Share Dialog */}
      {shareAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#2C2E2E] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-[#E8E9E9] mb-4">Share Creation</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={shareAsset.url}
                readOnly
                className="w-full bg-[#1F2020] border border-[#3C3E3E] rounded-lg px-3 py-2 text-sm text-[#E8E9E9]"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(shareAsset.url)}
                  className="flex-1 bg-[#CC785C] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#B66A4F] transition-colors"
                >
                  Copy Link
                </button>
                <button
                  onClick={() => setShareAsset(null)}
                  className="flex-1 bg-[#3C3E3E] text-[#E8E9E9] rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#4C4E4E] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Dialog */}
      {reportAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#2C2E2E] rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-[#E8E9E9] mb-4">Report Content</h3>
            <p className="text-sm text-[#9B9C9C] mb-4">
              Please let us know why you're reporting this content.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setReportAsset(null)}
                className="flex-1 bg-[#CC785C] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#B66A4F] transition-colors"
              >
                Submit Report
              </button>
              <button
                onClick={() => setReportAsset(null)}
                className="flex-1 bg-[#3C3E3E] text-[#E8E9E9] rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#4C4E4E] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}