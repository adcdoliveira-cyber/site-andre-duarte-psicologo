import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { initializeDatabase } from "./db/index";
import authRoutes from "./routes/auth";
import diaryRoutes from "./routes/diary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  try {
    // Inicializar banco de dados
    console.log("🚀 Inicializando banco de dados...");
    await initializeDatabase();
    console.log("✅ Banco de dados pronto!");

    const app = express();
    const server = createServer(app);

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // CORS
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      if (req.method === "OPTIONS") {
        return res.sendStatus(200);
      }
      next();
    });

    // Rotas de API
    app.use("/api", authRoutes);
    app.use("/api", diaryRoutes);

    // Health check
    app.get("/api/health", (_req, res) => {
      res.json({ status: "ok", timestamp: new Date().toISOString() });
    });

    // Serve static files from dist/public in production
    const staticPath =
      process.env.NODE_ENV === "production"
        ? path.resolve(__dirname, "public")
        : path.resolve(__dirname, "..", "dist", "public");

    app.use(express.static(staticPath));

    // Handle client-side routing - serve index.html for all routes
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });

    const port = process.env.PORT || 3000;

    server.listen(port, () => {
      console.log(`🌐 Servidor rodando em http://localhost:${port}/`);
      console.log(`📚 API disponível em http://localhost:${port}/api`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}

startServer().catch(console.error);
