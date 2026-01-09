import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./index";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Executar migrações
migrate(db, {
  migrationsFolder: path.resolve(__dirname, "./migrations"),
});

console.log("✅ Migrações aplicadas com sucesso!");
