"use client";

import { Trophy, TrendingUp, Eye } from "lucide-react";

export default function TopPerformingAds() {
  const ads = [
    { id: 1, title: "Luxury Watch - Premium Edition", views: 12453, ctr: 4.8, roi: 340, rank: 1 },
    { id: 2, title: "Fashion Brand - Spring Collection", views: 15621, ctr: 6.1, roi: 295, rank: 2 },
    { id: 3, title: "Tech Product Launch - Modern", views: 8932, ctr: 5.2, roi: 380, rank: 3 },
    { id: 4, title: "Real Estate - Luxury Villa", views: 6789, ctr: 3.9, roi: 420, rank: 4 },
    { id: 5, title: "Food & Beverage - Restaurant", views: 21453, ctr: 7.3, roi: 315, rank: 5 },
  ];

  return (
    <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h2 className="text-xl font-light text-sidebar-foreground">Top Performing Ads</h2>
      </div>

      <div className="space-y-3">
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="p-4 bg-bg-underlay border border-border-subtle rounded-xl hover:border-teal-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                ad.rank === 1 ? "bg-gradient-to-br from-yellow-500 to-orange-500 text-white" :
                ad.rank === 2 ? "bg-gradient-to-br from-gray-400 to-gray-500 text-white" :
                ad.rank === 3 ? "bg-gradient-to-br from-orange-700 to-orange-800 text-white" :
                "bg-bg-subtle text-text-quiet"
              }`}>
                {ad.rank}
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium text-sidebar-foreground mb-2">{ad.title}</h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-text-quiet">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{(ad.views / 1000).toFixed(1)}K</span>
                  </div>
                  <div className="text-green-400">
                    CTR: {ad.ctr}%
                  </div>
                  <div className="text-teal-400">
                    ROI: {ad.roi}%
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Top {ad.rank}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

