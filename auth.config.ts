import type { NextAuthConfig } from "next-auth";

export default {
  providers: [],
  pages: {
    signIn: "/",
    error: "/"
  }
} satisfies NextAuthConfig;