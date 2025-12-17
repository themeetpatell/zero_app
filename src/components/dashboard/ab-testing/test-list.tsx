"use client";

import { FlaskConical, Play, CheckCircle, Eye, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface TestListProps {
  tests: any[];
  onTestClick: (test: any) => void;
}

export default function TestList({ tests, onTestClick }: TestListProps) {
  return (
    <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
      <h2 className="text-xl font-light text-sidebar-foreground mb-6">Your Experiments</h2>

      <div className="space-y-4">
        {tests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onTestClick(test)}
            className="p-5 bg-bg-underlay border border-border-subtle rounded-xl hover:border-teal-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  test.status === "running"
                    ? "bg-gradient-to-br from-green-500 to-emerald-500"
                    : "bg-gradient-to-br from-blue-500 to-cyan-500"
                }`}>
                  {test.status === "running" ? (
                    <Play className="w-5 h-5 text-white" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-sidebar-foreground mb-1">{test.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-text-quiet">
                    <span>{test.variants} variants</span>
                    <span>•</span>
                    <span>Started {test.startDate}</span>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                test.status === "running"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-blue-500/10 text-blue-400"
              }`}>
                {test.status === "running" ? "Running" : "Completed"}
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-text-quiet" />
                <span className="text-sidebar-foreground">{(test.impressions / 1000).toFixed(1)}K</span>
                <span className="text-text-quiet">impressions</span>
              </div>
              {test.winner && (
                <div className="flex items-center gap-1 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Winner: {test.results[test.winner].name}</span>
                </div>
              )}
            </div>

            {test.status === "running" && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-text-quiet mb-1">
                  <span>Test Progress</span>
                  <span>68% complete</span>
                </div>
                <div className="h-1.5 bg-bg-subtle rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: "68%" }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

