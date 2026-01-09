import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Tabela de Usuários (Clientes)
 * Armazena dados de autenticação OAuth e perfil
 */
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  avatar: text("avatar"), // URL da foto do perfil
  provider: text("provider").notNull(), // 'google', 'microsoft', 'github'
  providerId: text("provider_id").notNull().unique(), // ID do provedor
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

/**
 * Tabela de Entradas do Diário de Emoções
 * Armazena histórico de emoções registradas pelos clientes
 */
export const emotionalDiaryEntries = sqliteTable("emotional_diary_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  emotion: text("emotion").notNull(), // 'feliz', 'triste', 'ansioso', etc
  intensity: integer("intensity").notNull(), // 1-10
  notes: text("notes").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Tipos TypeScript inferidos do schema
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type EmotionalDiaryEntry = typeof emotionalDiaryEntries.$inferSelect;
export type NewEmotionalDiaryEntry = typeof emotionalDiaryEntries.$inferInsert;
