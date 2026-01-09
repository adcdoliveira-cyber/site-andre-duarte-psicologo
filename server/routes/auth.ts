import { Router, Request, Response } from "express";
import { findOrCreateUser, getUserById } from "../auth/oauth";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

/**
 * Simular callback do Google OAuth
 * Em produção, isso seria feito via Google OAuth 2.0
 */
router.post("/auth/google", (req: Request, res: Response) => {
  try {
    const { id, email, name, picture } = req.body;

    if (!id || !email || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = findOrCreateUser({
      id,
      email,
      name,
      avatar: picture,
      provider: "google",
    });

    // Criar JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
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
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

/**
 * Simular callback do Microsoft OAuth
 */
router.post("/auth/microsoft", (req: Request, res: Response) => {
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
      provider: "microsoft",
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
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
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Microsoft auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

/**
 * Simular callback do GitHub OAuth
 */
router.post("/auth/github", (req: Request, res: Response) => {
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
      provider: "github",
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
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
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("GitHub auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

/**
 * Verificar token e obter usuário
 */
router.get("/auth/me", (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
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
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Auth verification error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
});

/**
 * Logout (apenas para limpeza no cliente)
 */
router.post("/auth/logout", (req: Request, res: Response) => {
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;
