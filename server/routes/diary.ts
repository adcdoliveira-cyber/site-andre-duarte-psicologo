import { Router, Request, Response } from "express";
import { getDatabase, saveDatabase } from "../db/index";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

/**
 * Middleware para verificar autenticação
 */
function authenticateToken(req: Request, res: Response, next: Function) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

/**
 * Criar nova entrada no diário
 */
router.post("/diary", authenticateToken, (req: Request, res: Response) => {
  try {
    const { emotion, intensity, notes } = req.body;
    const userId = (req as any).userId;

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
      message: "Entry created successfully",
    });
  } catch (error) {
    console.error("Diary creation error:", error);
    res.status(500).json({ error: "Failed to create diary entry" });
  }
});

/**
 * Obter todas as entradas do usuário
 */
router.get("/diary", authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
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
          createdAt: row[4],
        });
      }
    }

    res.json({
      success: true,
      entries,
    });
  } catch (error) {
    console.error("Diary fetch error:", error);
    res.status(500).json({ error: "Failed to fetch diary entries" });
  }
});

/**
 * Obter entrada específica
 */
router.get("/diary/:id", authenticateToken, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
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
        createdAt: row[4],
      },
    });
  } catch (error) {
    console.error("Diary fetch error:", error);
    res.status(500).json({ error: "Failed to fetch diary entry" });
  }
});

/**
 * Atualizar entrada
 */
router.put("/diary/:id", authenticateToken, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { emotion, intensity, notes } = req.body;
    const userId = (req as any).userId;

    if (!emotion || !intensity || !notes) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = getDatabase();

    // Verificar se entrada pertence ao usuário
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
      message: "Entry updated successfully",
    });
  } catch (error) {
    console.error("Diary update error:", error);
    res.status(500).json({ error: "Failed to update diary entry" });
  }
});

/**
 * Deletar entrada
 */
router.delete("/diary/:id", authenticateToken, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const db = getDatabase();

    // Verificar se entrada pertence ao usuário
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
      message: "Entry deleted successfully",
    });
  } catch (error) {
    console.error("Diary delete error:", error);
    res.status(500).json({ error: "Failed to delete diary entry" });
  }
});

export default router;
