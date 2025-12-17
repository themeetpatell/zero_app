"use client";

import { motion } from "framer-motion";
import { X, Play, Download, ShoppingCart, Star, TrendingUp, Eye, Clock, DollarSign, BarChart3 } from "lucide-react";

interface AdDetailModalProps {
  ad: any;
  onClose: () => void;
}

export default function AdDetailModal({ ad, onClose }: AdDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-bg-subtle border border-border-subtle rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="sticky top-0 bg-bg-subtle/95 backdrop-blur-sm border-b border-border-subtle p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-light text-sidebar-foreground">{ad.title}</h2>
            <p className="text-sm text-text-quiet">by @{ad.creator}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-bg-underlay hover:bg-bg-offset border border-border-subtle flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-text-quiet" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden relative group">
                <button className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-gray-900 ml-1" />
                  </div>
                </button>
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="px-3 py-1.5 bg-teal-500 rounded-lg text-sm font-medium text-white">
                    {ad.resolution}
                  </div>
                  <div className="px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg text-sm font-medium text-white flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {ad.duration}s
                  </div>
                </div>
              </div>

              <div className="bg-bg-underlay border border-border-subtle rounded-xl p-6">
                <h3 className="text-lg font-light text-sidebar-foreground mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-quiet">Click-Through Rate</span>
                      <span className="text-xl font-light text-green-400">{ad.performance.ctr}%</span>
                    </div>
                    <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        style={{ width: `${(ad.performance.ctr / 10) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-quiet mt-2">Industry avg: 2.1%</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-quiet">Conversion Rate</span>
                      <span className="text-xl font-light text-blue-400">{ad.performance.conversion}%</span>
                    </div>
                    <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        style={{ width: `${(ad.performance.conversion / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-quiet mt-2">Industry avg: 1.2%</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-quiet">Return on Investment</span>
                      <span className="text-xl font-light text-teal-400">{ad.performance.roi}%</span>
                    </div>
                    <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-pink-500"
                        style={{ width: `${Math.min((ad.performance.roi / 500) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-quiet mt-2">Industry avg: 150%</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-quiet">Audience Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xl font-light text-sidebar-foreground">{ad.performance.rating}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                        style={{ width: `${(ad.performance.rating / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-quiet mt-2">Based on {ad.purchases} buyers</p>
                  </div>
                </div>
              </div>

              <div className="bg-bg-underlay border border-border-subtle rounded-xl p-6">
                <h3 className="text-lg font-light text-sidebar-foreground mb-4">Detailed Analytics</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <Eye className="w-5 h-5 text-text-quiet mx-auto mb-2" />
                    <div className="text-lg font-medium text-sidebar-foreground">{(ad.views / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-text-quiet">Views</div>
                  </div>
                  <div className="text-center">
                    <ShoppingCart className="w-5 h-5 text-text-quiet mx-auto mb-2" />
                    <div className="text-lg font-medium text-sidebar-foreground">{ad.purchases}</div>
                    <div className="text-xs text-text-quiet">Purchases</div>
                  </div>
                  <div className="text-center">
                    <Download className="w-5 h-5 text-text-quiet mx-auto mb-2" />
                    <div className="text-lg font-medium text-sidebar-foreground">{ad.downloads}</div>
                    <div className="text-xs text-text-quiet">Downloads</div>
                  </div>
                  <div className="text-center">
                    <DollarSign className="w-5 h-5 text-text-quiet mx-auto mb-2" />
                    <div className="text-lg font-medium text-sidebar-foreground">${(ad.revenue / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-text-quiet">Revenue</div>
                  </div>
                </div>
              </div>

              <div className="bg-bg-underlay border border-border-subtle rounded-xl p-6">
                <h3 className="text-lg font-light text-sidebar-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {ad.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-bg-subtle border border-border-subtle rounded-lg text-sm text-text-quiet hover:border-teal-500/30 hover:text-teal-400 transition-all cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-bg-underlay border border-border-subtle rounded-xl p-6">
                <h3 className="text-lg font-light text-sidebar-foreground mb-4">Purchase Options</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl text-left transition-all group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">Buy (Full Ownership)</span>
                      <ShoppingCart className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-2xl font-light text-white mb-1">${ad.sellPrice}</div>
                    <div className="text-xs text-white/70">One-time payment, unlimited use</div>
                  </button>

                  <button className="w-full p-4 bg-bg-subtle hover:bg-bg-offset border-2 border-border-subtle hover:border-teal-500/30 rounded-xl text-left transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-sidebar-foreground">Rent (30 Days)</span>
                      <Clock className="w-4 h-4 text-text-quiet" />
                    </div>
                    <div className="text-2xl font-light text-sidebar-foreground mb-1">${ad.rentPrice}</div>
                    <div className="text-xs text-text-quiet">30-day access, renewable</div>
                  </button>

                  <button className="w-full p-4 bg-bg-subtle hover:bg-bg-offset border-2 border-border-subtle hover:border-teal-500/30 rounded-xl text-left transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-sidebar-foreground">License (Commercial)</span>
                      <BarChart3 className="w-4 h-4 text-text-quiet" />
                    </div>
                    <div className="text-2xl font-light text-sidebar-foreground mb-1">${ad.licensePrice}</div>
                    <div className="text-xs text-text-quiet">Commercial use license</div>
                  </button>
                </div>
              </div>

              <div className="bg-bg-underlay border border-border-subtle rounded-xl p-6">
                <h3 className="text-lg font-light text-sidebar-foreground mb-4">Creator Info</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600" />
                  <div>
                    <div className="font-medium text-sidebar-foreground">@{ad.creator}</div>
                    <div className="text-xs text-text-quiet">Verified Creator</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-bg-subtle rounded-lg">
                    <div className="text-lg font-medium text-sidebar-foreground">24</div>
                    <div className="text-xs text-text-quiet">Ads Sold</div>
                  </div>
                  <div className="p-3 bg-bg-subtle rounded-lg">
                    <div className="text-lg font-medium text-sidebar-foreground">4.9</div>
                    <div className="text-xs text-text-quiet">Avg Rating</div>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-bg-subtle hover:bg-bg-offset border border-border-subtle rounded-lg text-sm text-sidebar-foreground transition-all">
                  View Profile
                </button>
              </div>

              <div className="bg-gradient-to-br from-teal-500/10 via-teal-500/10 to-pink-500/10 border border-teal-500/20 rounded-xl p-6">
                <h3 className="text-sm font-medium text-sidebar-foreground mb-3">Instant Brand Customization</h3>
                <p className="text-xs text-text-quiet mb-4">
                  Add your logo, brand colors, and custom CTA in seconds after purchase
                </p>
                <div className="flex items-center gap-2 text-xs text-teal-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>Powered by Zero Human AI</span>
                </div>
              </div>

              <div className="bg-bg-underlay border border-border-subtle rounded-xl p-6">
                <h3 className="text-sm font-medium text-sidebar-foreground mb-3">What You Get</h3>
                <ul className="space-y-2 text-xs text-text-quiet">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                    <span>4K resolution video file (MP4)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                    <span>Editable project file</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                    <span>Multiple aspect ratios (16:9, 9:16, 1:1)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                    <span>Performance analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                    <span>Brand customization tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

