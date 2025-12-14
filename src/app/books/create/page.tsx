"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Author = {
  id: string;
  name: string;
};

export default function CreateBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

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
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/books");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create book");
      }
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Error creating book");
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center mb-8">
        <Link href="/books" className="text-blue-600 hover:text-blue-700 mr-4">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold">Create New Book</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
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
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          {authors.length === 0 && (
            <p className="text-sm text-red-500 mt-1">
              No authors found.{" "}
              <Link href="/authors/create" className="underline">
                Create one first
              </Link>
            </p>
          )}
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
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            placeholder="978-0000000000"
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
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            placeholder="2024"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            placeholder="Write a description of the book..."
          />
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleCoverChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={128}
              height={128}
              className="mt-4 w-48 h-64 object-cover mx-auto rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || authors.length === 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Book"}
          </button>
          <Link
            href="/books"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
