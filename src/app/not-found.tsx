"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Film, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 20000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="container mx-auto py-20 md:py-28 text-center">
          <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 md:p-12 transition-colors">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 dark:bg-red-900/20 mb-8 border-4 border-red-100 dark:border-red-900/40">
              <Film className="w-12 h-12 text-red-500 dark:text-red-400" />
            </div>

            {/* 404 Number */}
            <div className="mb-4">
              <span className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 bg-clip-text text-transparent">
                404
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Page Not Found
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Looks like this scene didn&apos;t make the final cut. The page
              you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <Link
                href="/browse/movies"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Film className="w-5 h-5 mr-2" />
                Browse Movies
              </Link>
            </div>

            {/* Countdown Timer */}
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <Clock className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Redirecting in{" "}
                <strong className="text-red-500 dark:text-red-400">
                  {countdown}s
                </strong>
              </span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"
                style={{
                  animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
