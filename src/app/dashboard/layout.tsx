"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/layout/sidebar";
import ThreadSidebar from "@/components/dashboard/layout/thread-sidebar";
import { useThreads } from "@/lib/hooks/use-threads";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [historyIconHovered, setHistoryIconHovered] = useState(false);
  const [threadSidebarHovered, setThreadSidebarHovered] = useState(false);
  
  const {
    threads,
    activeThreadId,
    setActiveThreadId,
    deleteThread,
    createThread,
  } = useThreads();

  const showThreadSidebar = historyIconHovered || threadSidebarHovered;

  const handleThreadClick = (threadId: string) => {
    setActiveThreadId(threadId);
    if (pathname !== "/dashboard") {
      router.push("/dashboard");
    }
  };

  const handleNewThread = () => {
    createThread();
    setActiveThreadId(null);
    router.push("/dashboard");
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-bg-underlay">
      <Sidebar 
        onNewThread={handleNewThread}
        onHistoryHover={setHistoryIconHovered}
      />

      <ThreadSidebar
        isHovered={showThreadSidebar}
        threads={threads}
        activeThreadId={activeThreadId}
        onThreadClick={handleThreadClick}
        onThreadDelete={deleteThread}
        onHoverChange={setThreadSidebarHovered}
      />

      {children}
    </div>
  );
}

