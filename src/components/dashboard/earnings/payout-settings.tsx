"use client";

import { CreditCard, Calendar, Settings } from "lucide-react";

export default function PayoutSettings() {
  return (
    <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-5 h-5 text-teal-500" />
        <h3 className="text-lg font-light text-sidebar-foreground">Payout Settings</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-bg-underlay border-2 border-teal-500/30 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-sidebar-foreground">Stripe</div>
                <div className="text-xs text-text-quiet">••••  4242</div>
              </div>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">
              Active
            </div>
          </div>
        </div>

        <div className="p-4 bg-bg-underlay border border-border-subtle rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-text-quiet" />
            <span className="text-sm text-text-quiet">Payout Schedule</span>
          </div>
          <select className="w-full px-3 py-2 bg-bg-subtle border border-border-subtle rounded-lg text-sm text-sidebar-foreground">
            <option>Weekly (every Friday)</option>
            <option>Bi-weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div className="p-4 bg-bg-underlay border border-border-subtle rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-quiet">Minimum Payout</span>
            <span className="text-sm font-medium text-sidebar-foreground">$100</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-quiet">Next Payout</span>
            <span className="text-sm font-medium text-green-400">Friday, Dec 20</span>
          </div>
        </div>

        <button className="w-full px-4 py-3 bg-bg-underlay hover:bg-bg-offset border border-border-subtle rounded-xl text-sm text-sidebar-foreground transition-all flex items-center justify-center gap-2">
          <Settings className="w-4 h-4" />
          Manage Payout Methods
        </button>
      </div>
    </div>
  );
}

