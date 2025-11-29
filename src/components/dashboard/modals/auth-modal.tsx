"use client";

import { useState } from "react";
import { X } from "lucide-react";
import "@/app/dashboard/dashboard.css";

// Simplified geometric icon, inspired by the sidebar logo
const PerplexityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-8 w-8 text-primary"
    aria-hidden="true"
  >
    <path
      d="M12 2.5a.7.7 0 0 0-.71.01L3.5 7a.7.7 0 0 0-.35.61v8.78a.7.7 0 0 0 .35.61l7.79 4.49a.7.7 0 0 0 .7 0l7.8-4.49a.7.7 0 0 0 .35-.61V7.61a.7.7 0 0 0-.35-.61L12.71 2.51A.7.7 0 0 0 12 2.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    ></path>
    <path
      d="M8.29 6.25l3.71 2.14 3.71-2.14m-7.42 4.28v4.28m3.71 2.15L12 14.82l3.71-2.14"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const AppleIcon = () => (
    <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M19.39,14.61c-1.12,0-1.83.66-2.91,1.78a5.2,5.2,0,0,1-2.92,1.78,5.8,5.8,0,0,1-3.32-1.78c-1.12-1.12-1.78-1.51-2.92-1.51a5.05,5.05,0,0,0-4.33,5.18,10.89,10.89,0,0,0,2,6.39,6,6,0,0,0,4.6,2.44,5,5,0,0,0,3.48-1.63,4.53,4.53,0,0,0,3.22,1.63,6.08,6.08,0,0,0,4.86-2.44,10.23,10.23,0,0,0,1.88-6.19c0-3.3-2-5.44-4.59-5.44M14.62,4a5.53,5.53,0,0,0-4.48,2.73,5.34,5.34,0,0,0-4.47-2.73c-3,0-5.32,2.34-5.32,5.92,0,2.4,1.17,4.3,2.6,5.84,1.41,1.52,2.83,2.4,4.72,2.45a4.5,4.5,0,0,0,3.22-1.51,4.2,4.2,0,0,0,3.12,1.51c2,0,3.32-.93,4.62-2.45,1.52-1.52,2.5-3.44,2.5-5.84C20.66,6.29,17.78,4,14.62,4" />
    </svg>
);


export default function AuthModal({ onClose }: { onClose?: () => void }) {
  const [email, setEmail] = useState("");

  const isEmailValid = email.length > 5 && email.includes("@") && email.includes(".");

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in fade-in duration-300">
      <div className="relative w-[392px] bg-card text-card-foreground rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center">
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="mb-6">
          <PerplexityIcon />
        </div>

        <h2 className="text-xl font-medium text-foreground mb-1">
          Sign in or create an account
        </h2>
        <p className="text-base text-muted-foreground mb-6">
          Unlock Pro Search and History
        </p>

        <div className="w-full flex flex-col gap-3">
          <button className="w-full h-12 px-4 rounded-lg bg-primary text-primary-foreground flex items-center justify-center gap-3 text-base font-medium transition-colors hover:bg-primary/90 active:scale-[0.98]">
            <GoogleIcon />
            Continue with Google
          </button>
          <button className="w-full h-12 px-4 rounded-lg bg-white text-black flex items-center justify-center gap-3 text-base font-medium transition-colors hover:bg-gray-100 active:scale-[0.98] border border-border">
            <AppleIcon />
            Continue with Apple
          </button>
        </div>

        <div className="mt-6 w-full flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-input border border-border placeholder:text-muted-foreground text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            disabled={!isEmailValid}
            className="w-full h-12 px-4 rounded-lg flex items-center justify-center text-base font-medium transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
          >
            Continue with email
          </button>
        </div>

        <div className="mt-8">
          <a href="#" className="text-sm font-medium text-primary hover:text-primary/90 transition-colors">
            Single sign-on (SSO)
          </a>
        </div>
      </div>
    </div>
  );
}