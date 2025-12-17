"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, Eye, MousePointerClick, Users, BarChart3, ArrowUp, ArrowDown } from "lucide-react";
import PerformanceChart from "@/components/dashboard/analytics/performance-chart";
import TopPerformingAds from "@/components/dashboard/analytics/top-performing-ads";
import AudienceInsights from "@/components/dashboard/analytics/audience-insights";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  const stats = {
    revenue: { value: 45680, change: 23.5, trend: "up" },
    views: { value: 284530, change: 18.2, trend: "up" },
    ctr: { value: 4.8, change: 12.3, trend: "up" },
    conversion: { value: 2.4, change: -3.2, trend: "down" },
    roi: { value: 342, change: 28.7, trend: "up" },
    activeAds: { value: 12, change: 0, trend: "neutral" }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-bg-underlay">
      <div className="max-w-[1800px] mx-auto p-8 space-y-6">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light text-sidebar-foreground mb-2">Analytics</h1>
            <p className="text-text-quiet">Real-time performance insights</p>
          </div>
          <div className="flex gap-2">
            {["24h", "7d", "30d", "90d", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? "bg-teal-500 text-white"
                    : "bg-bg-subtle hover:bg-bg-offset text-text-quiet hover:text-sidebar-foreground"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-teal-400" />
              </div>
              {stats.revenue.trend !== "neutral" && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stats.revenue.trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                }`}>
                  {stats.revenue.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {Math.abs(stats.revenue.change)}%
                </div>
              )}
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              ${(stats.revenue.value / 1000).toFixed(1)}K
            </div>
            <div className="text-sm text-text-quiet">Total Revenue</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-teal-400" />
              </div>
              {stats.views.trend !== "neutral" && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stats.views.trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                }`}>
                  {stats.views.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {Math.abs(stats.views.change)}%
                </div>
              )}
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              {(stats.views.value / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-text-quiet">Total Views</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-teal-400" />
              </div>
              {stats.ctr.trend !== "neutral" && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stats.ctr.trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                }`}>
                  {stats.ctr.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {Math.abs(stats.ctr.change)}%
                </div>
              )}
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              {stats.ctr.value}%
            </div>
            <div className="text-sm text-text-quiet">Click-Through Rate</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-teal-400" />
              </div>
              {stats.conversion.trend !== "neutral" && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stats.conversion.trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                }`}>
                  {stats.conversion.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {Math.abs(stats.conversion.change)}%
                </div>
              )}
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              {stats.conversion.value}%
            </div>
            <div className="text-sm text-text-quiet">Conversion Rate</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-teal-400" />
              </div>
              {stats.roi.trend !== "neutral" && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stats.roi.trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                }`}>
                  {stats.roi.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {Math.abs(stats.roi.change)}%
                </div>
              )}
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              {stats.roi.value}%
            </div>
            <div className="text-sm text-text-quiet">Average ROI</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              {stats.activeAds.value}
            </div>
            <div className="text-sm text-text-quiet">Active Campaigns</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart timeRange={timeRange} />
          </div>
          <div>
            <AudienceInsights />
          </div>
        </div>

        <TopPerformingAds />
      </div>
    </div>
  );
}
