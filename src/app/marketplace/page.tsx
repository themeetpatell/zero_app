"use client";

import Link from "next/link";
import type { ElementType } from "react";
import { useMemo, useRef, useState } from "react";
import { Flame, Star, Clock3, Heart, ShoppingBag, Sparkles } from "lucide-react";
import HeaderNavigation from "@/components/sections/header-navigation";
import FooterNavigation from "@/components/sections/footer-navigation";

type MarketplaceItem = {
  id: string;
  title: string;
  category: string;
  format: string;
  thumbnail: string;
  videoSrc?: string;
  creator: string;
  downloads: number;
  likes: number;
  createdAt: string;
};

const marketplaceItems: MarketplaceItem[] = [
  {
    id: "1",
    title: "Cinematic launch for a DTC watch",
    category: "DTC",
    format: "30s / 4K",
    thumbnail: "https://images.pexels.com/photos/9897285/pexels-photo-9897285.jpeg?auto=compress&cs=tinysrgb&w=1200",
    videoSrc: "/herovideo.mp4",
    creator: "Studio North",
    downloads: 1820,
    likes: 890,
    createdAt: "2025-01-17",
  },
  {
    id: "2",
    title: "UGC TikTok ad for skincare",
    category: "UGC",
    format: "20s / 9:16",
    thumbnail: "https://images.pexels.com/photos/376401/pexels-photo-376401.jpeg?auto=compress&cs=tinysrgb&w=1200",
    videoSrc: "/herovideo.mp4",
    creator: "Creator Lab",
    downloads: 1430,
    likes: 720,
    createdAt: "2025-01-20",
  },
  {
    id: "3",
    title: "App install explainer with live demo",
    category: "Apps",
    format: "25s / 1:1",
    thumbnail: "https://images.pexels.com/photos/276466/pexels-photo-276466.jpeg?auto=compress&cs=tinysrgb&w=1200",
    videoSrc: "/herovideo.mp4",
    creator: "MotionHaus",
    downloads: 980,
    likes: 460,
    createdAt: "2025-01-22",
  },
  {
    id: "4",
    title: "Retail DOOH loop for sneakers",
    category: "Retail",
    format: "15s / 16:9",
    thumbnail: "https://images.pexels.com/photos/134064/pexels-photo-134064.jpeg?auto=compress&cs=tinysrgb&w=1200",
    videoSrc: "/herovideo.mp4",
    creator: "Gridline",
    downloads: 760,
    likes: 410,
    createdAt: "2025-01-23",
  },
  {
    id: "5",
    title: "B2B explainer for AI ops",
    category: "B2B",
    format: "40s / 16:9",
    thumbnail: "https://images.pexels.com/photos/3730769/pexels-photo-3730769.jpeg?auto=compress&cs=tinysrgb&w=1200",
    videoSrc: "/herovideo.mp4",
    creator: "Signal Studio",
    downloads: 640,
    likes: 380,
    createdAt: "2025-01-19",
  },
  {
    id: "6",
    title: "CTV ad for smart home launch",
    category: "CTV",
    format: "30s / 16:9",
    thumbnail: "https://images.pexels.com/photos/4790263/pexels-photo-4790263.jpeg?auto=compress&cs=tinysrgb&w=1200",
    videoSrc: "/herovideo.mp4",
    creator: "Nightshift",
    downloads: 580,
    likes: 300,
    createdAt: "2025-01-24",
  },
];

type SortOption = "trending" | "popular" | "recent";

const sortConfig: Record<
  SortOption,
  { icon: ElementType; label: string; metric: (item: MarketplaceItem) => number | string }
> = {
  trending: { icon: Flame, label: "Trending", metric: (item) => item.downloads * 1.5 + item.likes },
  popular: { icon: Star, label: "Most popular", metric: (item) => item.downloads },
  recent: { icon: Clock3, label: "Most recent", metric: (item) => item.createdAt },
};

const categories = ["All", "DTC", "UGC", "Apps", "Retail", "B2B", "CTV"];

