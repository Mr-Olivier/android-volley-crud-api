"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Toast from "../../../components/ui/Toast";

type Author = {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  photo: string | null;
};

type ToastType = {
  message: string;
  type: "success" | "error" | "info";
} | null;

export default function EditAuthorPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState<Author | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastType>(null);

  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = async () => {
    try {
      const response = await fetch(`/api/authors/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setAuthor(data);
        setPreview(data.photo);
      } else {
        setToast({ message: "Author not found", type: "error" });
        setTimeout(() => router.push("/authors"), 2000);
      }
    } catch (error) {
      console.error("Error fetching author:", error);
      setToast({ message: "Error loading author", type: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // If no new photo selected, keep current photo
    if (!formData.get("photo") || (formData.get("photo") as File).size === 0) {
      formData.set("keepCurrentPhoto", "true");
    }

    try {
      const response = await fetch(`/api/authors/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setToast({ message: "Author updated successfully!", type: "success" });
        setTimeout(() => router.push("/authors"), 1500);
      } else {
        const error = await response.json();
        setToast({
          message: error.error || "Failed to update author",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error updating author:", error);
      setToast({ message: "Error updating author", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!author) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center mb-8">
        <Link
          href="/authors"
          className="text-blue-600 hover:text-blue-700 mr-4"
        >
          ← Back
        </Link>
        <h1 className="text-3xl font-bold">Edit Author</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            defaultValue={author.name}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            defaultValue={author.email}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-2">Biography</label>
          <textarea
            name="bio"
            rows={4}
            defaultValue={author.bio || ""}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Photo{" "}
            {preview && (
              <span className="text-sm text-gray-500">
                (Leave empty to keep current)
              </span>
            )}
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-32 h-32 rounded-full object-cover mx-auto"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Author"}
          </button>
          <Link
            href="/authors"
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
