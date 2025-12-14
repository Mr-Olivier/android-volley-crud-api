import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// GET /api/books/[id] - Get single book with author details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
      include: {
        author: true,
      },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}

// PUT /api/books/[id] - Update book
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const isbn = formData.get("isbn") as string;
    const publishedYear = formData.get("publishedYear") as string;
    const description = formData.get("description") as string;
    const authorId = formData.get("authorId") as string;
    const coverFile = formData.get("coverImage") as File | null;
    const keepCurrentCover = formData.get("keepCurrentCover") as string;

    // Validation
    if (!title || !isbn || !publishedYear || !authorId) {
      return NextResponse.json(
        { error: "Title, ISBN, published year, and author are required" },
        { status: 400 }
      );
    }

    let coverImagePath: string | null = null;

    // Handle cover image upload
    if (coverFile && coverFile.size > 0) {
      const bytes = await coverFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = `book-${uniqueSuffix}${path.extname(coverFile.name)}`;
      const filepath = path.join(
        process.cwd(),
        "public/uploads/books",
        filename
      );

      await writeFile(filepath, buffer);
      coverImagePath = `/uploads/books/${filename}`;
    } else if (keepCurrentCover === "true") {
      // Keep existing cover
      const currentBook = await prisma.book.findUnique({
        where: { id: params.id },
        select: { coverImage: true },
      });
      coverImagePath = currentBook?.coverImage || null;
    }

    // Update book in database
    const book = await prisma.book.update({
      where: { id: params.id },
      data: {
        title,
        isbn,
        publishedYear: parseInt(publishedYear),
        description: description || null,
        authorId,
        ...(coverImagePath !== null && { coverImage: coverImagePath }),
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(book, { status: 200 });
  } catch (error: any) {
    console.error("Error updating book:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "ISBN already exists" },
        { status: 409 }
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}

// DELETE /api/books/[id] - Delete book
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.book.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting book:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 }
    );
  }
}
