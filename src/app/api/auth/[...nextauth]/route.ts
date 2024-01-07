import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/auth-actions";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "jsmith@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const user = await signInEmailPassword(
                    credentials!.email,
                    credentials!.password
                );

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                }
                return null;
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },

        async jwt({ token, user, account, profile }) {
            const dbUser = await prisma.user.findUnique({
                where: { email: token.email ?? "no email" },
            });

            if (dbUser?.isActive === false) {
                throw Error("Usuario no está activo");
            }

            token.roles = dbUser?.roles ?? ["no-roles"];
            token.id = dbUser?.id ?? "no-uuid";
            return token;
        },

        async session({ session, user, token }) {
            if (session && session.user) {
                session.user.roles = token.roles;
                session.user.id = token.id;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
