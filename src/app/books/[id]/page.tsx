"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Book = {
  id: string;
  title: string;
  isbn: string;
  publishedYear: number;
  coverImage: string | null;
  description: string | null;
  author: {
    id: string;
    name: string;
    email: string;
    bio: string | null;
  };
};

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setBook(data);
      } else {
        alert("Book not found");
        router.push("/books");
      }
    } catch (error) {
      console.error("Error fetching book:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`/api/books/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/books");
      } else {
        alert("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Error deleting book");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-8">
        <Link href="/books" className="text-blue-600 hover:text-blue-700 mr-4">
          ← Back to Books
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Cover Image */}
          <div className="md:w-1/3">
            {book.coverImage ? (
              <Image
                src={book.coverImage}
                alt={book.title}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-8xl">📚</span>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>

            <div className="space-y-3 mb-6">
              <p className="text-lg">
                <span className="font-semibold">Author:</span>{" "}
                <Link
                  href={`/authors`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {book.author.name}
                </Link>
              </p>
              <p>
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p>
              <p>
                <span className="font-semibold">Published:</span>{" "}
                {book.publishedYear}
              </p>
            </div>

            {book.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {book.description}
                </p>
              </div>
            )}

            {book.author.bio && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">About the Author</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {book.author.bio}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
              >
                Delete Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
