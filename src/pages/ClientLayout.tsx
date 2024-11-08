'use client';

// import './globals.css';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Example from '@/components/Banner';
import Popover from '../components/Popover';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [wallet, setWallet] = useState<string | null>(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // State for managing loading status


  useEffect(() => {
    const isProtectedRoute = pathname.startsWith('/dashboard') && pathname !== '/dashboard/pricing';
    if (isProtectedRoute && !wallet) {
      setShowLoginMessage(true);
      // Uncomment to enable automatic redirection
      // setTimeout(() => {
      //   router.push('/login');
      // }, 3000);
    } else {
      setShowLoginMessage(false);
    }
  }, [pathname, wallet, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isDashboardPage = pathname.startsWith('/dashboard');

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
    localStorage.setItem('showPopover', 'false');
  };

  const handleEarnNow = () => {
    setIsPopoverOpen(false);
    router.push('/login');
  };

  return (
    <>
      {!isDashboardPage && <NavBar />}

      {children}
      <LanguageSwitcher />
      {!isDashboardPage && <Example />}
      {!isDashboardPage && isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-white">
            <div className="loader"></div>
          </div>
        </div>
      )}

      {/* Show Popover when not loading */}
      {/* {!isDashboardPage && !isLoading && isPopoverOpen && (
        <Popover
          isOpen={isPopoverOpen}
          onClose={handlePopoverClose}
          onEarnNow={handleEarnNow}
        />
      )} */}

      {/* {showLoginMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="text-center text-red-500">
              Please connect your wallet to access the dashboard.
              <br />
              Redirecting to login...
              <br />
              <a href="/login" className="text-blue-500 underline mt-2 block text-center">
                Go to Login
              </a>
            </p>
          </div>
        </div>
      )} */}
    </>

  );


}
