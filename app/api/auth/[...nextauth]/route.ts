import NextAuth from "next-auth"
import { authOptions } from "@/app/libs/config/authOptions";

// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import prisma from "@/app/libs/Prismadb"
// import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
// import Credentials from "next-auth/providers/credentials"
// import bcrypt from "bcrypt"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };