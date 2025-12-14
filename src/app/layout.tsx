import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "./components/providers/ThemeProvider";
import ThemeToggle from "./components/ui/ThemeToggle"; // Default import
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book Library Manager",
  description: "Manage your book collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {/* Navigation */}
          <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="text-xl font-bold">
                  📚 Library
                </Link>

                <div className="flex items-center gap-6">
                  <Link
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Home
                  </Link>
                  <Link
                    href="/authors"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Authors
                  </Link>
                  <Link
                    href="/books"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Books
                  </Link>

                  {/* Theme Toggle */}
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
            <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
              <p>Book Library Manager © 2024</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
