"use client";

import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import CommunityExplore from "@/components/dashboard/community/community-explore";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex-1 relative overflow-y-auto bg-bg-underlay">
      <CommunityExplore />
      
      <button
        onClick={() => router.push("/dashboard/studio")}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-teal-500 hover:bg-teal-600 shadow-2xl shadow-teal-500/50 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 group"
        title="Create New Video"
      >
        <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}
