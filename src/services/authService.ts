import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/auth';

const prisma = new PrismaClient();

export const registerUser = async (userData: any /* Implementar RegisterUserDto */) => {
    // 1. Desestruturar dados (email, password, etc.)
    // 2. Verificar se usuário com este email/username já existe
    // 3. Gerar o hash da senha
    // 4. Criar o usuário no DB usando prisma.user.create
    // 5. Retornar dados do usuário (sem a senha)
};