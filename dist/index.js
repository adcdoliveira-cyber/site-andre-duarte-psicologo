// server/index.ts
import express from "express";
import { createServer } from "http";
import path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";

// server/db/index.ts
import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var dbPath = path.resolve(__dirname, "../../data/app.db");
var sqlDb = null;
async function initializeDatabase() {
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    sqlDb = new SQL.Database(buffer);
  } else {
    sqlDb = new SQL.Database();
  }
  return sqlDb;
}
function saveDatabase() {
  if (!sqlDb) throw new Error("Database not initialized");
  const data = sqlDb.export();
  const buffer = Buffer.from(data);
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dbPath, buffer);
}
function getDatabase() {
  if (!sqlDb) throw new Error("Database not initialized. Call initializeDatabase() first.");
  return sqlDb;
}

// server/routes/auth.ts
import { Router } from "express";

// server/auth/oauth.ts
function findOrCreateUser(oauthUser) {
  const db = getDatabase();
  const result = db.exec(
    `SELECT * FROM users WHERE provider = ? AND provider_id = ?`,
    [oauthUser.provider, oauthUser.id]
  );
  if (result.length > 0 && result[0].values.length > 0) {
    const row = result[0].values[0];
    return {
      id: row[0],
      email: row[1],
      name: row[2],
      avatar: row[3],
      provider: row[4],
      providerId: row[5]
    };
  }
  db.run(
    `INSERT INTO users (email, name, avatar, provider, provider_id) VALUES (?, ?, ?, ?, ?)`,
    [oauthUser.email, oauthUser.name, oauthUser.avatar || null, oauthUser.provider, oauthUser.id]
  );
  saveDatabase();
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
      providerId: row[5]
    };
  }
  throw new Error("Erro ao criar usu\xE1rio");
}
function getUserById(userId) {
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
      providerId: row[5]
    };
  }
  return null;
}

