"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, PlayCircle, Users, TrendingUp, Clock, Star, 
  BookOpen, Zap, Trophy, CheckCircle, Lock, DollarSign 
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  level: "beginner" | "intermediate" | "advanced";
  isLocked: boolean;
}

interface Creator {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  ads: number;
  revenue: number;
  isFollowing: boolean;
}

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<"courses" | "creators" | "achievements">("courses");
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const courses: Course[] = [
    {
      id: "1",
      title: "Voice Studio Mastery",
      description: "Learn to create professional 4K ads using only your voice in 60 seconds",
      thumbnail: "https://images.unsplash.com/photo-1�478737270239-2f02b77fc618?w=600",
      instructor: "Sarah Chen",
      duration: "2h 30m",
      lessons: 12,
      students: 1247,
      rating: 4.9,
      level: "beginner",
      isLocked: false,
    },
    {
      id: "2",
      title: "AI Co-Director Advanced",
      description: "Master AI recommendations to maximize CTR and conversion rates",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      instructor: "Marcus Johnson",
      duration: "3h 15m",
      lessons: 18,
      students: 892,
      rating: 4.8,
      level: "intermediate",
      isLocked: false,
    },
    {
      id: "3",
      title: "Marketplace Pro",
      description: "Turn your AI ads into passive income - selling, pricing, and marketing strategies",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
      instructor: "Elena Rodriguez",
      duration: "4h 0m",
      lessons: 24,
      students: 2341,
      rating: 4.9,
      level: "advanced",
      isLocked: true,
    },
    {
      id: "4",
      title: "A/B Testing Essentials",
      description: "Data-driven optimization to improve ROI by 300%+",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
      instructor: "David Kim",
      duration: "2h 45m",
      lessons: 15,
      students: 743,
      rating: 4.7,
      level: "intermediate",
      isLocked: false,
    },
  ];

  const topCreators: Creator[] = [
    { id: "1", name: "Sophia Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia", followers: 12400, ads: 45, revenue: 67800, isFollowing: false },
    { id: "2", name: "Marcus Studios", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus", followers: 8920, ads: 32, revenue: 45200, isFollowing: true },
    { id: "3", name: "Aisha Creative", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha", followers: 15600, ads: 67, revenue: 89300, isFollowing: false },
    { id: "4", name: "David Visuals", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david", followers: 6780, ads: 28, revenue: 34500, isFollowing: false },
  ];

  const toggleFollow = (id: string) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-bg-underlay">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light text-sidebar-foreground mb-2">Learn</h1>
            <p className="text-text-quiet">Become an expert creator and grow your earnings</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-sm text-teal-400 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Level 2 Creator
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-border-subtle">
          {(["courses", "creators", "achievements"] as const).map((tab) => (
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

        {activeTab === "courses" && (
          <div className="grid md:grid-cols-2 gap-4">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-bg-subtle border border-border-subtle rounded-xl overflow-hidden hover:border-teal-500/50 transition-all"
              >
                <div className="relative aspect-video bg-bg-underlay overflow-hidden group">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.isLocked ? (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="w-8 h-8 text-white mx-auto mb-2" />
                        <p className="text-sm text-white">Pro Plan Required</p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 hover:bg-teal-600"
                      >
                        <PlayCircle className="h-7 w-7 text-white" />
                      </motion.button>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      course.level === "beginner" ? "bg-green-500/90 text-white" :
                      course.level === "intermediate" ? "bg-yellow-500/90 text-white" :
                      "bg-red-500/90 text-white"
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-base font-medium text-sidebar-foreground mb-1">{course.title}</h3>
                    <p className="text-sm text-text-quiet line-clamp-2">{course.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-text-quiet">
                    <span>by {course.instructor}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
                    <div className="flex items-center gap-4 text-xs text-text-quiet">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {course.lessons} lessons
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {(course.students / 1000).toFixed(1)}K
                      </div>
                    </div>
                  </div>

                  <button
                    disabled={course.isLocked}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      course.isLocked
                        ? "bg-bg-offset text-text-quiet cursor-not-allowed"
                        : "bg-teal-500 hover:bg-teal-600 text-white"
                    }`}
                  >
                    {course.isLocked ? "Unlock with Pro" : "Start Learning"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "creators" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCreators.map((creator, index) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 overflow-hidden">
                    <img src={creator.avatar} alt={creator.name} className="w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-sidebar-foreground mb-1">{creator.name}</h3>
                    <p className="text-sm text-text-quiet">{(creator.followers / 1000).toFixed(1)}K followers</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-bg-underlay rounded-lg p-3 text-center">
                    <div className="text-lg font-medium text-sidebar-foreground mb-1">{creator.ads}</div>
                    <div className="text-xs text-text-quiet">Ads Sold</div>
                  </div>
                  <div className="bg-bg-underlay rounded-lg p-3 text-center">
                    <div className="text-lg font-medium text-teal-400 mb-1">${(creator.revenue / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-text-quiet">Revenue</div>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollow(creator.id)}
                  className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    following.has(creator.id) || creator.isFollowing
                      ? "bg-bg-offset border border-border-subtle text-text-quiet hover:text-sidebar-foreground"
                      : "bg-teal-500 hover:bg-teal-600 text-white"
                  }`}
                >
                  {following.has(creator.id) || creator.isFollowing ? "Following" : "Follow"}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 border border-teal-500/20 rounded-xl p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-teal-400" />
              </div>
              <h2 className="text-2xl font-light text-sidebar-foreground mb-2">Level 2 Creator</h2>
              <p className="text-text-quiet mb-6">Keep creating to unlock more achievements</p>
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-text-quiet">Progress to Level 3</span>
                  <span className="text-sidebar-foreground font-medium">65%</span>
                </div>
                <div className="h-2 bg-bg-subtle rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-teal-600" style={{ width: "65%" }} />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Zap, title: "First Video", desc: "Created your first AI ad", unlocked: true },
                { icon: TrendingUp, title: "High Performer", desc: "Ad reached 5% CTR", unlocked: true },
                { icon: Users, title: "Community Star", desc: "100 followers", unlocked: true },
                { icon: DollarSign, title: "First Sale", desc: "Sold your first ad", unlocked: false },
                { icon: BookOpen, title: "Knowledge Seeker", desc: "Completed 3 courses", unlocked: false },
                { icon: Trophy, title: "Top Creator", desc: "Reached top 1%", unlocked: false },
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-bg-subtle border rounded-xl p-6 text-center ${
                    achievement.unlocked
                      ? "border-teal-500/30"
                      : "border-border-subtle opacity-60"
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    achievement.unlocked
                      ? "bg-teal-500/20"
                      : "bg-bg-offset"
                  }`}>
                    <achievement.icon className={`w-8 h-8 ${
                      achievement.unlocked ? "text-teal-400" : "text-text-quiet"
                    }`} />
                  </div>
                  <h3 className="font-medium text-sidebar-foreground mb-1">{achievement.title}</h3>
                  <p className="text-sm text-text-quiet">{achievement.desc}</p>
                  {achievement.unlocked && (
                    <div className="mt-3 flex items-center justify-center gap-1 text-xs text-teal-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Unlocked
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

