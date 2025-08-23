import { PrismaClient } from "@/generated/prisma";

declare global {
	// eslint-disable-next-line no-var
	var cachedPrisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = global.cachedPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") global.cachedPrisma = prisma;


