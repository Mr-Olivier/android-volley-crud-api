import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// GET /api/authors/[id] - Get single author with books
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const author = await prisma.author.findUnique({
      where: { id: params.id },
      include: {
        books: {
          orderBy: {
            publishedYear: "desc",
          },
        },
      },
    });

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json(author, { status: 200 });
  } catch (error) {
    console.error("Error fetching author:", error);
    return NextResponse.json(
      { error: "Failed to fetch author" },
      { status: 500 }
    );
  }
}

// PUT /api/authors/[id] - Update author
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    const photoFile = formData.get("photo") as File | null;
    const keepCurrentPhoto = formData.get("keepCurrentPhoto") as string;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    let photoPath: string | null = null;

    // Handle photo upload
    if (photoFile && photoFile.size > 0) {
      const bytes = await photoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = `author-${uniqueSuffix}${path.extname(photoFile.name)}`;
      const filepath = path.join(
        process.cwd(),
        "public/uploads/authors",
        filename
      );

      await writeFile(filepath, buffer);
      photoPath = `/uploads/authors/${filename}`;
    } else if (keepCurrentPhoto === "true") {
      // Keep existing photo - don't update it
      const currentAuthor = await prisma.author.findUnique({
        where: { id: params.id },
        select: { photo: true },
      });
      photoPath = currentAuthor?.photo || null;
    }

    // Update author in database
    const author = await prisma.author.update({
      where: { id: params.id },
      data: {
        name,
        email,
        bio: bio || null,
        ...(photoPath !== null && { photo: photoPath }),
      },
    });

    return NextResponse.json(author, { status: 200 });
  } catch (error: any) {
    console.error("Error updating author:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update author" },
      { status: 500 }
    );
  }
}

// DELETE /api/authors/[id] - Delete author
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.author.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Author deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting author:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to delete author" },
      { status: 500 }
    );
  }
}
