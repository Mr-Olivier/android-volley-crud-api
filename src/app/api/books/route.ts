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

// POST /api/books - Create new book with cover image
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const isbn = formData.get("isbn") as string;
    const publishedYear = formData.get("publishedYear") as string;
    const description = formData.get("description") as string;
    const authorId = formData.get("authorId") as string;
    const coverFile = formData.get("coverImage") as File | null;

    // Validation
    if (!title || !isbn || !publishedYear || !authorId) {
      return NextResponse.json(
        { error: "Title, ISBN, published year, and author are required" },
        { status: 400 }
      );
    }

    let coverImagePath = null;

    // Handle cover image upload
    if (coverFile && coverFile.size > 0) {
      const bytes = await coverFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = `book-${uniqueSuffix}${path.extname(coverFile.name)}`;
      const filepath = path.join(
        process.cwd(),
        "public/uploads/books",
        filename
      );

      // Save file
      await writeFile(filepath, buffer);
      coverImagePath = `/uploads/books/${filename}`;
    }

    // Create book in database
    const book = await prisma.book.create({
      data: {
        title,
        isbn,
        publishedYear: parseInt(publishedYear),
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

    // Handle unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "ISBN already exists" },
        { status: 409 }
      );
    }

    // Handle foreign key constraint
    if (error.code === "P2003") {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 }
    );
  }
}
