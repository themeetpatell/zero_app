"use client";

import { motion } from "framer-motion";
import { Play, Eye, ShoppingCart, Star, TrendingUp, Clock } from "lucide-react";

interface MarketplaceGridProps {
  ads: any[];
  onAdClick: (ad: any) => void;
}

export default function MarketplaceGrid({ ads, onAdClick }: MarketplaceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {ads.map((ad, index) => (
        <motion.div
          key={ad.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group cursor-pointer"
          onClick={() => onAdClick(ad)}
        >
          <div className="bg-bg-subtle border border-border-subtle rounded-xl overflow-hidden hover:border-teal-500/50 transition-all">
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <motion.button
                  className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="w-8 h-8 text-gray-900 ml-1" />
                </motion.button>
              </div>
              
              <div className="absolute top-3 left-3 flex gap-2">
                <div className="px-2 py-1 bg-teal-500 rounded text-xs font-medium text-white">
                  {ad.resolution}
                </div>
                <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs font-medium text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {ad.duration}s
                </div>
              </div>

              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-medium text-white">{ad.performance.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-medium text-sidebar-foreground mb-1 group-hover:text-teal-400 transition-colors">
                  {ad.title}
                </h3>
                <p className="text-xs text-text-quiet">by @{ad.creator}</p>
              </div>

              <div className="flex items-center gap-3 text-xs text-text-quiet">
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{(ad.views / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{ad.purchases}</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{ad.performance.roi}% ROI</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-subtle">
                <div>
                  <div className="text-xs text-text-quiet mb-1">CTR</div>
                  <div className="text-sm font-medium text-green-400">{ad.performance.ctr}%</div>
                </div>
                <div>
                  <div className="text-xs text-text-quiet mb-1">Conv.</div>
                  <div className="text-sm font-medium text-blue-400">{ad.performance.conversion}%</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {ad.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-bg-underlay border border-border-subtle rounded text-xs text-text-quiet"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3">
                <div className="text-center p-2 bg-bg-underlay rounded-lg">
                  <div className="text-xs text-text-quiet mb-0.5">Buy</div>
                  <div className="text-sm font-medium text-sidebar-foreground">${ad.sellPrice}</div>
                </div>
                <div className="text-center p-2 bg-bg-underlay rounded-lg">
                  <div className="text-xs text-text-quiet mb-0.5">Rent</div>
                  <div className="text-sm font-medium text-sidebar-foreground">${ad.rentPrice}</div>
                </div>
                <div className="text-center p-2 bg-bg-underlay rounded-lg">
                  <div className="text-xs text-text-quiet mb-0.5">License</div>
                  <div className="text-sm font-medium text-sidebar-foreground">${ad.licensePrice}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

