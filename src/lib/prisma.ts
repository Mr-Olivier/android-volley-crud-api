import { PrismaClient } from "@prisma/client";

/**
 * Global Prisma client instance for Next.js
 * Prevents multiple instances in development due to hot reloading
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Gracefully disconnect Prisma on app termination
 */
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
