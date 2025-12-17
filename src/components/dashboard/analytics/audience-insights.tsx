"use client";

import { Users, Globe, Clock } from "lucide-react";

export default function AudienceInsights() {
  const demographics = [
    { age: "18-24", percentage: 15 },
    { age: "25-34", percentage: 35 },
    { age: "35-44", percentage: 28 },
    { age: "45-54", percentage: 15 },
    { age: "55+", percentage: 7 },
  ];

  const locations = [
    { country: "United States", percentage: 35, flag: "🇺🇸" },
    { country: "United Arab Emirates", percentage: 22, flag: "🇦🇪" },
    { country: "Saudi Arabia", percentage: 18, flag: "🇸🇦" },
    { country: "United Kingdom", percentage: 12, flag: "🇬🇧" },
    { country: "Germany", percentage: 8, flag: "🇩🇪" },
  ];

  const peakHours = [
    { hour: "9 AM", activity: 45 },
    { hour: "12 PM", activity: 65 },
    { hour: "3 PM", activity: 82 },
    { hour: "6 PM", activity: 95 },
    { hour: "9 PM", activity: 78 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-light text-sidebar-foreground">Age Demographics</h3>
        </div>
        <div className="space-y-3">
          {demographics.map((demo) => (
            <div key={demo.age}>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span className="text-text-quiet">{demo.age}</span>
                <span className="text-sidebar-foreground font-medium">{demo.percentage}%</span>
              </div>
              <div className="h-2 bg-bg-underlay rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${demo.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-teal-500" />
          <h3 className="text-lg font-light text-sidebar-foreground">Top Locations</h3>
        </div>
        <div className="space-y-3">
          {locations.map((location) => (
            <div key={location.country} className="flex items-center gap-3">
              <span className="text-2xl">{location.flag}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-sidebar-foreground">{location.country}</span>
                  <span className="text-sm text-text-quiet font-medium">{location.percentage}%</span>
                </div>
                <div className="h-1.5 bg-bg-underlay rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-pink-500"
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-light text-sidebar-foreground">Peak Activity Hours</h3>
        </div>
        <div className="space-y-3">
          {peakHours.map((hour) => (
            <div key={hour.hour}>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span className="text-text-quiet">{hour.hour}</span>
                <span className="text-sidebar-foreground font-medium">{hour.activity}%</span>
              </div>
              <div className="h-2 bg-bg-underlay rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${hour.activity}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

