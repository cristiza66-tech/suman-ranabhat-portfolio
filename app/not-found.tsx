import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center">
        <span className="eyebrow-badge mb-4">404 Error</span>
        <h1 className="text-4xl font-extrabold text-primary tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-4 text-secondary text-base leading-relaxed">
          The page you are looking for does not exist or has been moved. Return to
          the homepage to explore tuition offerings and contact details.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm !py-2.5 !px-5"
          >
            <Home size={16} />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/contact"
            className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm !py-2.5 !px-5"
          >
            <ArrowLeft size={16} />
            <span>Contact &amp; Inquiries</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
