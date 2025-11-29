import * as React from "react";
import { X, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import "@/app/dashboard/dashboard.css";

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const notifications = [
  {
    id: 1,
    title: "New feature available",
    message: "Check out our new AI-powered search recommendations to enhance your queries.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "System update",
    message: "We've improved response times by 30%. Enjoy faster results!",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    title: "Pro plan benefits",
    message: "Upgrade to Pro to unlock unlimited searches and advanced features.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 4,
    title: "Weekly summary",
    message: "You made 45 searches this week. Your most searched topic was 'Technology'.",
    time: "3 days ago",
    read: true,
  },
  {
    id: 5,
    title: "New model available",
    message: "Try our latest language model for more accurate and detailed responses.",
    time: "5 days ago",
    read: true,
  },
  {
    id: 6,
    title: "Feature tip",
    message: "Did you know? You can use @ mentions to reference previous conversations?",
    time: "1 week ago",
    read: true,
  },
  {
    id: 7,
    title: "Community highlight",
    message: "Join our Discord community to connect with other users and share tips.",
    time: "1 week ago",
    read: true,
  },
];

export default function NotificationsDialog({
  open,
  onOpenChange,
}: NotificationsDialogProps) {

  // ✅ Close on ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/80 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#191A1A] rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Bell className="size-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Notifications
            </h2>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto scrollbar-subtle px-6 py-4 space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "rounded-xl p-4 transition-colors cursor-pointer",
                notification.read
                  ? "bg-[#202222] hover:bg-[#252727]"
                  : "bg-[#2C2E2E] hover:bg-[#303232]"
              )}
            >
              <div className="flex items-start gap-3">
                {!notification.read && (
                  <div className="mt-1.5 size-2 rounded-full bg-primary shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    {notification.message}
                  </p>
                  <span className="text-[10px] text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.08)]">
          <button className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}
