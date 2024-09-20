import { PrismaClient } from "@prisma/client";

// Add a check to ensure that the Prisma client is not recreated unnecessarily.
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
    }
    prisma = (global as any).prisma;
}

export default prisma;
