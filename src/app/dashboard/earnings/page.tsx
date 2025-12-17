"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, ShoppingBag, Download, Calendar, CreditCard } from "lucide-react";
import RevenueChart from "@/components/dashboard/earnings/revenue-chart";
import TransactionHistory from "@/components/dashboard/earnings/transaction-history";
import PayoutSettings from "@/components/dashboard/earnings/payout-settings";

export default function EarningsPage() {
  const [period, setPeriod] = useState("month");

  const earnings = {
    total: 45680,
    pending: 3240,
    paid: 42440,
    thisMonth: 12350,
    growth: 34.2,
    totalSales: 89,
    avgSalePrice: 513
  };

  return (
    <div className="flex-1 overflow-y-auto bg-bg-underlay">
      <div className="max-w-[1800px] mx-auto p-8 space-y-6">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-light text-sidebar-foreground mb-2">Earnings</h1>
            <p className="text-text-quiet">Track your revenue and manage payouts</p>
          </div>
          <div className="flex gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 bg-bg-subtle border border-border-subtle rounded-lg text-sm text-sidebar-foreground"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-sm text-white font-medium transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 border border-teal-500/20 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-teal-400" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                <TrendingUp className="w-3 h-3" />
                {earnings.growth}%
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              ${(earnings.total / 1000).toFixed(1)}K
            </div>
            <div className="text-sm text-text-quiet">Total Earnings</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              ${(earnings.paid / 1000).toFixed(1)}K
            </div>
            <div className="text-sm text-text-quiet">Paid Out</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              ${(earnings.pending / 1000).toFixed(1)}K
            </div>
            <div className="text-sm text-text-quiet">Pending</div>
          </div>

          <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6 hover:border-teal-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div className="text-3xl font-light text-sidebar-foreground mb-1">
              {earnings.totalSales}
            </div>
            <div className="text-sm text-text-quiet">Total Sales</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RevenueChart period={period} />
            <TransactionHistory />
          </div>
          <div className="space-y-6">
            <PayoutSettings />
            
            <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
              <h3 className="text-lg font-light text-sidebar-foreground mb-4">Creator Perks</h3>
              <ul className="space-y-2 text-sm text-text-quiet">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2" />
                  <span>85% revenue share on all sales</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2" />
                  <span>Weekly payouts via Stripe/PayPal</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2" />
                  <span>Real-time performance analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2" />
                  <span>Premium creator badge</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
