import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// GET /api/authors - Get all authors
export async function GET() {
  try {
    const authors = await prisma.author.findMany({
      include: {
        books: true, // Include books count
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(authors, { status: 200 });
  } catch (error) {
    console.error("Error fetching authors:", error);
    return NextResponse.json(
      { error: "Failed to fetch authors" },
      { status: 500 }
    );
  }
}

// POST /api/authors - Create new author
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    const photoFile = formData.get("photo") as File | null;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    let photoPath = null;

    // Handle photo upload
    if (photoFile && photoFile.size > 0) {
      const bytes = await photoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = `author-${uniqueSuffix}${path.extname(photoFile.name)}`;
      const filepath = path.join(
        process.cwd(),
        "public/uploads/authors",
        filename
      );

      // Save file
      await writeFile(filepath, buffer);
      photoPath = `/uploads/authors/${filename}`;
    }

    // Create author in database
    const author = await prisma.author.create({
      data: {
        name,
        email,
        bio: bio || null,
        photo: photoPath,
      },
    });

    return NextResponse.json(author, { status: 201 });
  } catch (error: any) {
    console.error("Error creating author:", error);

    // Handle unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create author" },
      { status: 500 }
    );
  }
}
