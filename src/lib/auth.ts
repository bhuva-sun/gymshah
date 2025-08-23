import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

export const authConfig: NextAuthConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Google,
		GitHub,
		Credentials({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});
				if (!user?.passwordHash) return null;
				const ok = await compare(credentials.password, user.passwordHash);
				if (!ok) return null;
				return { id: user.id, name: user.name ?? null, email: user.email ?? null, image: user.image ?? null };
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			// Create welcome notification on first sign-in
			try {
				const existing = await prisma.notification.findFirst({ where: { userId: user.id, title: "Welcome to GymShah" } });
				if (!existing) {
					await prisma.notification.create({ data: { userId: user.id as string, title: "Welcome to GymShah", body: "Thanks for signing in!" } });
				}
			} catch (_) {}
			return true;
		},
		async session({ session, token, user }) {
			if (session.user) {
				(session.user as any).id = user?.id ?? token.sub;
				(session.user as any).role = (user as any)?.role ?? (token as any).role ?? "USER";
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				(token as any).role = (user as any).role ?? "USER";
			}
			return token;
		},
	},
	// Use JWT strategy; NextAuth manages cookie securely in production
	session: { strategy: "jwt" },
	debug: process.env.NODE_ENV === "development",
	trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);


