import { getDatabase, saveDatabase } from "../db/index";

export interface OAuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: "google" | "microsoft" | "github";
}

/**
 * Encontrar ou criar usuário no banco de dados
 */
export function findOrCreateUser(oauthUser: OAuthUser) {
  const db = getDatabase();

  // Buscar usuário existente
  const result = db.exec(
    `SELECT * FROM users WHERE provider = ? AND provider_id = ?`,
    [oauthUser.provider, oauthUser.id]
  );

  if (result.length > 0 && result[0].values.length > 0) {
    // Usuário existe, retornar
    const row = result[0].values[0];
    return {
      id: row[0],
      email: row[1],
      name: row[2],
      avatar: row[3],
      provider: row[4],
      providerId: row[5],
    };
  }

  // Criar novo usuário
  db.run(
    `INSERT INTO users (email, name, avatar, provider, provider_id) VALUES (?, ?, ?, ?, ?)`,
    [oauthUser.email, oauthUser.name, oauthUser.avatar || null, oauthUser.provider, oauthUser.id]
  );

  saveDatabase();

  // Retornar usuário criado
  const newResult = db.exec(
    `SELECT * FROM users WHERE provider = ? AND provider_id = ?`,
    [oauthUser.provider, oauthUser.id]
  );

  if (newResult.length > 0 && newResult[0].values.length > 0) {
    const row = newResult[0].values[0];
    return {
      id: row[0],
      email: row[1],
      name: row[2],
      avatar: row[3],
      provider: row[4],
      providerId: row[5],
    };
  }

  throw new Error("Erro ao criar usuário");
}

/**
 * Obter usuário por ID
 */
export function getUserById(userId: number) {
  const db = getDatabase();

  const result = db.exec(`SELECT * FROM users WHERE id = ?`, [userId]);

  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0].values[0];
    return {
      id: row[0],
      email: row[1],
      name: row[2],
      avatar: row[3],
      provider: row[4],
      providerId: row[5],
    };
  }

  return null;
}

/**
 * Obter usuário por email
 */
export function getUserByEmail(email: string) {
  const db = getDatabase();

  const result = db.exec(`SELECT * FROM users WHERE email = ?`, [email]);

  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0].values[0];
    return {
      id: row[0],
      email: row[1],
      name: row[2],
      avatar: row[3],
      provider: row[4],
      providerId: row[5],
    };
  }

  return null;
}
