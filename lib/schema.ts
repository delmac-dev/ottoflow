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

export const ZProfileDetails = z.object({
  email: z.email(),
  username: z.string()
    .min(4, "Username must be at least 4 characters long")
    .max(14, "Username must be at most 14 characters long"),
  avatar: z.string().min(3, "Avatar must be at least 3 characters long"),
});

export const ZChangePassword = z.object({
  old: z.string().min(8, "Old password must be at least 8 characters long"),
  new: z.string().min(8, "New password must be at least 8 characters long"),
  confirm: z.string().min(8, "Confirm password must be at least 8 characters long"),
}).refine((data) => data.new === data.confirm, {
  message: "New password and confirm password must match",
  path: ["confirm"],
});

export const ZNewProject = z.object({
  name: z.string()
    .min(2, "Project name must be at least 2 characters long")
    .max(100, "Project name must be at most 100 characters long"),
});

export const ZEditProjectName = z.object({
  name: z.string()
    .min(2, "Project name must be at least 2 characters long")
    .max(100, "Project name must be at most 100 characters long"),
});
