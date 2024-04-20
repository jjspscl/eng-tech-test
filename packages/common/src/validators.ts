import z from 'zod';

export const dutySchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(3).max(32),
    completed: z.boolean().default(false),
});