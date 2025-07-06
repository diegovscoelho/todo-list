import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { registerUserSchema, loginUserSchema } from '../dtos/auth.dto';

export const register = async (req: Request, res: Response) => {
    try {
        const userData = registerUserSchema.parse(req.body);

        const newUser = await authService.registerUser(userData);

        return res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            user: newUser
        });

    } catch (error: any) {
        if (error.issues) {
            return res.status(400).json({ message: 'Dados inválidos.', errors: error.issues });
        }
        if (error.message === 'Email ou nome de usuário já cadastrado.') {
            return res.status(409).json({ message: error.message });
        }
        console.error('Erro no controller de registro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const userData = loginUserSchema.parse(req.body);

        const token = await authService.loginUser(userData);

        return res.status(200).json({
            message: 'Login bem-sucedido!',
            token: token
        });

    } catch (error: any) {
        if (error.issues) {
            return res.status(400).json({ message: 'Credenciais inválidas.', errors: error.issues });
        }
        if (error.message === 'Credenciais inválidas.') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erro no controller de login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor ao realizar login.' });
    }
};