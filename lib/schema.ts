import z from "zod";

export const ZSignIn = z.object({
    email: z.string().min(1, 'Username/Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
});

export const ZSignUp = z.object({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
});