"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Mail, Copy, Check } from "lucide-react";

interface InviteModalProps {
  onClose: () => void;
}

export default function InviteModal({ onClose }: InviteModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");
  const [copied, setCopied] = useState(false);

  const inviteLink = "https://zerohuman.ai/invite/abc123xyz";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-bg-subtle border border-border-subtle rounded-2xl max-w-md w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="p-6 border-b border-border-subtle flex items-center justify-between">
          <h2 className="text-2xl font-light text-sidebar-foreground">Invite Team Member</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-bg-underlay hover:bg-bg-offset border border-border-subtle flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-text-quiet" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="text-sm text-text-quiet mb-2 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-quiet" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="w-full pl-11 pr-4 py-3 bg-bg-underlay border border-border-subtle rounded-xl text-sidebar-foreground placeholder:text-text-quiet"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-text-quiet mb-2 block">Role & Permissions</label>
            <div className="space-y-2">
              {[
                { value: "admin", label: "Admin", desc: "Full access to all features" },
                { value: "editor", label: "Editor", desc: "Can create and edit videos" },
                { value: "viewer", label: "Viewer", desc: "View-only access" }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    role === option.value
                      ? "border-teal-500 bg-teal-500/10"
                      : "border-border-subtle bg-bg-underlay hover:border-border-offset"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={role === option.value}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1 w-4 h-4 accent-teal-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-sidebar-foreground mb-0.5">{option.label}</div>
                    <div className="text-xs text-text-quiet">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle">
            <label className="text-sm text-text-quiet mb-2 block">Or share invite link</label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 bg-bg-underlay border border-border-subtle rounded-xl text-sm text-text-quiet truncate">
                {inviteLink}
              </div>
              <button
                onClick={handleCopyLink}
                className="w-12 h-12 rounded-xl bg-teal-500 hover:bg-teal-600 flex items-center justify-center transition-all"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Copy className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-bg-underlay hover:bg-bg-offset border border-border-subtle rounded-xl text-sm font-medium text-text-quiet hover:text-sidebar-foreground transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl text-sm font-medium text-white transition-all"
            >
              Send Invite
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

