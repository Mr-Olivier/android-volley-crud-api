"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [stats, setStats] = useState({
    totalAuthors: 0,
    totalBooks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [authorsRes, booksRes] = await Promise.all([
        fetch("/api/authors"),
        fetch("/api/books"),
      ]);

      const authors = await authorsRes.json();
      const books = await booksRes.json();

      setStats({
        totalAuthors: authors.length,
        totalBooks: books.length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">📚 Book Library Manager</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Manage your book collection and authors in one place
        </p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <p className="text-center">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {/* Authors Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Authors</h2>
              <span className="text-5xl">👤</span>
            </div>
            <p className="text-4xl font-bold mb-4">{stats.totalAuthors}</p>
            <Link
              href="/authors"
              className="inline-block bg-white text-blue-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              View All Authors
            </Link>
          </div>

          {/* Books Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-lg p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Books</h2>
              <span className="text-5xl">📖</span>
            </div>
            <p className="text-4xl font-bold mb-4">{stats.totalBooks}</p>
            <Link
              href="/books"
              className="inline-block bg-white text-green-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              View All Books
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/authors/create"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition text-center"
          >
            <span className="text-4xl mb-3 block">➕👤</span>
            <h3 className="text-xl font-semibold mb-2">Add New Author</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create a new author profile
            </p>
          </Link>

          <Link
            href="/books/create"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition text-center"
          >
            <span className="text-4xl mb-3 block">➕📚</span>
            <h3 className="text-xl font-semibold mb-2">Add New Book</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Add a book to your library
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
