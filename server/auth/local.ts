import { getDatabase, saveDatabase } from "../db/index";
import bcrypt from "bcryptjs";

export interface LocalUser {
  email: string;
  name: string;
  password: string;
}

/**
 * Registrar novo usuário com email e senha
 */
export async function registerUser(userData: LocalUser) {
  const db = getDatabase();

  // Verificar se o email já existe
  const existingUser = db.exec(
    `SELECT * FROM users WHERE email = ?`,
    [userData.email]
  );

  if (existingUser.length > 0 && existingUser[0].values.length > 0) {
    throw new Error("Email já cadastrado");
  }

  // Validar email
  if (!userData.email.includes("@")) {
    throw new Error("Email inválido");
  }

  // Validar senha (mínimo 6 caracteres)
  if (userData.password.length < 6) {
    throw new Error("A senha deve ter no mínimo 6 caracteres");
  }

  // Validar nome
  if (!userData.name || userData.name.trim().length < 2) {
    throw new Error("Nome deve ter no mínimo 2 caracteres");
  }

  // Hash da senha
  const passwordHash = await bcrypt.hash(userData.password, 10);

  // Criar usuário
  db.run(
    `INSERT INTO users (email, name, password_hash, provider, provider_id) VALUES (?, ?, ?, ?, ?)`,
    [userData.email, userData.name.trim(), passwordHash, "local", null]
  );

  saveDatabase();

  // Buscar usuário criado
  const result = db.exec(
    `SELECT id, email, name, avatar, provider FROM users WHERE email = ?`,
    [userData.email]
  );

  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0].values[0];
    return {
      id: row[0],
      email: row[1],
      name: row[2],
      avatar: row[3],
      provider: row[4],
    };
  }

  throw new Error("Erro ao criar usuário");
}

/**
 * Autenticar usuário com email e senha
 */
export async function authenticateUser(email: string, password: string) {
  const db = getDatabase();

  // Buscar usuário por email
  const result = db.exec(
    `SELECT id, email, name, avatar, provider, password_hash FROM users WHERE email = ? AND provider = ?`,
    [email, "local"]
  );

  if (result.length === 0 || result[0].values.length === 0) {
    throw new Error("Email ou senha incorretos");
  }

  const row = result[0].values[0];
  const passwordHash = row[5];

  // Verificar se há hash de senha
  if (!passwordHash) {
    throw new Error("Usuário não possui senha cadastrada");
  }

  // Verificar senha
  const isPasswordValid = await bcrypt.compare(password, passwordHash as string);

  if (!isPasswordValid) {
    throw new Error("Email ou senha incorretos");
  }

  // Retornar usuário autenticado
  return {
    id: row[0],
    email: row[1],
    name: row[2],
    avatar: row[3],
    provider: row[4],
  };
}

/**
 * Obter usuário por email (qualquer provider)
 */
export function getUserByEmail(email: string) {
  const db = getDatabase();

  const result = db.exec(
    `SELECT id, email, name, avatar, provider FROM users WHERE email = ?`,
    [email]
  );

  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0].values[0];
    return {
      id: row[0],
      email: row[1],
      name: row[2],
      avatar: row[3],
      provider: row[4],
    };
  }

  return null;
}
