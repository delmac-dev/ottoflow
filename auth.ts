import NextAuth, { CredentialsSignin } from "next-auth";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { ZSignIn } from "./lib/schema";
import { JWT } from "next-auth/jwt";
import { getProfileByEmail } from "./lib/actions";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
};

export class InvalidLoginError extends CredentialsSignin {
  code= "Invalid email or password";
}

export const { handlers, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials ) => {
        const data = {email: credentials.email, password: credentials.password}
        
        const validatedData = ZSignIn.safeParse(data);

        if (!validatedData.success) throw new InvalidLoginError();

        const { email, password } = validatedData.data;

        try {
          const profile = await getProfileByEmail(email);
          if (!profile) throw new InvalidLoginError();

          // const isPasswordValid = await bcrypt.compare(
          //   password,
          //   profile.password
          // ); //delmac@123

          // if (!isPasswordValid) throw new InvalidLoginError();

          return {
            id: profile.id,
            email: profile.email,
            name: profile.username,
            image: profile.avatar
          };

        } catch (error) {
          console.log("passed",error)
          throw new InvalidLoginError();
        }
      },
    }),
    ...authConfig.providers,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id || "",
          email: token.email || "",
          name: token.name,
          emailVerified: new Date(),
          image: token.picture
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
