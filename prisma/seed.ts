import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.book.deleteMany();
  await prisma.author.deleteMany();


  const author1 = await prisma.author.create({
    data: {
      name: "J.K. Rowling",
      email: "jk.rowling@books.com",
      bio: "British author, best known for the Harry Potter series",
      photo: "/uploads/authors/jk-rowling.jpg",
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: "George Orwell",
      email: "g.orwell@books.com",
      bio: "English novelist and essayist, journalist and critic",
      photo: "/uploads/authors/george-orwell.jpg",
    },
  });

  // Create Books
  await prisma.book.create({
    data: {
      title: "Harry Potter and the Philosopher's Stone",
      isbn: "978-0747532699",
      publishedYear: 1997,
      description: "The first novel in the Harry Potter series",
      coverImage: "/uploads/books/hp1.jpg",
      authorId: author1.id,
    },
  });

  await prisma.book.create({
    data: {
      title: "1984",
      isbn: "978-0451524935",
      publishedYear: 1949,
      description: "A dystopian social science fiction novel",
      coverImage: "/uploads/books/1984.jpg",
      authorId: author2.id,
    },
  });

  await prisma.book.create({
    data: {
      title: "Animal Farm",
      isbn: "978-0452284244",
      publishedYear: 1945,
      description: "An allegorical novella about Soviet Russia",
      coverImage: "/uploads/books/animal-farm.jpg",
      authorId: author2.id,
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
