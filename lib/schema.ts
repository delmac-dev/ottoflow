import z from "zod";

export const ZProjectFilter = z.object({
    search: z.string().optional(),
    category: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
    sort: z.object({
        name: z.boolean().optional(),
        createdAt: z.boolean().optional(),
        updatedAt: z.boolean().optional(),
    }).optional(),
});