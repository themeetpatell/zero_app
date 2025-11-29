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
  const [pricingOpen, setPricingOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  const navItems: NavItemProps[] = [
    { href: "/dashboard", icon: House, label: "Home" },
    {
      icon: ClockCounterClockwise,
      label: "History",
      onMouseEnter: () => onHistoryHover?.(true),
      onMouseLeave: () => onHistoryHover?.(false),
    },
    { href: "/dashboard/creations", icon: PaintBucket, label: "Creations" },
  ];

  const user = session?.user;
  const userName = user?.name || "User";
  const userImage =
    user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;

  return (
    <>
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
            className="mt-5 flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent hover:bg-sidebar-accent/80 transition-all duration-100 hover:scale-105 active:scale-95"
            title="New Thread"
          >
            <Plus
              className="h-[18px] w-[18px] text-sidebar-accent-foreground"
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
