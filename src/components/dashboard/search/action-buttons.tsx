"use client";

import { Globe, Layers, Paperclip, Mic, Waves } from "lucide-react";
import "@/app/dashboard/dashboard.css";

const ActionButtons = () => {
  return (
    <div className="flex items-center">
      <button
        aria-label="Language selector"
        className="inline-flex h-8 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Globe size={16} />
      </button>
      <button
        aria-label="Sources switcher"
        className="ml-2 inline-flex h-8 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Layers size={16} />
      </button>
      <button
        aria-label="Attach files"
        className="ml-2 inline-flex h-8 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Paperclip size={16} />
      </button>
      <button
        aria-label="Dictation"
        className="ml-2 inline-flex h-8 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Mic size={16} />
      </button>
      <button
        aria-label="Voice mode"
        className="ml-4 inline-flex h-8 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Waves size={16} />
      </button>
    </div>
  );
};

export default ActionButtons;