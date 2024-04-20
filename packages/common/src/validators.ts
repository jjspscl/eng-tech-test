import z from 'zod';

export const dutySchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    completed: z.boolean().default(false),
});