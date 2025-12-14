"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CreateAuthorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/authors", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/authors");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create author");
      }
    } catch (error) {
      console.error("Error creating author:", error);
      alert("Error creating author");
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center mb-8">
        <Link
          href="/authors"
          className="text-blue-600 hover:text-blue-700 mr-4"
        >
          ← Back
        </Link>
        <h1 className="text-3xl font-bold">Create New Author</h1>
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
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author name"
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
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            placeholder="author@example.com"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-2">Biography</label>
          <textarea
            name="bio"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            placeholder="Write a short bio..."
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={128}
              height={128}
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
            {loading ? "Creating..." : "Create Author"}
          </button>
          <Link
            href="/authors"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
