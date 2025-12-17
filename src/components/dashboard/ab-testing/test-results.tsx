"use client";

import { Trophy, TrendingUp, Eye, MousePointerClick } from "lucide-react";

interface TestResultsProps {
  test: any;
}

export default function TestResults({ test }: TestResultsProps) {
  const variants = Object.entries(test.results).map(([key, value]: [string, any]) => ({
    id: key,
    ...value
  }));

  const bestCTR = Math.max(...variants.map(v => v.ctr));
  const bestConversion = Math.max(...variants.map(v => v.conversion));

  return (
    <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 space-y-6">
      <div>
        <h3 className="text-lg font-light text-sidebar-foreground mb-2">{test.name}</h3>
        <p className="text-sm text-text-quiet">Comparing {variants.length} variants</p>
      </div>

      <div className="space-y-4">
        {variants.map((variant) => {
          const isBestCTR = variant.ctr === bestCTR;
          const isBestConversion = variant.conversion === bestConversion;
          const isWinner = test.winner === variant.id;

          return (
            <div
              key={variant.id}
              className={`p-4 rounded-xl border-2 ${
                isWinner
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-bg-underlay border-border-subtle"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-sidebar-foreground">{variant.name}</h4>
                {isWinner && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-500 rounded-full text-xs text-white">
                    <Trophy className="w-3 h-3" />
                    Winner
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 text-xs text-text-quiet">
                      <MousePointerClick className="w-3 h-3" />
                      <span>Click-Through Rate</span>
                    </div>
                    <span className={`text-sm font-medium ${isBestCTR ? "text-green-400" : "text-sidebar-foreground"}`}>
                      {variant.ctr}%
                    </span>
                  </div>
                  <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isBestCTR ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-gray-500"}`}
                      style={{ width: `${(variant.ctr / bestCTR) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 text-xs text-text-quiet">
                      <TrendingUp className="w-3 h-3" />
                      <span>Conversion Rate</span>
                    </div>
                    <span className={`text-sm font-medium ${isBestConversion ? "text-blue-400" : "text-sidebar-foreground"}`}>
                      {variant.conversion}%
                    </span>
                  </div>
                  <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isBestConversion ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-gray-500"}`}
                      style={{ width: `${(variant.conversion / bestConversion) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-border-subtle">
                  <div className="flex items-center gap-1 text-xs text-text-quiet">
                    <Eye className="w-3 h-3" />
                    <span>{(variant.impressions / 1000).toFixed(1)}K impressions</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-teal-500/10 via-teal-500/10 to-pink-500/10 border border-teal-500/20 rounded-xl p-4">
        <h4 className="text-sm font-medium text-sidebar-foreground mb-2">Statistical Significance</h4>
        <div className="space-y-2 text-xs text-text-quiet">
          <div className="flex items-center justify-between">
            <span>Confidence Level:</span>
            <span className="text-green-400 font-medium">95%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Sample Size:</span>
            <span className="text-sidebar-foreground font-medium">{(test.impressions / 1000).toFixed(1)}K</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Test Duration:</span>
            <span className="text-sidebar-foreground font-medium">7 days</span>
          </div>
        </div>
      </div>

      {test.status === "running" && (
        <button className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl text-sm font-medium text-white transition-all">
          Stop Test & Deploy Winner
        </button>
      )}
    </div>
  );
}

