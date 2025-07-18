import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(8),
})
export type LoginDto = z.input<typeof loginSchema>
