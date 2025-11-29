"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const ZeroHumanLogo = ({ isDark }: { isDark: boolean }) => (
  <div className="flex items-center gap-2">
    <img
      src="/ZH New Logo.svg"
      alt="Zero Human Logo"
      className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
    />

    <span
      className={`text-lg sm:text-xl font-normal tracking-tight transition-colors duration-300 ${isDark ? 'text-white' : 'text-off-black'
        }`}
    >
      Zero Human
    </span>
  </div>


);

const HamburgerIcon = ({ isDark }: { isDark: boolean }) => (
  <svg width="23" height="9">
    <rect y="0" width="23" height="1" className="fill-current"></rect>
    <rect y="4" width="23" height="1" className="fill-current"></rect>
    <rect y="8" width="23" height="1" className="fill-current"></rect>
  </svg>
);

const navLinks = [
  { href: "/research/introducing-zero-v1", label: "Research" },
  { href: "/company", label: "Company" },
];

const HeaderNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style when scrolled down
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleGetStartedClick = () => {
    if (session?.user) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  };

  return (
    <>
      <header
        className={`fixed w-full z-40 transition-all duration-300 py-4 lg:py-0 top-0 ${isScrolled
            ? 'bg-[#1a1a1a] text-light-gray shadow-lg'
            : 'bg-white text-off-black shadow-sm'
          }`}
      >
        <div className="rw-container">
          <div className="flex items-center justify-between static z-10">
            <div className="lg:w-2/12 relative z-20">
              <Link
                href="/"
                className="hover:opacity-70 translate-y-1 inline-flex relative items-center transition-opacity duration-200"
              >
                <ZeroHumanLogo isDark={isScrolled} />
              </Link>
            </div>

            <nav className="hidden lg:block">
              <ul className="flex items-center justify-center relative z-20">
                {navLinks.map((link) => (
                  <li key={link.href} className="transition-all duration-200">
                    <Link
                      href={link.href}
                      className={`rw-eyebrow px-4 block hover:opacity-70 py-6 transition-opacity duration-200 ${isScrolled ? 'text-white' : 'text-dark-gray'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:w-2/12 flex justify-end items-center gap-2 relative z-20">
              <button
                onClick={handleGetStartedClick}
                className={`rw-cta-text px-4 pt-[10px] pb-[11px] rounded-full transition-all duration-300 items-center justify-center whitespace-nowrap border inline-flex ${isScrolled
                    ? 'bg-white text-dark-gray border-white hover:bg-white/90'
                    : 'bg-off-black text-white border-off-black hover:bg-dark-gray'
                  }`}
              >
                {session?.user ? "Get Started" : "Get Started"}
              </button>
              <button
                className={`block lg:hidden ml-3 p-2 transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-off-black'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <HamburgerIcon isDark={isScrolled} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 bg-white transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className={`rw-container pt-24 h-full ${isMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col items-start gap-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rw-eyebrow text-xl py-2" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col items-start gap-y-4">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleGetStartedClick();
              }}
              className="rw-cta-text px-4 pt-[10px] pb-[11px] w-full text-center rounded-full inline-flex transition-all duration-200 items-center justify-center whitespace-nowrap bg-off-black text-white border border-off-black hover:bg-dark-gray"
            >
              {session?.user ? "Dashboard" : "Get Started"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNavigation;