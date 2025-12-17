"use client";

import { TrendingUp } from "lucide-react";

interface RevenueChartProps {
  period: string;
}

export default function RevenueChart({ period }: RevenueChartProps) {
  const data = [
    { label: "Week 1", amount: 3200 },
    { label: "Week 2", amount: 4100 },
    { label: "Week 3", amount: 5800 },
    { label: "Week 4", amount: 6200 },
  ];

  const maxAmount = Math.max(...data.map(d => d.amount));
  const totalRevenue = data.reduce((acc, d) => acc + d.amount, 0);

  return (
    <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-light text-sidebar-foreground">Revenue Breakdown</h2>
        </div>
        <div className="text-right">
          <div className="text-2xl font-light text-sidebar-foreground">${(totalRevenue / 1000).toFixed(1)}K</div>
          <div className="text-xs text-text-quiet">Total {period}</div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 h-48 mb-6">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex flex-col justify-end h-full">
              <div
                className="w-full bg-gradient-to-t from-green-500 to-emerald-500 rounded-t-lg transition-all hover:from-green-600 hover:to-emerald-600 cursor-pointer relative group"
                style={{ height: `${(item.amount / maxAmount) * 100}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-bg-underlay border border-border-subtle rounded px-2 py-1 text-xs text-sidebar-foreground whitespace-nowrap">
                  ${(item.amount / 1000).toFixed(1)}K
                </div>
              </div>
            </div>
            <div className="text-xs text-text-quiet font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-subtle">
        <div>
          <div className="text-xs text-text-quiet mb-1">Platform Fee (15%)</div>
          <div className="text-lg font-medium text-sidebar-foreground">
            ${((totalRevenue * 0.15) / 1000).toFixed(1)}K
          </div>
        </div>
        <div>
          <div className="text-xs text-text-quiet mb-1">Your Earnings (85%)</div>
          <div className="text-lg font-medium text-green-400">
            ${((totalRevenue * 0.85) / 1000).toFixed(1)}K
          </div>
        </div>
        <div>
          <div className="text-xs text-text-quiet mb-1">Avg per Sale</div>
          <div className="text-lg font-medium text-sidebar-foreground">$513</div>
        </div>
      </div>
    </div>
  );
}

