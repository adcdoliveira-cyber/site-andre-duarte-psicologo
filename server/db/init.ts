import { initializeDatabase, getDatabase, saveDatabase } from "./index";

async function initDb() {
  console.log("🚀 Inicializando banco de dados...");

  await initializeDatabase();
  const db = getDatabase();

  // Criar tabela de usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      avatar TEXT,
      provider TEXT NOT NULL,
      provider_id TEXT UNIQUE,
      password_hash TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Criar tabela de entradas do diário de emoções
  db.run(`
    CREATE TABLE IF NOT EXISTS emotional_diary_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      emotion TEXT NOT NULL,
      intensity INTEGER NOT NULL,
      notes TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Criar índices para melhor performance
  db.run(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_users_provider_id ON users(provider_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_diary_user_id ON emotional_diary_entries(user_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_diary_created_at ON emotional_diary_entries(created_at)`);

  // Salvar banco de dados
  saveDatabase();

  console.log("✅ Banco de dados inicializado com sucesso!");
}

initDb().catch((err) => {
  console.error("❌ Erro ao inicializar banco de dados:", err);
  process.exit(1);
});
