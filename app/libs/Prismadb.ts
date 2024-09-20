import { PrismaClient } from '@prisma/client';

// Declare a global variable to hold the Prisma client instance.
declare global {
    var prisma: PrismaClient | undefined;
}

// Initialize the Prisma client instance, reusing it in development to avoid multiple instances.
const prisma = global.prisma || new PrismaClient();

// Store the instance in the global variable for development.
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

export default prisma;
