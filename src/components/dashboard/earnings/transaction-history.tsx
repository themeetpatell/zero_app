"use client";

import { ShoppingBag, Download, CreditCard } from "lucide-react";

export default function TransactionHistory() {
  const transactions = [
    { id: 1, type: "sale", ad: "Luxury Watch Ad", buyer: "@tech_brands", amount: 499, date: "2 hours ago", status: "completed" },
    { id: 2, type: "rent", ad: "Fashion Collection", buyer: "@style_hub", amount: 69, date: "5 hours ago", status: "completed" },
    { id: 3, type: "sale", ad: "Tech Product Launch", buyer: "@innovate_co", amount: 399, date: "1 day ago", status: "completed" },
    { id: 4, type: "license", ad: "Real Estate Villa", buyer: "@luxury_homes", amount: 399, date: "2 days ago", status: "pending" },
    { id: 5, type: "sale", ad: "Restaurant Ad", buyer: "@food_network", amount: 299, date: "3 days ago", status: "completed" },
  ];

  return (
    <div className="bg-bg-subtle border border-border-subtle rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-light text-sidebar-foreground">Recent Transactions</h2>
        <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 bg-bg-underlay border border-border-subtle rounded-xl hover:border-teal-500/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.type === "sale" ? "bg-gradient-to-br from-teal-500 to-teal-600" :
                  transaction.type === "rent" ? "bg-gradient-to-br from-orange-500 to-red-500" :
                  "bg-gradient-to-br from-green-500 to-emerald-500"
                }`}>
                  {transaction.type === "sale" ? <ShoppingBag className="w-5 h-5 text-white" /> :
                   transaction.type === "rent" ? <Download className="w-5 h-5 text-white" /> :
                   <CreditCard className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-sidebar-foreground mb-1">{transaction.ad}</h3>
                  <div className="flex items-center gap-2 text-xs text-text-quiet">
                    <span className="capitalize">{transaction.type}</span>
                    <span>•</span>
                    <span>{transaction.buyer}</span>
                    <span>•</span>
                    <span>{transaction.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium text-green-400 mb-1">
                  +${transaction.amount}
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full ${
                  transaction.status === "completed"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}>
                  {transaction.status}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

