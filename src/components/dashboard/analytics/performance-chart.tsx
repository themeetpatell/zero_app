"use client";

import { BarChart3 } from "lucide-react";

interface PerformanceChartProps {
  timeRange: string;
}

export default function PerformanceChart({ timeRange }: PerformanceChartProps) {
  const data = [
    { day: "Mon", revenue: 4200, views: 28000, ctr: 4.5, conversion: 2.2 },
    { day: "Tue", revenue: 5100, views: 32000, ctr: 4.8, conversion: 2.4 },
    { day: "Wed", revenue: 4800, views: 30000, ctr: 4.6, conversion: 2.3 },
    { day: "Thu", revenue: 6200, views: 38000, ctr: 5.2, conversion: 2.6 },
    { day: "Fri", revenue: 7800, views: 45000, ctr: 5.5, conversion: 2.8 },
    { day: "Sat", revenue: 8900, views: 52000, ctr: 5.8, conversion: 3.1 },
    { day: "Sun", revenue: 8200, views: 48000, ctr: 5.4, conversion: 2.9 },
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-teal-500" />
        <h2 className="text-xl font-light text-sidebar-foreground">Revenue Performance</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-end justify-between gap-2 h-64">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end h-full">
                <div
                  className="w-full bg-gradient-to-t from-teal-500 to-teal-600 rounded-t-lg transition-all hover:from-teal-600 hover:to-teal-700 cursor-pointer relative group"
                  style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-underlay border border-border-subtle rounded px-2 py-1 text-xs text-sidebar-foreground whitespace-nowrap">
                    ${(item.revenue / 1000).toFixed(1)}K
                  </div>
                </div>
              </div>
              <div className="text-xs text-text-quiet font-medium">{item.day}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border-subtle">
          <div className="text-center">
            <div className="text-xs text-text-quiet mb-1">Avg Daily Revenue</div>
            <div className="text-lg font-medium text-sidebar-foreground">
              ${(data.reduce((acc, d) => acc + d.revenue, 0) / data.length / 1000).toFixed(1)}K
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-text-quiet mb-1">Avg Daily Views</div>
            <div className="text-lg font-medium text-sidebar-foreground">
              {(data.reduce((acc, d) => acc + d.views, 0) / data.length / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-text-quiet mb-1">Avg CTR</div>
            <div className="text-lg font-medium text-green-400">
              {(data.reduce((acc, d) => acc + d.ctr, 0) / data.length).toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-text-quiet mb-1">Avg Conversion</div>
            <div className="text-lg font-medium text-blue-400">
              {(data.reduce((acc, d) => acc + d.conversion, 0) / data.length).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

