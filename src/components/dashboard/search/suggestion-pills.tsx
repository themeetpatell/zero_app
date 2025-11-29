import { Baby, BookOpen, FileText, Heart, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "@/app/dashboard/dashboard.css";

// This component is static and doesn't require client-side interactivity yet.
// It can be a Server Component.

const iconMap: { [key: string]: LucideIcon } = {
  Baby,
  Wrench,
  Heart,
  BookOpen,
  FileText,
};

type Suggestion = {
  icon: keyof typeof iconMap;
  text: string;
};

const suggestions: Suggestion[] = [
  { icon: "Baby", text: "Parenting" },
  { icon: "Wrench", text: "Troubleshoot" },
  { icon: "Heart", text: "Health" },
  { icon: "BookOpen", text: "Learn" },
  { icon: "FileText", text: "Summarize" },
];

const SuggestionPill = ({ icon, text }: Suggestion) => {
  const IconComponent = iconMap[icon];

  const buttonClasses = [
    // Layout and Sizing
    "inline-flex",
    "items-center",
    "justify-center",
    "h-8",
    "px-2.5",
    "gap-2",
    // Typography
    "text-sm",
    "font-[550]",
    "whitespace-nowrap",
    // Appearance
    "rounded-lg",
    "border",
    "bg-[color:var(--color-bg-base)]",
    "border-[color:var(--color-border-subtler)]",
    "text-[color:var(--color-text-quiet)]",
    // Interactivity
    "cursor-pointer",
    "select-none",
    "transition",
    "duration-300",
    "ease-out",
    "origin-center",
    "focus:outline-none",
    // States
    "hover:bg-[color:var(--color-bg-subtler)]",
    "md:hover:border-[color:var(--color-border-subtle)]",
    "active:scale-[0.97]",
    "active:duration-150",
    "active:ease-outExpo",
  ].join(" ");

  return (
    <button className={buttonClasses}>
      <IconComponent className="size-4 shrink-0" />
      <span className="truncate">{text}</span>
    </button>
  );
};

const SuggestionPills = () => {
  // Spacing is set to 24px margin-top, which is between the 24-32px range provided.
  // The layout centers the pills horizontally and handles overflow by clipping.
  return (
    <div className="mt-6 w-full">
      <div className="animate-in fade-in duration-300">
        <div className="flex h-8 flex-row flex-wrap justify-center gap-2 overflow-hidden">
          {suggestions.map((suggestion) => (
            <SuggestionPill key={suggestion.text} {...suggestion} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionPills;