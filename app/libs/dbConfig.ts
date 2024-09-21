import prisma from "@/app/libs/Prismadb";

export const connectDB = async (): Promise<void> => {
  try {
    // Prisma Client automatically handles the connection
    await prisma.$connect(); // Connects to the database
    console.log("MongoDB connected");
  } catch (error: any) {
    console.error("MongoDB not connected: " + error.message);
    process.exit(1);
  }
};
