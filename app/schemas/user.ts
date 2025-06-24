import { z } from 'zod'

export const schemaLogin = z.object({
    email: z
        .string({
            message: 'El Correo es obligatorio'
        })
        .min(1, {
            message: 'El Correo es obligatorio'
        })
        .email({
            message: 'El formato del correo es incorrecto'
        }),
    password: z
        .string({
            message: 'La contraseña es obligatorio'
        })
        .min(6, {
            message: 'La contraseña debe tener al menos 6 caracteres'
        })
})



export const schemaStateStore = z.object({
    isLoggedIn: z.boolean(),
    user: z.object({}).catchall(z.any()).nullable().optional(),
    isLoading: z.boolean().optional(),
})

export const schemaActionStore = z.object({
    setIsLoggedIn: z.function().args(z.boolean()).returns(z.void()).optional(),
    setUser: z.function().args(z.object({}).catchall(z.any())).returns(z.void()).optional(),
    logout: z.function().returns(z.void()).optional(),
    setIsLoading: z.function().args(z.boolean()).returns(z.void()).optional()
})

export const schemaUser = z.object({
    email: z.string(), 
    password: z.string(), 
    userId: z.number() ,
})


export type StateStore = z.infer<typeof schemaStateStore>
export type ActionStore = z.infer<typeof schemaActionStore>
export type User = z.infer<typeof schemaUser>
