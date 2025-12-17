"use client";

import { Check } from "lucide-react";

interface MarketplaceFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  "All",
  "Luxury Goods",
  "Technology",
  "Fashion",
  "Real Estate",
  "Food & Beverage",
  "Automotive",
  "Health & Wellness",
  "Travel",
  "Finance",
  "E-commerce"
];

export default function MarketplaceFilters({
  selectedCategory,
  onCategoryChange,
}: MarketplaceFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
        <h3 className="font-medium text-sidebar-foreground mb-4 text-sm">Categories</h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category.toLowerCase())}
              className={`w-full px-4 py-2.5 rounded-lg text-sm text-left transition-all flex items-center justify-between ${
                selectedCategory === category.toLowerCase()
                  ? "bg-teal-500 text-white"
                  : "hover:bg-bg-offset text-text-quiet hover:text-sidebar-foreground"
              }`}
            >
              {category}
              {selectedCategory === category.toLowerCase() && (
                <Check className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
        <h3 className="font-medium text-sidebar-foreground mb-4 text-sm">Performance</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 accent-teal-500 rounded" />
            <span className="text-sm text-text-quiet group-hover:text-sidebar-foreground">High CTR (&gt;5%)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 accent-teal-500 rounded" />
            <span className="text-sm text-text-quiet group-hover:text-sidebar-foreground">High Conversion (&gt;3%)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 accent-teal-500 rounded" />
            <span className="text-sm text-text-quiet group-hover:text-sidebar-foreground">ROI &gt;300%</span>
          </label>
        </div>
      </div>

      <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
        <h3 className="font-medium text-sidebar-foreground mb-4 text-sm">Resolution</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 accent-teal-500 rounded" defaultChecked />
            <span className="text-sm text-text-quiet group-hover:text-sidebar-foreground">4K</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 accent-teal-500 rounded" />
            <span className="text-sm text-text-quiet group-hover:text-sidebar-foreground">1080p</span>
          </label>
        </div>
      </div>
    </div>
  );
}
