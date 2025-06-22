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