"use client";

import { useState } from "react";
import { FlaskConical, Plus, TrendingUp, Users, Eye } from "lucide-react";
import TestList from "@/components/dashboard/ab-testing/test-list";
import CreateTestModal from "@/components/dashboard/ab-testing/create-test-modal";
import TestResults from "@/components/dashboard/ab-testing/test-results";

export default function ABTestingPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>(null);

  const tests = [
    {
      id: 1,
      name: "Luxury Watch - Hook Variation",
      status: "running",
      variants: 2,
      impressions: 45230,
      startDate: "Dec 10, 2024",
      results: {
        variantA: { name: "Original Hook", ctr: 4.2, conversion: 2.1, impressions: 22615 },
        variantB: { name: "Emotional Hook", ctr: 5.8, conversion: 2.9, impressions: 22615 }
      }
    },
    {
      id: 2,
      name: "Fashion Brand - CTA Test",
      status: "running",
      variants: 3,
      impressions: 31420,
      startDate: "Dec 12, 2024",
      results: {
        variantA: { name: "Shop Now", ctr: 6.1, conversion: 2.5, impressions: 10473 },
        variantB: { name: "Get Yours", ctr: 6.8, conversion: 3.2, impressions: 10473 },
        variantC: { name: "Limited Time", ctr: 7.3, conversion: 3.5, impressions: 10474 }
      }
    },
    {
      id: 3,
      name: "Tech Product - Music Style",
      status: "completed",
      variants: 2,
      impressions: 52100,
      startDate: "Dec 5, 2024",
      results: {
        variantA: { name: "Upbeat Electronic", ctr: 5.2, conversion: 2.8, impressions: 26050 },
        variantB: { name: "Cinematic", ctr: 4.9, conversion: 2.6, impressions: 26050 }
      },
      winner: "variantA"
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-bg-underlay">
      <div className="max-w-[1800px] mx-auto p-8 space-y-6">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light text-sidebar-foreground mb-2">A/B Testing</h1>
            <p className="text-text-quiet">Optimize your ads with data-driven experiments</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-xl text-sm font-medium text-white transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Test
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              {tests.length}
            </div>
            <div className="text-sm text-text-quiet">Active Tests</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              +38%
            </div>
            <div className="text-sm text-text-quiet">Avg. Improvement</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              128K
            </div>
            <div className="text-sm text-text-quiet">Total Impressions</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              95%
            </div>
            <div className="text-sm text-text-quiet">Confidence Level</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TestList 
              tests={tests}
              onTestClick={setSelectedTest}
            />
          </div>
          <div>
            {selectedTest ? (
              <TestResults test={selectedTest} />
            ) : (
              <div className="bg-bg-subtle border border-border-subtle rounded-xl p-8 text-center">
                <FlaskConical className="w-12 h-12 text-text-quiet mx-auto mb-4" />
                <p className="text-text-quiet">Select a test to view detailed results</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateTestModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
