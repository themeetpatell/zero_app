"use client";

import * as React from "react";
import "@/app/dashboard/dashboard.css";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  FileText,
  HelpCircle,
  Info,
  Keyboard,
  MessageSquare,
  Shield,
  Sparkles,
  AtSign,
} from "lucide-react";

const menuItems = [
  { icon: HelpCircle, label: "Help Center", href: "#" },
  { icon: Sparkles, label: "What's New", href: "#" },
  { icon: Keyboard, label: "Keyboard Shortcuts", href: "#" },
  { type: "separator" as const },
  { icon: FileText, label: "Terms", href: "#" },
  { icon: Shield, label: "Privacy", href: "#" },
  { type: "separator" as const },
  { icon: MessageSquare, label: "Discord", href: "#" },
  { icon: AtSign, label: "X", href: "#" },
  { icon: BookOpen, label: "Blog", href: "#" },
  { icon: Info, label: "About", href: "#" },
];

interface LearnMoreDropdownProps {
  children: React.ReactNode;
}

const LearnMoreDropdown = ({ children }: LearnMoreDropdownProps) => {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        {children}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          side="top"
          align="end"
          sideOffset={12}
          className={cn(
            "z-50 w-56 overflow-hidden rounded-lg border border-border-subtle bg-popover p-2 text-popover-foreground shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          {menuItems.map((item, index) =>
            item.type === "separator" ? (
              <DropdownMenuPrimitive.Separator
                key={`separator-${index}`}
                className="my-2 h-px bg-muted"
              />
            ) : (
              <DropdownMenuPrimitive.Item
                key={item.label}
                asChild
                className="relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2.5 text-sm outline-none transition-colors hover:bg-bg-subtle focus:bg-bg-subtle data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <a
                  href={item.href}
                  className="flex w-full items-center gap-3 text-foreground no-underline"
                >
                  <item.icon className="h-4 w-4 text-text-quiet" />
                  <span>{item.label}</span>
                </a>
              </DropdownMenuPrimitive.Item>
            )
          )}
          <DropdownMenuPrimitive.Arrow className="fill-popover" />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};

export default LearnMoreDropdown;