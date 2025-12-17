"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, TrendingUp, Eye, ShoppingBag, DollarSign, Star, Play, Filter } from "lucide-react";
import MarketplaceGrid from "@/components/dashboard/marketplace/marketplace-grid";
import MarketplaceFilters from "@/components/dashboard/marketplace/marketplace-filters";
import AdDetailModal from "@/components/dashboard/marketplace/ad-detail-modal";

export default function MarketplacePage() {
  const [view, setView] = useState<"buy" | "sell">("buy");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [sortBy, setSortBy] = useState("trending");
  const [showFilters, setShowFilters] = useState(false);

  const stats = {
    totalAds: 2847,
    totalSales: 1200000,
    avgRating: 4.8,
    avgROI: 328,
  };

  const ads = [
    {
      id: 1,
      title: "Luxury Watch - Premium Edition",
      creator: "sophia_chen",
      thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600",
      duration: 30,
      resolution: "4K",
      category: "Luxury Goods",
      sellPrice: 499,
      rentPrice: 99,
      licensePrice: 299,
      views: 12453,
      purchases: 45,
      performance: { ctr: 4.8, conversion: 2.3, roi: 340, rating: 4.9 },
      tags: ["Luxury", "Watch", "Premium"],
    },
    {
      id: 2,
      title: "Tech Product Launch",
      creator: "marcus_studios",
      thumbnail: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600",
      duration: 45,
      resolution: "4K",
      category: "Technology",
      sellPrice: 399,
      rentPrice: 79,
      licensePrice: 249,
      views: 8932,
      purchases: 32,
      performance: { ctr: 5.2, conversion: 3.1, roi: 380, rating: 4.8 },
      tags: ["Tech", "Modern"],
    },
    {
      id: 3,
      title: "Fashion Spring Collection",
      creator: "aisha_creative",
      thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600",
      duration: 30,
      resolution: "4K",
      category: "Fashion",
      sellPrice: 349,
      rentPrice: 69,
      licensePrice: 219,
      views: 15621,
      purchases: 67,
      performance: { ctr: 6.1, conversion: 2.8, roi: 295, rating: 4.7 },
      tags: ["Fashion", "Spring"],
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-bg-underlay">
      <div className="max-w-[1800px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light text-sidebar-foreground mb-2">Marketplace</h1>
            <p className="text-text-quiet">Buy or sell high-performing AI ads</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-bg-subtle rounded-xl p-1 border border-border-subtle">
              <button
                onClick={() => setView("buy")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === "buy"
                    ? "bg-teal-500 text-white"
                    : "text-text-quiet hover:text-sidebar-foreground"
                }`}
              >
                Buy Ads
              </button>
              <button
                onClick={() => setView("sell")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === "sell"
                    ? "bg-teal-500 text-white"
                    : "text-text-quiet hover:text-sidebar-foreground"
                }`}
              >
                Sell Your Ads
              </button>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-4 py-2 rounded-xl bg-bg-subtle border border-border-subtle text-sm text-sidebar-foreground flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {view === "buy" && (
          <>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-bg-subtle border border-border-subtle rounded-xl p-4">
                <div className="text-2xl font-light text-teal-500 mb-1">
                  {stats.totalAds.toLocaleString()}
                </div>
                <div className="text-sm text-text-quiet">Total Ads</div>
              </div>
              <div className="bg-bg-subtle border border-border-subtle rounded-xl p-4">
                <div className="text-2xl font-light text-teal-500 mb-1">
                  ${(stats.totalSales / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-text-quiet">Total Sales</div>
              </div>
              <div className="bg-bg-subtle border border-border-subtle rounded-xl p-4">
                <div className="text-2xl font-light text-teal-500 mb-1">{stats.avgRating}</div>
                <div className="text-sm text-text-quiet">Avg. Rating</div>
              </div>
              <div className="bg-bg-subtle border border-border-subtle rounded-xl p-4">
                <div className="text-2xl font-light text-teal-500 mb-1">{stats.avgROI}%</div>
                <div className="text-sm text-text-quiet">Avg. ROI</div>
              </div>
            </div>

            <div className="flex gap-6">
              {(showFilters || window.innerWidth >= 768) && (
                <div className="w-64">
                  <MarketplaceFilters
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-text-quiet">{ads.length} ads found</div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-bg-subtle border border-border-subtle rounded-lg text-sm text-sidebar-foreground"
                  >
                    <option value="trending">Trending</option>
                    <option value="top-rated">Top Rated</option>
                    <option value="best-roi">Best ROI</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
                <MarketplaceGrid ads={ads} onAdClick={setSelectedAd} />
              </div>
            </div>
          </>
        )}

        {view === "sell" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 border border-teal-500/20 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-6">
                <Plus className="w-10 h-10 text-teal-400" />
              </div>
              <h2 className="text-3xl font-light text-sidebar-foreground mb-3">Sell Your AI Ads</h2>
              <p className="text-text-quiet mb-8 max-w-2xl mx-auto">
                Monetize your creations. Earn 85% on every sale. Set your own prices for buy, rent, or license options.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
                  <DollarSign className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                  <div className="text-2xl font-light text-sidebar-foreground mb-1">85%</div>
                  <div className="text-sm text-text-quiet">Revenue Share</div>
                </div>
                <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
                  <ShoppingBag className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                  <div className="text-2xl font-light text-sidebar-foreground mb-1">3</div>
                  <div className="text-sm text-text-quiet">Pricing Models</div>
                </div>
                <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
                  <TrendingUp className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                  <div className="text-2xl font-light text-sidebar-foreground mb-1">$513</div>
                  <div className="text-sm text-text-quiet">Avg. Sale Price</div>
                </div>
              </div>
              <button className="px-8 py-4 bg-teal-500 hover:bg-teal-600 rounded-xl text-base font-medium text-white transition-all inline-flex items-center gap-3">
                <Plus className="w-5 h-5" />
                List Your First Ad
              </button>
            </div>

            <div className="mt-8 bg-bg-subtle border border-border-subtle rounded-xl p-6">
              <h3 className="text-lg font-medium text-sidebar-foreground mb-4">How It Works</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 font-semibold mb-3">
                    1
                  </div>
                  <h4 className="font-medium text-sidebar-foreground">Create Your Ad</h4>
                  <p className="text-sm text-text-quiet">Use Voice Studio to generate your 4K video ad</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 font-semibold mb-3">
                    2
                  </div>
                  <h4 className="font-medium text-sidebar-foreground">Set Your Prices</h4>
                  <p className="text-sm text-text-quiet">Choose buy, rent, and license pricing</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 font-semibold mb-3">
                    3
                  </div>
                  <h4 className="font-medium text-sidebar-foreground">Earn 85%</h4>
                  <p className="text-sm text-text-quiet">Get paid weekly via Stripe or PayPal</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedAd && <AdDetailModal ad={selectedAd} onClose={() => setSelectedAd(null)} />}
    </div>
  );
}
