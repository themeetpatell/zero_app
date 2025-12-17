"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, MapPin, Calendar, Edit, Camera, Save, 
  Trophy, Video, DollarSign, TrendingUp, Star, Crown,
  Settings, Bell, Shield, CreditCard, LogOut
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"overview" | "settings">("overview");
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: session?.user?.name || "Creative Studio",
    email: session?.user?.email || "studio@zerohuman.ai",
    avatar: session?.user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=studio",
    bio: "Professional AI ad creator | 4K specialist | Top 5% creator",
    location: "Dubai, UAE",
    joinedDate: "Jan 2024",
    level: "Pro Creator",
    stats: {
      adsCreated: 45,
      totalRevenue: 67800,
      followers: 1243,
      avgRating: 4.9,
      totalViews: 284000,
      totalDownloads: 12400,
    },
    achievements: [
      { name: "First Video", unlocked: true },
      { name: "High Performer", unlocked: true },
      { name: "Top Creator", unlocked: true },
      { name: "Marketplace Pro", unlocked: false },
    ],
  };

  return (
    <div className="flex-1 overflow-y-auto bg-bg-underlay">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 border border-teal-500/20 rounded-2xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-teal-500 to-teal-600" />
          
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-6 -mt-16">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-bg-subtle border-4 border-bg-underlay overflow-hidden">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-teal-500 hover:bg-teal-600 flex items-center justify-center transition-all shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="flex-1 pt-16 md:pt-2">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h1 className="text-2xl font-light text-sidebar-foreground">{user.name}</h1>
                      <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-teal-500/10 text-teal-400 text-xs font-medium">
                        <Crown className="w-3.5 h-3.5" />
                        {user.level}
                      </div>
                    </div>
                    <p className="text-text-quiet mb-2">{user.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-text-quiet">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Joined {user.joinedDate}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 rounded-lg bg-bg-subtle hover:bg-bg-offset border border-border-subtle hover:border-teal-500/50 text-sm text-sidebar-foreground transition-all flex items-center gap-2"
                  >
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-bg-subtle/50 backdrop-blur-sm border border-border-subtle rounded-xl p-4 text-center">
                    <div className="text-2xl font-light text-sidebar-foreground mb-1">
                      {user.stats.followers.toLocaleString()}
                    </div>
                    <div className="text-xs text-text-quiet">Followers</div>
                  </div>
                  <div className="bg-bg-subtle/50 backdrop-blur-sm border border-border-subtle rounded-xl p-4 text-center">
                    <div className="text-2xl font-light text-sidebar-foreground mb-1">
                      {user.stats.adsCreated}
                    </div>
                    <div className="text-xs text-text-quiet">Ads Created</div>
                  </div>
                  <div className="bg-bg-subtle/50 backdrop-blur-sm border border-border-subtle rounded-xl p-4 text-center">
                    <div className="text-2xl font-light text-teal-400 mb-1">
                      ${(user.stats.totalRevenue / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-text-quiet">Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-border-subtle">
          {(["overview", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition-all relative ${
                activeTab === tab
                  ? "text-teal-500"
                  : "text-text-quiet hover:text-sidebar-foreground"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-teal-400" />
                  <h2 className="text-lg font-light text-sidebar-foreground">Performance Stats</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-text-quiet" />
                      <span className="text-sm text-text-quiet">Total Views</span>
                    </div>
                    <span className="text-base font-medium text-sidebar-foreground">
                      {(user.stats.totalViews / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-text-quiet" />
                      <span className="text-sm text-text-quiet">Downloads</span>
                    </div>
                    <span className="text-base font-medium text-sidebar-foreground">
                      {(user.stats.totalDownloads / 1000).toFixed(1)}K
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-text-quiet" />
                      <span className="text-sm text-text-quiet">Avg. Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-base font-medium text-sidebar-foreground">
                        {user.stats.avgRating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-text-quiet" />
                      <span className="text-sm text-text-quiet">Total Earnings</span>
                    </div>
                    <span className="text-base font-medium text-teal-400">
                      ${(user.stats.totalRevenue / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-teal-400" />
                  <h2 className="text-lg font-light text-sidebar-foreground">Achievements</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {user.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl text-center ${
                        achievement.unlocked
                          ? "bg-teal-500/10 border border-teal-500/20"
                          : "bg-bg-offset border border-border-subtle opacity-50"
                      }`}
                    >
                      <Trophy className={`w-6 h-6 mx-auto mb-2 ${
                        achievement.unlocked ? "text-teal-400" : "text-text-quiet"
                      }`} />
                      <div className="text-xs text-sidebar-foreground font-medium">
                        {achievement.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
                <h2 className="text-lg font-light text-sidebar-foreground mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {[
                    { action: "Published ad to marketplace", time: "2 hours ago" },
                    { action: "Completed A/B test", time: "5 hours ago" },
                    { action: "Created luxury watch ad", time: "1 day ago" },
                    { action: "Earned $499 from sale", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-bg-underlay rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-teal-500 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm text-sidebar-foreground">{activity.action}</p>
                        <p className="text-xs text-text-quiet mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-3xl space-y-4">
            <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
              <h2 className="text-lg font-light text-sidebar-foreground mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-teal-400" />
                Account Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-text-quiet mb-2 block">Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-2.5 bg-bg-underlay border border-border-subtle rounded-lg text-sidebar-foreground focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-quiet mb-2 block">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-2.5 bg-bg-underlay border border-border-subtle rounded-lg text-sidebar-foreground focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-quiet mb-2 block">Bio</label>
                  <textarea
                    defaultValue={user.bio}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-bg-underlay border border-border-subtle rounded-lg text-sidebar-foreground focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-quiet mb-2 block">Location</label>
                  <input
                    type="text"
                    defaultValue={user.location}
                    className="w-full px-4 py-2.5 bg-bg-underlay border border-border-subtle rounded-lg text-sidebar-foreground focus:border-teal-500/50 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
              <h2 className="text-lg font-light text-sidebar-foreground mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-teal-400" />
                Notifications
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Email notifications", desc: "Receive updates via email" },
                  { label: "New followers", desc: "When someone follows you" },
                  { label: "Sales alerts", desc: "When someone buys your ad" },
                  { label: "Performance updates", desc: "Weekly performance reports" },
                ].map((setting, index) => (
                  <label key={index} className="flex items-center justify-between p-3 bg-bg-underlay rounded-lg cursor-pointer hover:bg-bg-offset transition-all">
                    <div>
                      <div className="text-sm text-sidebar-foreground font-medium">{setting.label}</div>
                      <div className="text-xs text-text-quiet">{setting.desc}</div>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={index < 2}
                      className="w-5 h-5 accent-teal-500 rounded"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
              <h2 className="text-lg font-light text-sidebar-foreground mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-teal-400" />
                Payment Methods
              </h2>
              <div className="space-y-3">
                <div className="p-4 bg-bg-underlay border border-teal-500/30 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-sidebar-foreground">Stripe</div>
                        <div className="text-xs text-text-quiet">•••• 4242</div>
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-medium">
                      Active
                    </div>
                  </div>
                </div>
                <button className="w-full px-4 py-2.5 rounded-lg bg-bg-offset hover:bg-bg-subtle border border-border-subtle hover:border-teal-500/50 text-sm text-sidebar-foreground transition-all">
                  Add Payment Method
                </button>
              </div>
            </div>

            <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
              <h2 className="text-lg font-light text-sidebar-foreground mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-400" />
                Privacy & Security
              </h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-2.5 rounded-lg bg-bg-underlay hover:bg-bg-offset text-sm text-sidebar-foreground transition-all text-left">
                  Change Password
                </button>
                <button className="w-full px-4 py-2.5 rounded-lg bg-bg-underlay hover:bg-bg-offset text-sm text-sidebar-foreground transition-all text-left">
                  Two-Factor Authentication
                </button>
                <button className="w-full px-4 py-2.5 rounded-lg bg-bg-underlay hover:bg-bg-offset text-sm text-sidebar-foreground transition-all text-left">
                  Connected Accounts
                </button>
              </div>
            </div>

            <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
              <h2 className="text-lg font-light text-sidebar-foreground mb-4">Danger Zone</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-sm text-red-400 transition-all text-left flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
                <button className="w-full px-4 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-sm text-red-400 transition-all text-left">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const BarChart3 = TrendingUp;
const Download = Video;

