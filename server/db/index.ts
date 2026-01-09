import initSqlJs, { Database as SqlJsDatabase } from "sql.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do banco de dados
const dbPath = path.resolve(__dirname, "../../data/app.db");

let sqlDb: SqlJsDatabase | null = null;

// Inicializar o banco de dados
export async function initializeDatabase() {
  const SQL = await initSqlJs();

  // Tentar carregar banco existente
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    sqlDb = new SQL.Database(buffer);
  } else {
    // Criar novo banco
    sqlDb = new SQL.Database();
  }

  return sqlDb;
}

// Salvar banco de dados
export function saveDatabase() {
  if (!sqlDb) throw new Error("Database not initialized");

  const data = sqlDb.export();
  const buffer = Buffer.from(data);

  // Criar diretório se não existir
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(dbPath, buffer);
}

// Obter instância do banco
export function getDatabase() {
  if (!sqlDb) throw new Error("Database not initialized. Call initializeDatabase() first.");
  return sqlDb;
}

export type Database = SqlJsDatabase;
