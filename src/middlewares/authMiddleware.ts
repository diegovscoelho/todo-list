import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação ausente ou mal formatado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);

        req.userId = decoded.id;

        next();

    } catch (error: any) {
        console.error('Erro de autenticação:', error.message);
        return res.status(401).json({ message: error.message });
    }
};