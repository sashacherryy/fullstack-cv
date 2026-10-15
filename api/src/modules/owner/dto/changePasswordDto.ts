import { z } from 'zod'

export const changePasswordDto = z.object({
    currentPassword: z.string()
                    .min(1, "Має бути хоча б 1 символ")
                    .max(32, "Значення має бути до 32 символів")

    , newPassword: z.string()
                    .min(8, "Має бути хоча б 8 символів")
                    .max(32, "Значення має бути до 32 символів")
                    .regex(/[A-Z]/, "Відсутня велика літера")
                    .regex(/[a-z]/, "Відсутня маленька літера")
                    .regex(/[0-9]/, "Відсутнє число")
})
.strict()
.refine(
    (val) => val.currentPassword !== val.newPassword, 
    {
    message: 'Паролі не мають співпадати',
    path: ["newPassword"]
})
