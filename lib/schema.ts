import z from "zod";

export const ZSignIn = z.object({
    email: z.string().min(1, 'Username/Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
});

export const ZSignUp = z
  .object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const ZAIArea = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  file: z
    .object({
      name: z.string(),
      uploaded: z.boolean(),
      url: z.string().nullable(),
    })
    .nullable()
});