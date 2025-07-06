import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Gera um hash para a senha fornecida.
 * @param password Senha em texto puro
 * @returns Hash da senha
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara uma senha com seu hash.
 * @param password Senha em texto puro
 * @param hash Hash da senha
 * @returns true se forem iguais, false se não
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
