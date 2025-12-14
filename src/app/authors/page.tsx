"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Toast from "../components/ui/Toast";
import ConfirmModal from "../components/ui/ConfirmModal";

type Author = {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  photo: string | null;
  books: any[];
};

type ToastType = {
  message: string;
  type: "success" | "error" | "info";
} | null;

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<ToastType>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    authorId: string | null;
  }>({
    isOpen: false,
    authorId: null,
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch("/api/authors");
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
      setToast({ message: "Failed to load authors", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteModal({ isOpen: true, authorId: id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.authorId) return;

    try {
      const response = await fetch(`/api/authors/${deleteModal.authorId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setToast({ message: "Author deleted successfully!", type: "success" });
        fetchAuthors();
      } else {
        setToast({ message: "Failed to delete author", type: "error" });
      }
    } catch (error) {
      console.error("Error deleting author:", error);
      setToast({ message: "Error deleting author", type: "error" });
    } finally {
      setDeleteModal({ isOpen: false, authorId: null });
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
        <h1 className="text-3xl font-bold">Authors</h1>
        <Link
          href="/authors/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Add New Author
        </Link>
      </div>

      {authors.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No authors found. Create your first author!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div
              key={author.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              {author.photo ? (
                <img
                  src={author.photo}
                  alt={author.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-4xl text-gray-600 dark:text-gray-400">
                    {author.name.charAt(0)}
                  </span>
                </div>
              )}

              <h2 className="text-xl font-semibold text-center mb-2">
                {author.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
                {author.email}
              </p>
              {author.bio && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                  {author.bio}
                </p>
              )}

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {author.books.length} book(s)
                </span>
                <div className="flex gap-2">
                  <Link
                    href={`/authors/edit/${author.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(author.id)}
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

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Author"
        message="Are you sure you want to delete this author? This will also delete all their books."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ isOpen: false, authorId: null })}
      />
    </div>
  );
}
