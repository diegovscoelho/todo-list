import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
}

/**
 * Gera um token JWT para um determinado payload.
 * @param payload Objeto com os dados a serem incluídos no token (geralmente o ID do usuário).
 * @returns O token JWT gerado como uma string.
 * @throws Erro se JWT_SECRET não estiver definido nas variáveis de ambiente.
 */
export const generateToken = (payload: JwtPayload): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
    }
    const secret = process.env.JWT_SECRET;
    const expiresIn = '1h';

    if (!secret) {
        // É crucial que a chave secreta esteja definida!
        throw new Error('JWT_SECRET not defined in environment variables. Please set it in your .env file.');
    }

    return jwt.sign(payload, secret as string, { expiresIn: expiresIn });
};

/**
 * Verifica e decodifica um token JWT.
 * @param token O token JWT a ser verificado.
 * @returns O payload decodificado do token.
 * @throws Erro se JWT_SECRET não estiver definido ou se o token for inválido/expirado.
 */
export const verifyToken = (token: string): JwtPayload => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET not defined in environment variables. Please set it in your .env file.');
    }

    try {
        const decoded = jwt.verify(token, secret as string) as JwtPayload;
        return decoded;
    } catch (error: any) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token expirado.');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Token inválido.');
        }
        throw new Error('Erro na verificação do token.');
    }
};