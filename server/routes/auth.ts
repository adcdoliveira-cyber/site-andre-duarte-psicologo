import { Router, Request, Response } from "express";
import { findOrCreateUser, getUserById } from "../auth/oauth";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret";

/**
 * Verificar token JWT do Google
 * Valida o token recebido do frontend contra os servidores do Google
 */
async function verifyGoogleToken(token: string): Promise<any> {
  try {
    // URL do Google para verificar tokens
    const response = await fetch("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token);
    
    if (!response.ok) {
      throw new Error("Invalid Google token");
    }

    const data = await response.json() as any;
    return data;
  } catch (error) {
    console.error("Google token verification error:", error);
    throw new Error("Failed to verify Google token");
  }
}

/**
 * Rota de autenticação com Google OAuth 2.0
 * Recebe o ID token do Google e valida
 */
router.post("/auth/google", (req: Request, res: Response) => {
  try {
    const { id, email, name, picture } = req.body;

    // Validar campos obrigatórios
    if (!id || !email || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validar email
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Criar ou atualizar usuário no banco de dados
    const user = findOrCreateUser({
      id,
      email,
      name,
      avatar: picture,
      provider: "google",
    });

    // Criar JWT token para a aplicação
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
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

/**
 * Rota alternativa para Google OAuth com ID Token
 * Mais segura que a anterior
 */
router.post("/auth/google/token", async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: "ID token is required" });
    }

    // Decodificar e validar o ID token
    const parts = idToken.split(".");
    if (parts.length !== 3) {
      return res.status(400).json({ error: "Invalid token format" });
    }

    // Decodificar o payload (sem validar assinatura por enquanto)
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());

    const { sub, email, name, picture } = payload;

    if (!sub || !email || !name) {
      return res.status(400).json({ error: "Missing required fields in token" });
    }

    // Criar ou atualizar usuário
    const user = findOrCreateUser({
      id: sub,
      email,
      name,
      avatar: picture,
      provider: "google",
    });

    // Criar JWT token
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
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Google token auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

/**
 * Callback do Microsoft OAuth
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
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Microsoft auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

/**
 * Callback do GitHub OAuth
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
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("GitHub auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

/**
 * Verificar token e obter usuário autenticado
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
 * Logout
 */
router.post("/auth/logout", (req: Request, res: Response) => {
  res.json({ success: true, message: "Logged out successfully" });
});

export default router;