export default function MarketplacePage() {
  const [sortBy, setSortBy] = useState<SortOption>("trending");
  const [category, setCategory] = useState<string>("All");
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    return marketplaceItems
      .filter((item) => (category === "All" ? true : item.category === category))
      .sort((a, b) => {
        const sorter = sortConfig[sortBy].metric;
        const aVal = sorter(a);
        const bVal = sorter(b);

        if (sortBy === "recent") {
          return new Date(bVal as string).getTime() - new Date(aVal as string).getTime();
        }
        return (bVal as number) - (aVal as number);
      });
  }, [sortBy, category]);

  const SortIcon = sortConfig[sortBy].icon;

  const toggleLike = (id: string) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getLikeCount = (item: MarketplaceItem) => {
    const base = item.likes;
    return likes[item.id] ? base + 1 : base;
  };

  return (
    <>
      <HeaderNavigation />
      <main className="bg-white text-off-black">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-black via-[#0c0d0f] to-black text-white">
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <div className="absolute -left-10 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
            <div className="absolute right-0 bottom-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.05),transparent_45%)]" />
          </div>
          <div className="rw-container relative py-24 lg:py-28">
            <div className="max-w-4xl space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white/80">
                Marketplace • Trending • Fresh from creators
              </div>
              <h1 className="text-[42px] sm:text-[52px] lg:text-[64px] leading-[1.05] font-normal">
                Discover, rent, and customize the top-performing AI ads.
              </h1>
              <p className="text-lg text-white/80 max-w-3xl leading-relaxed">
                Pull live inspiration from the Zero Human marketplace. These ads are created with the AI Co-Director, ranked by performance and freshness.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://make.zerohuman.co"
                  className="rw-cta-text px-5 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap text-black bg-white border border-white hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)]"
                >
                  Open marketplace
                </a>
                <a
                  href="/signin"
                  className="rw-cta-text px-5 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap text-white border border-white/40 hover:bg-white/10"
                >
                  List my ad
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="bg-white border-b border-black/5">
          <div className="rw-container py-6 flex flex-wrap items-center gap-4 justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-3.5 py-2 text-sm border transition-colors ${category === cat ? "bg-off-black text-white border-off-black" : "bg-white text-off-black border-black/10 hover:bg-off-white"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <SortIcon className="h-4 w-4 text-off-black/70" />
              <span className="text-sm text-off-black/70">Sort:</span>
              <div className="flex rounded-full border border-black/10 overflow-hidden">
                {(Object.keys(sortConfig) as SortOption[]).map((option) => {
                  const Icon = sortConfig[option].icon;
                  return (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors ${
                        sortBy === option ? "bg-off-black text-white" : "bg-white text-off-black hover:bg-off-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {sortConfig[option].label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-white py-12 lg:py-16">
          <div className="rw-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <MarketplaceCard
                  key={item.id}
                  item={item}
                  onLike={() => toggleLike(item.id)}
                  liked={!!likes[item.id]}
                  likeCount={getLikeCount(item)}
                />
              ))}
            </div>
            <div className="mt-10 flex items-center justify-center">
              <a
                href="https://make.zerohuman.co"
                className="rw-cta-text px-5 pt-[10px] pb-[11px] rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap text-black bg-off-white border border-black/10 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)]"
              >
                See full marketplace
              </a>
            </div>
          </div>
        </section>
      </main>
      <FooterNavigation />
    </>
  );
}

type CardProps = {
  item: MarketplaceItem;
  liked: boolean;
  likeCount: number;
  onLike: () => void;
};

const MarketplaceCard = ({ item, liked, likeCount, onLike }: CardProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleHover = (play: boolean) => {
    const video = videoRef.current;
    if (!video) return;
    if (play) {
      video.currentTime = 0;
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className="relative overflow-hidden">
        {item.videoSrc ? (
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            poster={item.thumbnail}
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
            <source src={item.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-white/90 text-off-black">
            {item.category}
          </span>
          <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-black/70 text-white border border-white/10">
            {item.format}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={onLike}
            className="rounded-full bg-white/20 backdrop-blur text-white p-2 border border-white/30 hover:bg-white/30 transition-colors"
            aria-label="Like"
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-white" : ""}`} />
          </button>
          <a
            href="https://make.zerohuman.co"
            className="rounded-full bg-white text-black px-3 py-2 text-xs font-semibold flex items-center gap-1 border border-white hover:-translate-y-0.5 transition-transform"
          >
            <ShoppingBag className="h-4 w-4" />
            Rent/Buy
          </a>
        </div>
      </div>
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-semibold text-off-black leading-tight group-hover:text-black">
          {item.title}
        </h3>
        <p className="text-sm text-off-black/70">By {item.creator}</p>
        <div className="flex items-center gap-4 text-xs text-off-black/60 pt-1">
          <span className="inline-flex items-center gap-1">
            <Flame className="h-3.5 w-3.5" />
            {item.downloads.toLocaleString()} downloads
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" />
            {likeCount.toLocaleString()} likes
          </span>
        </div>
        <div className="flex gap-2 pt-2">
          <a
            href="https://make.zerohuman.co"
            className="flex-1 rounded-full border border-black/10 bg-off-white px-3 py-2 text-sm font-medium text-off-black hover:-translate-y-0.5 transition-transform"
          >
            Customize
          </a>
          <a
            href="/signin"
            className="flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-medium text-off-black hover:-translate-y-0.5 transition-transform"
          >
            <Sparkles className="h-4 w-4" />
            Generate similar
          </a>
        </div>
      </div>
    </article>
  );
};
