"use client";

import * as React from "react";
import "@/app/dashboard/dashboard.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
"@/components/ui/dropdown-menu";
import {
  Globe,
  HelpCircle,
  Gift,
  BookOpen,
  Flag,
  Edit3,
  Keyboard,
  CreditCard,
  Building2,
  Code2,
  MessageSquare,
  Briefcase,
  FileText,
  Shield } from
"lucide-react";

const BottomRightOptions = () => {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-20 flex items-center gap-3">
      <button
        type="button"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Change language">
        <Globe size={18} />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors outline-none"
            aria-label="Learn more">
            <HelpCircle size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mb-2 w-56">
          <DropdownMenuItem>
            <Gift className="mr-2 h-4 w-4" />
            Get started
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpen className="mr-2 h-4 w-4" />
            Help center
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Flag className="mr-2 h-4 w-4" />
            Changelog
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit3 className="mr-2 h-4 w-4" />
            Blog
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className="mr-2 h-4 w-4" />
            Keyboard shortcuts
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span className="flex items-center gap-1">
              Perplexity Pro
              <span className="text-xs text-primary">pro</span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Building2 className="mr-2 h-4 w-4" />
            Enterprise
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Code2 className="mr-2 h-4 w-4" />
            Sonar API
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Support
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="text-muted-foreground">
            <Briefcase className="mr-2 h-4 w-4" />
            Careers
          </DropdownMenuItem>
          <DropdownMenuItem className="text-muted-foreground">
            <FileText className="mr-2 h-4 w-4" />
            Terms of service
          </DropdownMenuItem>
          <DropdownMenuItem className="text-muted-foreground">
            <Shield className="mr-2 h-4 w-4" />
            Privacy policy
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>);

};

export default BottomRightOptions;