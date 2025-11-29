"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  ArrowUp,
  Zap,
  HelpCircle,
  Code2,
  LogOut,
  Sparkles,
  FileText,
  MessageCircle,
} from "lucide-react";
import WhatsNew from "@/components/dashboard/modals/update-dialog";
import SupportDialog from "@/components/dashboard/modals/support-dialog";

interface ProfileMenuProps {
  children: React.ReactNode;
  onUpgradeClick?: () => void;
}

export default function ProfileMenu({ children, onUpgradeClick }: ProfileMenuProps) {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [whatsNewOpen, setWhatsNewOpen] = React.useState(false);
  const [supportOpen, setSupportOpen] = React.useState(false);

  const handleGoogleSignIn = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error?.code) {
      toast.error("Google sign-in failed");
      return;
    }
  };

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error?.code) {
      toast.error(error.code);
    } else {
      localStorage.removeItem("bearer_token");
      refetch();
      router.push("/");
      toast.success("Signed out successfully");
    }
  };

  // If not logged in, show sign-in options
  if (!isPending && !session?.user) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="right"
          className="w-[200px] rounded-xl border border-border/50 bg-gradient-to-b from-card to-card/95 backdrop-blur-xl p-0 shadow-xl"
          sideOffset={8}
        >
          <div className="p-3 space-y-2">
            <div className="text-center space-y-1">
              <div className="mx-auto w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                Sign in to continue
              </h3>
              <p className="text-[10px] text-muted-foreground">
                Unlock premium features
              </p>
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-white text-gray-900 px-3 py-2 text-xs font-medium hover:bg-gray-50 transition-all hover:shadow-md"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (isPending) {
    return <>{children}</>;
  }

  // User is logged in - show profile menu
  const user = session?.user;
  const userName = user?.name || "User";
  const userEmail = user?.email || "";
  const userImage = user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;
  const creditsLeft = 100;

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="right"
          className="w-[200px] rounded-xl border border-border/50 bg-gradient-to-b from-card to-card/95 backdrop-blur-xl p-0 shadow-xl"
          sideOffset={8}
        >
          {/* User Info Section */}
          <div className="p-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="relative size-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden flex-shrink-0 ring-2 ring-primary/10">
                <img
                  src={userImage}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-foreground truncate">
                  {userName}
                </h3>
                <p className="text-[10px] text-muted-foreground truncate">
                  {userEmail}
                </p>
              </div>
            </div>

            {/* Free Plan Badge */}
            <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-gradient-to-r from-background to-background/80 border border-border/50">
              <span className="text-[10px] font-medium text-foreground">Free Plan</span>
              <div className="flex items-center gap-1 text-[10px] text-primary">
                <Zap className="size-2.5 fill-primary" />
                <span className="font-semibold">{creditsLeft}</span>
              </div>
            </div>

            {/* Upgrade Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                onUpgradeClick?.();
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-3 py-1.5 text-xs font-medium hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <ArrowUp className="size-3" />
              Upgrade to Pro
            </button>
          </div>

          <DropdownMenuSeparator className="my-0 bg-border/50" />

          {/* Menu Items */}
          <div className="p-1">
            <DropdownMenuItem
              onClick={() => {
                setIsOpen(false);
                setWhatsNewOpen(true);
              }}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-lg hover:bg-accent/50 transition-colors"
            >
              <Sparkles className="size-3 text-muted-foreground" />
              <span className="text-xs">What&apos;s New</span>
              <span className="ml-auto size-1 rounded-full bg-primary shadow-sm shadow-primary/50"></span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-lg hover:bg-accent/50 transition-colors"
            >
              <FileText className="size-3 text-muted-foreground" />
              <span className="text-xs">Documentation</span>
              <span className="ml-auto rounded-md bg-primary/10 px-1 py-0.5 text-[9px] font-semibold text-primary">
                Soon
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setIsOpen(false);
                setSupportOpen(true);
              }}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-lg hover:bg-accent/50 transition-colors"
            >
              <MessageCircle className="size-3 text-muted-foreground" />
              <span className="text-xs">Support</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-lg hover:bg-accent/50 transition-colors"
            >
              <Code2 className="size-3 text-muted-foreground" />
              <span className="text-xs">API Access</span>
              <span className="ml-auto rounded-md bg-primary/10 px-1 py-0.5 text-[9px] font-semibold text-primary">
                Soon
              </span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1 bg-border/50" />

            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="size-3" />
              <span className="text-xs font-medium">Sign out</span>
            </DropdownMenuItem>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-border/50 bg-accent/30">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <a href="/terms-of-use" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                Privacy
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110"
                aria-label="Discord"
              >
                <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0 a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* What's New Dialog */}
      {whatsNewOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setWhatsNewOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <WhatsNew />
          </div>
        </div>
      )}

      {/* Support Dialog */}
      <SupportDialog open={supportOpen} onOpenChange={setSupportOpen} />
    </>
  );
}