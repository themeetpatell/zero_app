"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.20454C17.64 8.56636 17.5827 7.95272 17.4764 7.36363H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.20454Z" fill="#4285F4"/>
    <path d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z" fill="#34A853"/>
    <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
    <path d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <path d="M14.2734 15.3984C13.6641 16.2891 12.9922 17.1562 11.9531 17.1797C10.9375 17.2031 10.5938 16.5703 9.42188 16.5703C8.22656 16.5703 7.85938 17.1562 6.89062 17.2031C5.875 17.25 5.10938 16.2656 4.49219 15.3984C3.1875 13.5469 2.19531 10.125 3.54688 7.73438C4.21875 6.54688 5.44531 5.8125 6.76562 5.78906C7.73438 5.76562 8.64844 6.46875 9.23438 6.46875C9.79688 6.46875 10.9141 5.625 12.0938 5.74219C12.5859 5.76562 14.0625 5.95312 15.0469 7.42969C14.9531 7.48438 13.3359 8.45312 13.3594 10.4766C13.3828 12.9609 15.4766 13.7891 15.5 13.8125C15.4766 13.8828 15.1797 15 14.2734 15.3984ZM11.9766 3.86719C12.4922 3.23438 12.8594 2.34375 12.7422 1.42969C12 1.47656 11.0859 1.97656 10.5469 2.60938C10.0547 3.17188 9.60938 4.08594 9.75 4.95312C10.5703 5.02344 11.4375 4.5 11.9766 3.86719Z"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect width="8" height="8" fill="#F25022"/>
    <rect x="10" width="8" height="8" fill="#7FBA00"/>
    <rect y="10" width="8" height="8" fill="#00A4EF"/>
    <rect x="10" y="10" width="8" height="8" fill="#FFB900"/>
  </svg>
);

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignIn = async (provider: 'google' | 'apple' | 'microsoft') => {
    setIsLoading(provider);
    
    try {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard"
      });
      
      if (error) {
        toast.error(`Failed to sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`);
        setIsLoading(null);
        return;
      }
      
      toast.success("Signed in successfully!");
    } catch (err) {
      toast.error("An error occurred during sign in");
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 text-[#111827]">
      {mounted && (
        <div className="w-full max-w-md">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111827] transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>

          <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06)]">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold tracking-tight mb-2 text-[#111827]">Welcome to Zero Human</h1>
              <p className="text-[#6B7280]">Sign in to get started</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleSignIn('google')}
                disabled={isLoading !== null}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#E5E7EB] rounded-full hover:bg-[#F9FAFB] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading === 'google' ? (
                  <div className="w-4 h-4 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                <span className="font-medium text-[#111827]">Continue with Google</span>
              </button>

              <button
                onClick={() => handleSignIn('apple')}
                disabled={isLoading !== null}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#E5E7EB] rounded-full hover:bg-[#F9FAFB] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading === 'apple' ? (
                  <div className="w-4 h-4 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <AppleIcon />
                )}
                <span className="font-medium text-[#111827]">Continue with Apple</span>
              </button>

              <button
                onClick={() => handleSignIn('microsoft')}
                disabled={isLoading !== null}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#E5E7EB] rounded-full hover:bg-[#F9FAFB] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading === 'microsoft' ? (
                  <div className="w-4 h-4 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <MicrosoftIcon />
                )}
                <span className="font-medium text-[#111827]">Continue with Microsoft</span>
              </button>
            </div>

            <div className="mt-8 text-center text-xs text-[#6B7280]">
              By continuing, you agree to our{' '}
              <Link href="/terms-of-use" className="underline hover:text-[#111827]">
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="underline hover:text-[#111827]">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-[#6B7280]">
            <p>Need help? <a href="mailto:support@zerohuman.co" className="text-[#111827] hover:underline">Contact support</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
