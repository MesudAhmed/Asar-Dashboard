import { z } from 'zod'
import { CalendarDate } from '@internationalized/date'

export const registerUserSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  gender: z.enum(['male', 'female', 'other']).optional(),
  birthDate: z.instanceof(CalendarDate, { message: 'Birth date is required' }),
  profileImage: z.string().nullable().optional(),
})

export type RegisterDto = z.input<typeof registerUserSchema>
