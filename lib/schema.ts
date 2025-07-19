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

export const ZPromptAI = z.object({
  prompt: z.string(),
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        return allowedTypes.includes(file.type);
      },
      'File must be an image or PDF'
    ).nullable()
});