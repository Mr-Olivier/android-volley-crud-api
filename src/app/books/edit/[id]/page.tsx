"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Toast from "../../../components/ui/Toast";

type Book = {
  id: string;
  title: string;
  isbn: string;
  publishedYear: number;
  coverImage: string | null;
  description: string | null;
  authorId: string;
};

type Author = {
  id: string;
  name: string;
};

type ToastType = {
  message: string;
  type: "success" | "error" | "info";
} | null;

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastType>(null);

  useEffect(() => {
    fetchBook();
    fetchAuthors();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setBook(data);
        setPreview(data.coverImage);
      } else {
        setToast({ message: "Book not found", type: "error" });
        setTimeout(() => router.push("/books"), 2000);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
      setToast({ message: "Error loading book", type: "error" });
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch("/api/authors");
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // If no new cover selected, keep current
    if (
      !formData.get("coverImage") ||
      (formData.get("coverImage") as File).size === 0
    ) {
      formData.set("keepCurrentCover", "true");
    }

    try {
      const response = await fetch(`/api/books/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setToast({ message: "Book updated successfully!", type: "success" });
        setTimeout(() => router.push("/books"), 1500);
      } else {
        const error = await response.json();
        setToast({
          message: error.error || "Failed to update book",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error updating book:", error);
      setToast({ message: "Error updating book", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center mb-8">
        <Link href="/books" className="text-blue-600 hover:text-blue-700 mr-4">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold">Edit Book</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={book.title}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Author <span className="text-red-500">*</span>
          </label>
          <select
            name="authorId"
            required
            defaultValue={book.authorId}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        {/* ISBN */}
        <div>
          <label className="block text-sm font-medium mb-2">
            ISBN <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="isbn"
            required
            defaultValue={book.isbn}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Published Year */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Published Year <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="publishedYear"
            required
            min="1000"
            max={new Date().getFullYear()}
            defaultValue={book.publishedYear}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={book.description || ""}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Cover Image{" "}
            {preview && (
              <span className="text-sm text-gray-500">
                (Leave empty to keep current)
              </span>
            )}
          </label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleCoverChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-48 h-64 object-cover mx-auto rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Book"}
          </button>
          <Link
            href="/books"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-center"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
