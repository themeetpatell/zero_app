"use client";

import { Video, Users, MessageSquare, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function SharedProjects() {
  const projects = [
    { id: 1, title: "Luxury Watch Campaign", members: 5, comments: 12, updated: "2 hours ago", progress: 75 },
    { id: 2, title: "Fashion Spring Collection", members: 3, comments: 8, updated: "4 hours ago", progress: 60 },
    { id: 3, title: "Tech Product Launch", members: 4, comments: 15, updated: "1 day ago", progress: 90 },
    { id: 4, title: "Real Estate Showcase", members: 2, comments: 5, updated: "2 days ago", progress: 40 },
  ];

  return (
    <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-sidebar-foreground">Shared Projects</h2>
        <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 bg-bg-underlay border border-border-subtle rounded-xl hover:border-teal-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-sidebar-foreground mb-1 truncate">{project.title}</h3>
                <div className="flex items-center gap-2 text-xs text-text-quiet">
                  <Clock className="w-3 h-3" />
                  <span>Updated {project.updated}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1 text-xs text-text-quiet">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-bg-subtle rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-600"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-text-quiet">
                  <Users className="w-3.5 h-3.5" />
                  <span>{project.members} members</span>
                </div>
                <div className="flex items-center gap-1 text-text-quiet">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{project.comments} comments</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