// server/routes/auth.ts
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
var router = Router();
var JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret";
router.post("/auth/google", (req, res) => {
  try {
    const { id, email, name, picture } = req.body;
    if (!id || !email || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const user = findOrCreateUser({
      id,
      email,
      name,
      avatar: picture,
      provider: "google"
    });
    const appToken = jwt.sign(
      { userId: user.id, email: user.email, provider: "google" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      success: true,
      token: appToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});
router.post("/auth/google/token", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: "ID token is required" });
    }
    const parts = idToken.split(".");
    if (parts.length !== 3) {
      return res.status(400).json({ error: "Invalid token format" });
    }
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
    const { sub, email, name, picture } = payload;
    if (!sub || !email || !name) {
      return res.status(400).json({ error: "Missing required fields in token" });
    }
    const user = findOrCreateUser({
      id: sub,
      email,
      name,
      avatar: picture,
      provider: "google"
    });
    const appToken = jwt.sign(
      { userId: user.id, email: user.email, provider: "google" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      success: true,
      token: appToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Google token auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});
router.post("/auth/microsoft", (req, res) => {
  try {
    const { id, email, displayName, picture } = req.body;
    if (!id || !email || !displayName) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const user = findOrCreateUser({
      id,
      email,
      name: displayName,
      avatar: picture,
      provider: "microsoft"
    });
    const token = jwt.sign(
      { userId: user.id, email: user.email, provider: "microsoft" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Microsoft auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});
router.post("/auth/github", (req, res) => {
  try {
    const { id, email, login, avatar_url } = req.body;
    if (!id || !email || !login) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const user = findOrCreateUser({
      id: String(id),
      email,
      name: login,
      avatar: avatar_url,
      provider: "github"
    });
    const token = jwt.sign(
      { userId: user.id, email: user.email, provider: "github" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("GitHub auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});
router.get("/auth/me", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = getUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Auth verification error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
});
router.post("/auth/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});
var auth_default = router;

// server/routes/diary.ts
import { Router as Router2 } from "express";
import jwt2 from "jsonwebtoken";
var router2 = Router2();
var JWT_SECRET2 = process.env.JWT_SECRET || "your-secret-key-change-in-production";
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt2.verify(token, JWT_SECRET2);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
router2.post("/diary", authenticateToken, (req, res) => {
  try {
    const { emotion, intensity, notes } = req.body;
    const userId = req.userId;
    if (!emotion || !intensity || !notes) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (intensity < 1 || intensity > 10) {
      return res.status(400).json({ error: "Intensity must be between 1 and 10" });
    }
    const db = getDatabase();
    db.run(
      `INSERT INTO emotional_diary_entries (user_id, emotion, intensity, notes) VALUES (?, ?, ?, ?)`,
      [userId, emotion, intensity, notes]
    );
    saveDatabase();
    res.status(201).json({
      success: true,
      message: "Entry created successfully"
    });
  } catch (error) {
    console.error("Diary creation error:", error);
    res.status(500).json({ error: "Failed to create diary entry" });
  }
});
router2.get("/diary", authenticateToken, (req, res) => {
  try {
    const userId = req.userId;
    const db = getDatabase();
    const result = db.exec(
      `SELECT id, emotion, intensity, notes, created_at FROM emotional_diary_entries WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );
    const entries = [];
    if (result.length > 0) {
      for (const row of result[0].values) {
        entries.push({
          id: row[0],
          emotion: row[1],
          intensity: row[2],
          notes: row[3],
          createdAt: row[4]
        });
      }
    }
    res.json({
      success: true,
      entries
    });
  } catch (error) {
    console.error("Diary fetch error:", error);
    res.status(500).json({ error: "Failed to fetch diary entries" });
  }
});
router2.get("/diary/:id", authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const db = getDatabase();
    const result = db.exec(
      `SELECT id, emotion, intensity, notes, created_at FROM emotional_diary_entries WHERE id = ? AND user_id = ?`,
      [parseInt(id), userId]
    );
    if (result.length === 0 || result[0].values.length === 0) {
      return res.status(404).json({ error: "Entry not found" });
    }
    const row = result[0].values[0];
    res.json({
      success: true,
      entry: {
        id: row[0],
        emotion: row[1],
        intensity: row[2],
        notes: row[3],
        createdAt: row[4]
      }
    });
  } catch (error) {
    console.error("Diary fetch error:", error);
    res.status(500).json({ error: "Failed to fetch diary entry" });
  }
});
router2.put("/diary/:id", authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { emotion, intensity, notes } = req.body;
    const userId = req.userId;
    if (!emotion || !intensity || !notes) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const db = getDatabase();
    const checkResult = db.exec(
      `SELECT id FROM emotional_diary_entries WHERE id = ? AND user_id = ?`,
      [parseInt(id), userId]
    );
    if (checkResult.length === 0 || checkResult[0].values.length === 0) {
      return res.status(404).json({ error: "Entry not found" });
    }
    db.run(
      `UPDATE emotional_diary_entries SET emotion = ?, intensity = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [emotion, intensity, notes, parseInt(id)]
    );
    saveDatabase();
    res.json({
      success: true,
      message: "Entry updated successfully"
    });
  } catch (error) {
    console.error("Diary update error:", error);
    res.status(500).json({ error: "Failed to update diary entry" });
  }
});
router2.delete("/diary/:id", authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const db = getDatabase();
    const checkResult = db.exec(
      `SELECT id FROM emotional_diary_entries WHERE id = ? AND user_id = ?`,
      [parseInt(id), userId]
    );
    if (checkResult.length === 0 || checkResult[0].values.length === 0) {
      return res.status(404).json({ error: "Entry not found" });
    }
    db.run(`DELETE FROM emotional_diary_entries WHERE id = ?`, [parseInt(id)]);
    saveDatabase();
    res.json({
      success: true,
      message: "Entry deleted successfully"
    });
  } catch (error) {
    console.error("Diary delete error:", error);
    res.status(500).json({ error: "Failed to delete diary entry" });
  }
});
var diary_default = router2;

// server/index.ts
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = path2.dirname(__filename2);
async function startServer() {
  try {
    console.log("\u{1F680} Inicializando banco de dados...");
    await initializeDatabase();
    console.log("\u2705 Banco de dados pronto!");
    const app = express();
    const server = createServer(app);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }
      next();
    });
    app.use("/api", auth_default);
    app.use("/api", diary_default);
    app.get("/api/health", (_req, res) => {
      res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    });
    const staticPath = process.env.NODE_ENV === "production" ? path2.resolve(__dirname2, "public") : path2.resolve(__dirname2, "..", "dist", "public");
    app.use(express.static(staticPath));
    app.get("*", (_req, res) => {
      res.sendFile(path2.join(staticPath, "index.html"));
    });
    const port = process.env.PORT || 3e3;
    server.listen(port, () => {
      console.log(`\u{1F310} Servidor rodando em http://localhost:${port}/`);
      console.log(`\u{1F4DA} API dispon\xEDvel em http://localhost:${port}/api`);
    });
  } catch (error) {
    console.error("\u274C Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}
startServer().catch(console.error);
