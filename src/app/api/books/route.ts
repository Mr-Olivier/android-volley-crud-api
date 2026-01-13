import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// GET /api/books - Get all books with author info
export async function GET() {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let title,
      isbn,
      publishedYear,
      description,
      authorId,
      coverFile = null;

    // Handle JSON (from Android)
    if (contentType.includes("application/json")) {
      const body = await request.json();
      title = body.title;
      isbn = body.isbn;
      publishedYear = body.publishedYear;
      description = body.description;
      authorId = body.authorId;
      // No image upload from Android
    }
    // Handle FormData (from web)
    else if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await request.formData();
      title = formData.get("title") as string;
      isbn = formData.get("isbn") as string;
      publishedYear = formData.get("publishedYear") as string;
      description = formData.get("description") as string;
      authorId = formData.get("authorId") as string;
      coverFile = formData.get("coverImage") as File | null;
    } else {
      return NextResponse.json(
        {
          error:
            "Invalid Content-Type. Use application/json or multipart/form-data",
        },
        { status: 400 }
      );
    }

    // Validation
    if (!title || !isbn || !publishedYear || !authorId) {
      return NextResponse.json(
        { error: "Title, ISBN, published year, and author are required" },
        { status: 400 }
      );
    }

    let coverImagePath = null;

    // Handle cover image upload (only from web FormData)
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
    }

    // Create book in database
    const book = await prisma.book.create({
      data: {
        title,
        isbn,
        publishedYear:
          typeof publishedYear === "string"
            ? parseInt(publishedYear)
            : publishedYear,
        description: description || null,
        coverImage: coverImagePath,
        authorId,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error: any) {
    console.error("Error creating book:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "ISBN already exists" },
        { status: 409 }
      );
    }

    if (error.code === "P2003") {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}
