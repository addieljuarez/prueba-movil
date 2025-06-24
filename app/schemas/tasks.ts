import { z } from 'zod';

export const schemaTask = z.object({
    userId: z.number().optional(),
    id: z.number().optional(),
    title: z.string().optional(),
    completed: z.boolean().optional()
})


export const shemaTaskStore = z.object({
    data: z.array(schemaTask).optional(),
    loading: z.boolean().optional(),
    error: z.boolean().optional(),
    errorData: z.null().optional(),
    success: z.boolean().optional(),
    limit: z.number().optional(),
    setData: z.function().args(z.array(schemaTask)).returns(z.void()),
    setLoading: z.function().args(z.boolean()).returns(z.void()),
    setError: z.function().args(z.boolean()).returns(z.void()),
    setErrorData: z.function().args(z.null()).returns(z.void()),
    setSuccess: z.function().args(z.boolean()).returns(z.void()),
    setLimit: z.function().args(z.number()).returns(z.void()),
    resetState: z.function().returns(z.void())
})

export type Task = z.infer<typeof schemaTask>
export type StoreTask = z.infer<typeof shemaTaskStore>
