import NextAuth, { CredentialsSignin } from "next-auth";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { ZSignIn } from "./lib/schema";
import { JWT } from "next-auth/jwt";
import { getProfileByEmail, newProfile } from "./lib/actions";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
};

export class InvalidLoginError extends CredentialsSignin {
  code = "Invalid email or password";
}

export const { handlers, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        signIn: { label: "Sign In", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials) throw new InvalidLoginError();

        const isSignIn = credentials.signIn === "true";
        const data = { email: credentials.email, password: credentials.password };
        
        const validatedData = ZSignIn.safeParse(data);
        if (!validatedData.success) throw new InvalidLoginError();

        const { email, password } = validatedData.data;

        try {
          if (isSignIn) {
            const profile = await getProfileByEmail(email);
            if (!profile) throw new InvalidLoginError();

            const isPasswordValid = await bcrypt.compare(password, profile.password);
            if (!isPasswordValid) throw new InvalidLoginError();

            return {
              id: profile.id,
              email: profile.email,
              name: profile.username,
              image: profile.avatar,
            };
          } else {
            const profile = await newProfile(email, password);
            return {
              id: profile.id,
              email: profile.email,
              name: profile.username,
              image: profile.avatar,
            };
          }
        } catch (error) {
          if (error instanceof InvalidLoginError) throw error;
          throw new Error("Internal server error");
        }
      },
    }),
    ...authConfig.providers,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
