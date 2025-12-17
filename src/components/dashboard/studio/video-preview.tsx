"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Play, Download, Share2, TrendingUp, DollarSign, Eye, MousePointerClick, 
  BarChart3, Sparkles, Edit, RotateCcw, ShoppingCart, RefreshCw
} from "lucide-react";

interface VideoPreviewProps {
  video: any;
  onPublishToMarketplace: () => void;
  onRegenerate: () => void;
  onNewVideo: () => void;
}

export default function VideoPreview({ video, onPublishToMarketplace, onRegenerate, onNewVideo }: VideoPreviewProps) {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [pricing, setPricing] = useState({
    sell: 499,
    rent: 99,
    license: 299
  });

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-sidebar-foreground mb-2">Your Video is Ready</h1>
            <p className="text-text-quiet">Review, edit, or publish to marketplace</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onRegenerate}
              className="px-4 py-2 bg-bg-subtle hover:bg-bg-offset border border-border-subtle rounded-lg text-sm text-text-quiet hover:text-sidebar-foreground transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Regenerate
            </button>
            <button
              onClick={onNewVideo}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-sm text-white transition-all"
            >
              New Video
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-bg-subtle border border-border-subtle rounded-2xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative group">
                <button className="w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all group-hover:scale-110">
                  <Play className="w-10 h-10 text-gray-900 ml-1" />
                </button>
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                  4K • {video.duration}s
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl text-sm font-medium text-white transition-all flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="flex-1 px-4 py-3 bg-bg-offset hover:bg-bg-subtle border border-border-subtle rounded-xl text-sm font-medium text-sidebar-foreground transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button 
                    onClick={() => setShowPublishModal(true)}
                    className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 rounded-xl text-sm font-medium text-white transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Publish to Marketplace
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="p-3 bg-bg-underlay rounded-lg text-center">
                    <div className="text-xs text-text-quiet mb-1">Resolution</div>
                    <div className="text-sm font-medium text-sidebar-foreground">{video.resolution}</div>
                  </div>
                  <div className="p-3 bg-bg-underlay rounded-lg text-center">
                    <div className="text-xs text-text-quiet mb-1">Duration</div>
                    <div className="text-sm font-medium text-sidebar-foreground">{video.duration}s</div>
                  </div>
                  <div className="p-3 bg-bg-underlay rounded-lg text-center">
                    <div className="text-xs text-text-quiet mb-1">File Size</div>
                    <div className="text-sm font-medium text-sidebar-foreground">{video.fileSize}</div>
                  </div>
                  <div className="p-3 bg-bg-underlay rounded-lg text-center">
                    <div className="text-xs text-text-quiet mb-1">Format</div>
                    <div className="text-sm font-medium text-sidebar-foreground">MP4</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-subtle border border-border-subtle rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Edit className="w-5 h-5 text-teal-500" />
                <h2 className="text-xl font-light text-sidebar-foreground">Quick Edits</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-bg-underlay hover:bg-bg-offset border border-border-subtle rounded-xl text-left transition-all">
                  <div className="text-sm font-medium text-sidebar-foreground mb-1">Change Music</div>
                  <div className="text-xs text-text-quiet">Swap soundtrack</div>
                </button>
                <button className="p-4 bg-bg-underlay hover:bg-bg-offset border border-border-subtle rounded-xl text-left transition-all">
                  <div className="text-sm font-medium text-sidebar-foreground mb-1">Adjust Colors</div>
                  <div className="text-xs text-text-quiet">Color grading</div>
                </button>
                <button className="p-4 bg-bg-underlay hover:bg-bg-offset border border-border-subtle rounded-xl text-left transition-all">
                  <div className="text-sm font-medium text-sidebar-foreground mb-1">Add Text</div>
                  <div className="text-xs text-text-quiet">Overlay captions</div>
                </button>
                <button className="p-4 bg-bg-underlay hover:bg-bg-offset border border-border-subtle rounded-xl text-left transition-all">
                  <div className="text-sm font-medium text-sidebar-foreground mb-1">Trim Duration</div>
                  <div className="text-xs text-text-quiet">Cut timeline</div>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-teal-500/10 via-teal-500/10 to-pink-500/10 border border-teal-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <h2 className="text-lg font-light text-sidebar-foreground">Performance Predictions</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MousePointerClick className="w-4 h-4 text-text-quiet" />
                      <span className="text-sm text-text-quiet">Predicted CTR</span>
                    </div>
                    <span className="text-lg font-medium text-green-400">{video.performance.predictedCTR}%</span>
                  </div>
                  <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: `${(video.performance.predictedCTR / 10) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-text-quiet" />
                      <span className="text-sm text-text-quiet">Conversion Rate</span>
                    </div>
                    <span className="text-lg font-medium text-blue-400">{video.performance.predictedConversion}%</span>
                  </div>
                  <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      style={{ width: `${(video.performance.predictedConversion / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-text-quiet" />
                      <span className="text-sm text-text-quiet">Estimated ROI</span>
                    </div>
                    <span className="text-lg font-medium text-teal-400">{video.performance.estimatedROI}%</span>
                  </div>
                  <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-pink-500"
                      style={{ width: `${Math.min((video.performance.estimatedROI / 500) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-text-quiet" />
                      <span className="text-sm text-text-quiet">Audience Score</span>
                    </div>
                    <span className="text-2xl font-light text-sidebar-foreground">{video.performance.audienceScore}/100</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-subtle border border-border-subtle rounded-2xl p-6">
              <h3 className="text-lg font-light text-sidebar-foreground mb-4">AI Insights</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                  <p className="text-text-quiet">Strong opening hook (0-3s retention: 94%)</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                  <p className="text-text-quiet">Excellent visual pacing for luxury segment</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2" />
                  <p className="text-text-quiet">Consider adding CTA at 23s for optimal conversion</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                  <p className="text-text-quiet">Color palette aligns perfectly with brand identity</p>
                </div>
              </div>
            </div>

            <div className="bg-bg-subtle border border-border-subtle rounded-2xl p-6">
              <h3 className="text-lg font-light text-sidebar-foreground mb-4">Create Variations</h3>
              <div className="space-y-2">
                <button className="w-full p-3 bg-bg-underlay hover:bg-bg-offset border border-border-subtle rounded-lg text-sm text-sidebar-foreground transition-all flex items-center justify-between">
                  <span>Generate 15s version</span>
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="w-full p-3 bg-bg-underlay hover:bg-bg-offset border border-border-subtle rounded-lg text-sm text-sidebar-foreground transition-all flex items-center justify-between">
                  <span>Create vertical (9:16)</span>
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="w-full p-3 bg-bg-underlay hover:bg-bg-offset border border-border-subtle rounded-lg text-sm text-sidebar-foreground transition-all flex items-center justify-between">
                  <span>Generate square (1:1)</span>
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-bg-subtle border border-border-subtle rounded-2xl p-8 max-w-2xl w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-2xl font-light text-sidebar-foreground mb-6">Publish to Marketplace</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm text-text-quiet mb-2 block">Sell Price (one-time purchase)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-quiet">$</span>
                  <input
                    type="number"
                    value={pricing.sell}
                    onChange={(e) => setPricing({...pricing, sell: parseInt(e.target.value)})}
                    className="w-full pl-8 pr-4 py-3 bg-bg-underlay border border-border-subtle rounded-xl text-sidebar-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-text-quiet mb-2 block">Rent Price (30-day access)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-quiet">$</span>
                  <input
                    type="number"
                    value={pricing.rent}
                    onChange={(e) => setPricing({...pricing, rent: parseInt(e.target.value)})}
                    className="w-full pl-8 pr-4 py-3 bg-bg-underlay border border-border-subtle rounded-xl text-sidebar-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-text-quiet mb-2 block">License Price (commercial use)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-quiet">$</span>
                  <input
                    type="number"
                    value={pricing.license}
                    onChange={(e) => setPricing({...pricing, license: parseInt(e.target.value)})}
                    className="w-full pl-8 pr-4 py-3 bg-bg-underlay border border-border-subtle rounded-xl text-sidebar-foreground"
                  />
                </div>
              </div>

              <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                <p className="text-sm text-text-quiet mb-3">Platform Fee: 15%</p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-text-quiet">You earn (sell):</span>
                    <div className="text-sidebar-foreground font-medium mt-1">${(pricing.sell * 0.85).toFixed(0)}</div>
                  </div>
                  <div>
                    <span className="text-text-quiet">You earn (rent):</span>
                    <div className="text-sidebar-foreground font-medium mt-1">${(pricing.rent * 0.85).toFixed(0)}</div>
                  </div>
                  <div>
                    <span className="text-text-quiet">You earn (license):</span>
                    <div className="text-sidebar-foreground font-medium mt-1">${(pricing.license * 0.85).toFixed(0)}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="flex-1 px-6 py-3 bg-bg-underlay hover:bg-bg-offset border border-border-subtle rounded-xl text-sm font-medium text-text-quiet hover:text-sidebar-foreground transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onPublishToMarketplace();
                    setShowPublishModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl text-sm font-medium text-white transition-all"
                >
                  Publish Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

