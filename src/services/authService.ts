import { PrismaClient } from '@prisma/client';
import { comparePassword, hashPassword } from '../utils/auth';
import { CreateUserDto, LoginUserDto } from '../dtos/auth.dto';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();

export const registerUser = async (userData: CreateUserDto) => {
    const { email, password, username } = userData;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (existingUser) {
            throw new Error('Email ou nome de usuário já cadastrado.');
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        return newUser;

    } catch (error: any) {
        console.error('Erro no registro do usuário:', error.message);
        throw error;
    }
};

export const loginUser = async (credentials: LoginUserDto) => {
    const { email, password } = credentials;
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email,
            }
        });

        if (!existingUser) {
            throw new Error('Credenciais inválidas.');
        }

        const isPasswordValid = await comparePassword(password, existingUser.password); 

        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas.');
        }

        const token = generateToken({ id: existingUser.id });

        return token;

    } catch (error: any) {
        console.error('Erro no login do usuário:', error.message);
        throw error;
    }
};