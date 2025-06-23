import { z } from 'zod';

export const schemaTask = z.object({
    userId: z.number().optional(),
    id: z.number().optional(),
    title: z.string().optional(),
    completed: z.boolean().optional()
})

export type Task = z.infer<typeof schemaTask>
