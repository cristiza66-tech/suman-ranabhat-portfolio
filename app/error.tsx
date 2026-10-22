"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error in development only to prevent sensitive leakage in production
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center">
        <span className="eyebrow-badge mb-4">Application Notice</span>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-4 text-secondary text-base leading-relaxed">
          An unexpected issue occurred while rendering this page. Please try refreshing or return to the homepage.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm !py-2.5 !px-5 cursor-pointer"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm !py-2.5 !px-5"
          >
            <Home size={16} />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
