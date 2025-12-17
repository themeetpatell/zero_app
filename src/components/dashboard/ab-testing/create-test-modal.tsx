"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus, Trash2 } from "lucide-react";

interface CreateTestModalProps {
  onClose: () => void;
}

export default function CreateTestModal({ onClose }: CreateTestModalProps) {
  const [testName, setTestName] = useState("");
  const [variants, setVariants] = useState([
    { id: 1, name: "Variant A (Control)", element: "original" },
    { id: 2, name: "Variant B", element: "variation" }
  ]);

  const addVariant = () => {
    setVariants([
      ...variants,
      { id: variants.length + 1, name: `Variant ${String.fromCharCode(65 + variants.length)}`, element: "variation" }
    ]);
  };

  const removeVariant = (id: number) => {
    if (variants.length > 2) {
      setVariants(variants.filter(v => v.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-bg-subtle border border-border-subtle rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="sticky top-0 bg-bg-subtle/95 backdrop-blur-sm border-b border-border-subtle p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-light text-sidebar-foreground">Create A/B Test</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-bg-underlay hover:bg-bg-offset border border-border-subtle flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-text-quiet" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-sm text-text-quiet mb-2 block">Test Name</label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="e.g., Luxury Watch - Hook Variation"
              className="w-full px-4 py-3 bg-bg-underlay border border-border-subtle rounded-xl text-sidebar-foreground placeholder:text-text-quiet"
            />
          </div>

          <div>
            <label className="text-sm text-text-quiet mb-2 block">Select Ad to Test</label>
            <select className="w-full px-4 py-3 bg-bg-underlay border border-border-subtle rounded-xl text-sidebar-foreground">
              <option>Luxury Watch - Premium Edition</option>
              <option>Fashion Brand - Spring Collection</option>
              <option>Tech Product Launch - Modern</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-text-quiet mb-2 block">Test Element</label>
            <select className="w-full px-4 py-3 bg-bg-underlay border border-border-subtle rounded-xl text-sidebar-foreground">
              <option>Opening Hook (first 3 seconds)</option>
              <option>Call-to-Action</option>
              <option>Background Music</option>
              <option>Color Grading</option>
              <option>Text Overlay</option>
              <option>Duration (15s vs 30s)</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm text-text-quiet">Test Variants</label>
              <button
                onClick={addVariant}
                className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 rounded-lg text-xs text-white transition-all flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Add Variant
              </button>
            </div>
            <div className="space-y-3">
              {variants.map((variant, index) => (
                <div key={variant.id} className="flex items-center gap-3">
                  <div className="flex-1 p-4 bg-bg-underlay border border-border-subtle rounded-xl">
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        newVariants[index].name = e.target.value;
                        setVariants(newVariants);
                      }}
                      className="w-full bg-transparent text-sm text-sidebar-foreground placeholder:text-text-quiet border-none outline-none"
                      placeholder="Variant name"
                    />
                  </div>
                  {variants.length > 2 && (
                    <button
                      onClick={() => removeVariant(variant.id)}
                      className="w-10 h-10 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 flex items-center justify-center transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-text-quiet mb-2 block">Traffic Split</label>
              <select className="w-full px-4 py-3 bg-bg-underlay border border-border-subtle rounded-xl text-sidebar-foreground">
                <option>Equal (50/50)</option>
                <option>Weighted (70/30)</option>
                <option>Weighted (80/20)</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-text-quiet mb-2 block">Test Duration</label>
              <select className="w-full px-4 py-3 bg-bg-underlay border border-border-subtle rounded-xl text-sidebar-foreground">
                <option>7 days</option>
                <option>14 days</option>
                <option>30 days</option>
                <option>Until significant</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-text-quiet mb-2 block">Primary Metric</label>
            <div className="grid grid-cols-2 gap-3">
              {["Click-Through Rate", "Conversion Rate", "ROI", "Watch Time"].map((metric) => (
                <label key={metric} className="flex items-center gap-2 p-3 bg-bg-underlay border border-border-subtle rounded-lg cursor-pointer hover:border-teal-500/30 transition-all">
                  <input type="radio" name="metric" className="w-4 h-4 accent-teal-500" defaultChecked={metric === "Click-Through Rate"} />
                  <span className="text-sm text-sidebar-foreground">{metric}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500/10 via-teal-500/10 to-pink-500/10 border border-teal-500/20 rounded-xl p-4">
            <h4 className="text-sm font-medium text-sidebar-foreground mb-2">Test Configuration</h4>
            <div className="space-y-1 text-xs text-text-quiet">
              <div className="flex items-center justify-between">
                <span>Variants:</span>
                <span className="text-sidebar-foreground">{variants.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Min. Sample Size:</span>
                <span className="text-sidebar-foreground">10,000 impressions</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Confidence Level:</span>
                <span className="text-sidebar-foreground">95%</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-bg-underlay hover:bg-bg-offset border border-border-subtle rounded-xl text-sm font-medium text-text-quiet hover:text-sidebar-foreground transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl text-sm font-medium text-white transition-all"
            >
              Start Test
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

