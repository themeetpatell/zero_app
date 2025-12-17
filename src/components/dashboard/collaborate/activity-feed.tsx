"use client";

import { MessageSquare, Upload, UserPlus, CheckCircle, Edit } from "lucide-react";

export default function ActivityFeed() {
  const activities = [
    { id: 1, type: "comment", user: "Sarah Chen", action: "commented on", target: "Luxury Watch Campaign", time: "5 min ago", icon: MessageSquare, color: "blue" },
    { id: 2, type: "upload", user: "Marcus Johnson", action: "uploaded new version of", target: "Fashion Collection Ad", time: "1 hour ago", icon: Upload, color: "green" },
    { id: 3, type: "invite", user: "Aisha Rahman", action: "invited", target: "john@company.com", time: "2 hours ago", icon: UserPlus, color: "purple" },
    { id: 4, type: "complete", user: "David Kim", action: "completed review of", target: "Tech Product Launch", time: "3 hours ago", icon: CheckCircle, color: "emerald" },
    { id: 5, type: "edit", user: "Elena Rodriguez", action: "edited", target: "Real Estate Showcase", time: "5 hours ago", icon: Edit, color: "orange" },
    { id: 6, type: "comment", user: "Marcus Johnson", action: "replied to your comment on", target: "Luxury Watch Campaign", time: "6 hours ago", icon: MessageSquare, color: "blue" },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: "from-blue-500 to-cyan-500",
      green: "from-green-500 to-emerald-500",
      purple: "from-teal-500 to-teal-600",
      emerald: "from-emerald-500 to-green-500",
      orange: "from-orange-500 to-red-500"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-sidebar-foreground">Activity Feed</h2>
        <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
          Mark All Read
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="p-4 bg-bg-underlay border border-border-subtle rounded-xl hover:border-teal-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getColorClasses(activity.color)} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-sidebar-foreground mb-1">
                    <span className="font-medium">{activity.user}</span>
                    {" "}{activity.action}{" "}
                    <span className="font-medium text-teal-400">{activity.target}</span>
                  </p>
                  <p className="text-xs text-text-quiet">{activity.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

