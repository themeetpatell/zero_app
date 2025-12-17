"use client";

import React from "react";
import "@/app/dashboard/dashboard.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  ClockCounterClockwise,
  PaintBucket,
  ArrowUp,
  Bell,
  Plus,
  IconProps,
  Sparkle,
  ShoppingCart,
  ChartBar,
  CurrencyDollar,
  Flask,
  UsersThree,
  GraduationCap,
  X,
  List,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import ProfileMenu from "./profile-menu";
import { useSession } from "@/lib/auth-client";
import ZeroHumanPricing from "@/components/dashboard/modals/pricing-dialog";
import NotificationsDialog from "@/components/dashboard/modals/notifications-dialog";

const ZeroHumanLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 740 540"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ opacity: 1 }}
  >
    <image
      href="/ZH New Logo.svg"
      width="640"
      height="640"
      x="100"
      y="0"
      transform="translate(-180, -180) scale(1.3)"
      preserveAspectRatio="xMidYMid meet"
    />
  </svg>
);

interface NavItemProps {
  href?: string;
  icon: React.ComponentType<IconProps>;
  label: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NavItem = ({
  href,
  icon: Icon,
  label,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: NavItemProps) => {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;

  const content = (
    <>
      <div className="relative grid size-8 place-items-center z-100">
        <div
          className={cn(
            "absolute size-[90%] rounded-md bg-sidebar-accent transition-opacity duration-100 group-hover:opacity-100",
            isActive ? "opacity-100" : "opacity-0"
          )}
        />
        <Icon
          className={cn(
            "relative size-[18px] transition-transform duration-200 ease-in-out group-hover:scale-125",
            isActive
              ? "scale-110 text-sidebar-accent-foreground"
              : "text-sidebar-foreground"
          )}
          weight={isActive ? "duotone" : "regular"}
        />
      </div>
      <div
        className={cn(
          "w-full truncate text-center text-[9px] font-normal leading-[1.1]",
          isActive
            ? "text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground"
        )}
      >
        {label}
      </div>
    </>
  );

  if (onClick || !href) {
    return (
      <button
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group flex w-full flex-col items-center justify-center gap-0.5 p-1.5"
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className="group flex w-full flex-col items-center justify-center gap-0.5 p-1.5"
    >
      {content}
    </Link>
  );
};

interface SidebarProps {
  onNewThread?: () => void;
  onHistoryHover?: (isHovered: boolean) => void;
}

export default function Sidebar({ onNewThread, onHistoryHover }: SidebarProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [pricingOpen, setPricingOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: NavItemProps[] = [
    { href: "/dashboard/home", icon: House, label: "Home" },
    { href: "/dashboard/studio", icon: Sparkle, label: "Studio" },
    { href: "/dashboard/marketplace", icon: ShoppingCart, label: "Market" },
    { href: "/dashboard/creations", icon: PaintBucket, label: "Library" },
    { href: "/dashboard/history", icon: ClockCounterClockwise, label: "History" },
    { href: "/dashboard/analytics", icon: ChartBar, label: "Analytics" },
    { href: "/dashboard/earnings", icon: CurrencyDollar, label: "Earnings" },
    { href: "/dashboard/learn", icon: GraduationCap, label: "Learn" },
    { href: "/dashboard/ab-testing", icon: Flask, label: "A/B Test" },
    { href: "/dashboard/collaborate", icon: UsersThree, label: "Team" },
  ];

  const user = session?.user;
  const userName = user?.name || "User";
  const userImage =
    user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;

  const topNavItems = navItems.slice(0, 5);
  const bottomNavItems = navItems.slice(5);

  return (
    <>
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-sidebar border border-border-subtlest flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
      >
        <List className="w-5 h-5" weight="bold" />
      </button>

      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="md:hidden fixed left-0 top-0 h-full w-64 bg-sidebar text-foreground z-50 flex flex-col shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-border-subtlest">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="transition-transform duration-100 ease-out active:scale-[0.97]"
              >
                <ZeroHumanLogo className="w-8 h-auto" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <X className="w-5 h-5" weight="bold" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-2">
              <button
                onClick={() => {
                  onNewThread?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-600 transition-all mb-4"
              >
                <Plus className="h-5 w-5 text-white" weight="bold" />
                <span className="text-sm font-medium text-white">New Chat</span>
              </button>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href || "#"}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      <item.icon className="w-5 h-5" weight={isActive ? "duotone" : "regular"} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-border-subtlest p-4 space-y-2">
              <button
                onClick={() => {
                  setNotificationsOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              >
                <Bell className="w-5 h-5" weight="regular" />
                <span className="text-sm font-medium">Notifications</span>
              </button>

              <button
                onClick={() => {
                  setPricingOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              >
                <ArrowUp className="w-5 h-5" weight="regular" />
                <span className="text-sm font-medium">Upgrade</span>
              </button>

              <div className="pt-2">
                <ProfileMenu onUpgradeClick={() => {
                  setPricingOpen(true);
                  setMobileMenuOpen(false);
                }}>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
                    <div className="relative size-8 rounded-full bg-sidebar-accent overflow-hidden flex items-center justify-center">
                      <img
                        src={userImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">Profile</span>
                  </button>
                </ProfileMenu>
              </div>
            </div>
          </aside>
        </>
      )}

      <aside className="hidden bg-sidebar text-foreground md:flex flex-none w-13">
        <div className="relative flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden py-2.5 scrollbar-none">
          {/* Logo */}
          <span>
            <Link
              href="/"
              className="mt-0.5 block transition-transform duration-100 ease-out active:scale-[0.97]"
            >
              <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                <ZeroHumanLogo className="w-7 h-auto" />
              </div>
            </Link>
          </span>

          {/* New Thread Button */}
          <button
            onClick={onNewThread}
            className="mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 hover:bg-teal-600 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg shadow-teal-500/50 aspect-square"
            title="New Chat"
            style={{ borderRadius: '50%' }}
          >
            <Plus
              className="h-5 w-5 text-white flex-shrink-0"
              weight="bold"
            />
          </button>

          {/* Navigation */}
          <div className="relative flex w-full flex-1 flex-col items-center pt-5">
            <nav className="w-full pb-5">
              {navItems.map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
            </nav>
          </div>

          {/* Bottom Buttons */}
          <div className="mt-auto flex w-full flex-col items-center justify-center gap-1.2 pb-1.5">
            {/* Notifications */}
            <button
              onClick={() => setNotificationsOpen(true)}
              className="group flex flex-col items-center justify-center p-1.5"
            >
              <div className="relative grid size-8 place-items-center">
                <div className="absolute size-[90%] rounded-md bg-sidebar-accent opacity-0 transition-opacity duration-100 group-hover:opacity-100" />
                <Bell
                  className="relative size-[18px] text-sidebar-foreground transition-transform duration-200 ease-in-out group-hover:scale-125"
                  weight="regular"
                />
              </div>
            </button>

            {/* Upgrade */}
            <button
              onClick={() => setPricingOpen(true)}
              className="group flex flex-col items-center justify-center gap-0.2"
            >
              <div className="relative grid size-8 place-items-center">
                <div className="absolute size-full rounded-lg bg-sidebar-accent opacity-0 transition-opacity duration-100 group-hover:opacity-100" />
                <ArrowUp
                  className="relative size-[18px] text-sidebar-foreground"
                  weight="regular"
                />
              </div>
              <span className="text-[9px] text-sidebar-foreground font-normal leading-[1.1]">
                Upgrade
              </span>
            </button>

            {/* Profile */}
            <div className="mt-4">
              <ProfileMenu onUpgradeClick={() => setPricingOpen(true)}>
                <button className="group flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                  <div className="relative size-8 rounded-full bg-sidebar-accent overflow-hidden flex items-center justify-center ring-0 hover:ring-2 hover:ring-sidebar-accent transition-all">
                    <img
                      src={userImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[9px] text-sidebar-foreground font-normal leading-[1.1]">
                    Profile
                  </span>
                </button>
              </ProfileMenu>
            </div>
          </div>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sidebar border-t border-border-subtlest z-40 flex items-center justify-around px-2 py-2" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        {topNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href || "#"}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 min-w-0 flex-1",
                isActive && "text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
                )}
                weight={isActive ? "duotone" : "regular"}
              />
              <span className="text-[10px] font-medium truncate w-full text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
        <button
          onClick={() => {
            onNewThread?.();
          }}
          className="flex flex-col items-center justify-center gap-1 p-2 min-w-0 flex-1"
        >
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/50">
            <Plus className="h-5 w-5 text-white" weight="bold" />
          </div>
          <span className="text-[10px] font-medium text-sidebar-foreground">New</span>
        </button>
      </nav>

      <ZeroHumanPricing
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
      />
      <NotificationsDialog
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
      />
    </>
  );
}
