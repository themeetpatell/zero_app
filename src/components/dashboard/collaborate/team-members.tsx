"use client";

import { Mail, MoreVertical, Shield, Crown } from "lucide-react";

export default function TeamMembers() {
  const members = [
    { id: 1, name: "Sarah Chen", email: "sarah@company.com", role: "Owner", avatar: "SC", status: "online" },
    { id: 2, name: "Marcus Johnson", email: "marcus@company.com", role: "Admin", avatar: "MJ", status: "online" },
    { id: 3, name: "Aisha Rahman", email: "aisha@company.com", role: "Editor", avatar: "AR", status: "away" },
    { id: 4, name: "David Kim", email: "david@company.com", role: "Editor", avatar: "DK", status: "offline" },
    { id: 5, name: "Elena Rodriguez", email: "elena@company.com", role: "Viewer", avatar: "ER", status: "online" },
  ];

  const getRoleIcon = (role: string) => {
    if (role === "Owner") return <Crown className="w-3 h-3 text-yellow-400" />;
    if (role === "Admin") return <Shield className="w-3 h-3 text-teal-400" />;
    return null;
  };

  const getStatusColor = (status: string) => {
    if (status === "online") return "bg-green-500";
    if (status === "away") return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
      <h2 className="text-xl font-light text-sidebar-foreground mb-6">Team Members</h2>

      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-4 bg-bg-underlay border border-border-subtle rounded-xl hover:border-teal-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-sm font-medium text-white">
                  {member.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-bg-underlay ${getStatusColor(member.status)}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-medium text-sidebar-foreground truncate">{member.name}</h3>
                  {getRoleIcon(member.role)}
                </div>
                <div className="flex items-center gap-2 text-xs text-text-quiet">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{member.email}</span>
                </div>
              </div>

              <button className="w-8 h-8 rounded-lg bg-bg-subtle hover:bg-bg-offset border border-border-subtle flex items-center justify-center transition-all">
                <MoreVertical className="w-4 h-4 text-text-quiet" />
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-border-subtle">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-quiet">Role:</span>
                <span className={`px-2 py-0.5 rounded-full ${
                  member.role === "Owner" ? "bg-yellow-500/10 text-yellow-400" :
                  member.role === "Admin" ? "bg-teal-500/10 text-teal-400" :
                  member.role === "Editor" ? "bg-blue-500/10 text-blue-400" :
                  "bg-gray-500/10 text-gray-400"
                }`}>
                  {member.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

