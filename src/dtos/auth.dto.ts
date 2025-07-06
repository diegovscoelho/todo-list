import { z } from 'zod';

export const registerUserSchema = z.object({
    username: z.string()
               .min(3, "Nome de usuário deve ter pelo menos 3 caracteres.")
               .max(50, "Nome de usuário não pode exceder 50 caracteres."),
    email: z.string()
            .email("Formato de e-mail inválido.")
            .max(100, "E-mail não pode exceder 100 caracteres."),
    password: z.string()
               .min(6, "A senha deve ter pelo menos 6 caracteres.")
               .max(100, "A senha não pode exceder 100 caracteres.")
               .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Senha muito fraca.")
});

export type CreateUserDto = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
    email: z.string()
            .email("Formato de e-mail inválido."),
    password: z.string()
               .min(1, "A senha é obrigatória.") 
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;