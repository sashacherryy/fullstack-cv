import { z } from 'zod'

export const ZodEnvSchema = z.object({
    PORT : z.coerce.number()
                .int()
                .min(1)
                .max(65535)

    , CV_ORIGIN: z.url()

    , DATABASE_URL: z.string()
                .min(1)

    , JWT_SECRET: z.string()
                .min(16)

    , THROTTLER_TTL: z.coerce.number()
                .int()
                .min(1)

    , THROTTLER_LIMIT: z.coerce.number()
                .int()
                .min(1)
})