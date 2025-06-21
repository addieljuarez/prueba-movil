import { z } from 'zod'

export const schemaLogin = z.object({
    email: z
        .string({
            message: 'El Correo es obligatorio'
        })
        .min(1, {
            message: 'El Correo es obligatorio'
        })
        .email(),
    password: z
        .string({
            message: 'La contraseña es obligatorio'
        })
        .min(1, {
            message: 'La contraseña es obligatorio'
        })
})