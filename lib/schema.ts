import z from "zod";

export const ZSignIn = z.object({
    email: z.email(),
    password: z.string().min(8)
});

export const ZSignUp = z.object({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
});