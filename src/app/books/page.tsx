"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Toast from "../components/ui/Toast";
import ConfirmModal from "../components/ui/ConfirmModal";

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
  };
};

type ToastType = {
  message: string;
  type: "success" | "error" | "info";
} | null;

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<ToastType>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    bookId: string | null;
  }>({
    isOpen: false,
    bookId: null,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setToast({ message: "Failed to load books", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteModal({ isOpen: true, bookId: id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.bookId) return;

    try {
      const response = await fetch(`/api/books/${deleteModal.bookId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setToast({ message: "Book deleted successfully!", type: "success" });
        fetchBooks();
      } else {
        setToast({ message: "Failed to delete book", type: "error" });
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      setToast({ message: "Error deleting book", type: "error" });
    } finally {
      setDeleteModal({ isOpen: false, bookId: null });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Books</h1>
        <Link
          href="/books/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No books found. Create your first book!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-6xl text-gray-600 dark:text-gray-400">
                    📚
                  </span>
                </div>
              )}

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {book.title}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  by {book.author.name}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
                  {book.publishedYear} • ISBN: {book.isbn}
                </p>

                {book.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                    {book.description}
                  </p>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={`/books/edit/${book.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(book.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Book"
        message="Are you sure you want to delete this book?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, bookId: null })}
      />
    </div>
  );
}
