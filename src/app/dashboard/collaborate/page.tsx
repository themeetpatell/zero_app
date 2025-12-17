"use client";

import { useState } from "react";
import { Users, Plus, Video, MessageSquare, CheckCircle } from "lucide-react";
import TeamMembers from "@/components/dashboard/collaborate/team-members";
import SharedProjects from "@/components/dashboard/collaborate/shared-projects";
import ActivityFeed from "@/components/dashboard/collaborate/activity-feed";
import InviteModal from "@/components/dashboard/collaborate/invite-modal";

export default function CollaboratePage() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto bg-bg-underlay">
      <div className="max-w-[1800px] mx-auto p-8 space-y-6">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light text-sidebar-foreground mb-2">Team</h1>
            <p className="text-text-quiet">Work together on video ads in real-time</p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-xl text-sm font-medium text-white transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Invite Member
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">12</div>
            <div className="text-sm text-text-quiet">Team Members</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">24</div>
            <div className="text-sm text-text-quiet">Shared Projects</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">156</div>
            <div className="text-sm text-text-quiet">Comments</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">89</div>
            <div className="text-sm text-text-quiet">Reviews Completed</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SharedProjects />
            <ActivityFeed />
          </div>
          <div>
            <TeamMembers />
          </div>
        </div>
      </div>

      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} />
      )}
    </div>
  );
}
