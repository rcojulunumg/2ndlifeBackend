import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.js";
import usuarioRoutes from "./routes/usuario.js";
import mascotaRoutes from "./routes/mascotas.js";
import contactoRoutes from "./routes/contacto.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rutas
app.get("/", (req, res) => {
  res.send("API Proyecto funcionando correctamente");
});

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/mascotas", mascotaRoutes);
app.use("/api/contacto", contactoRoutes);

// Conectar base de datos
sequelize
  .authenticate()
  .then(() => console.log("Conexión a MySQL establecida"))
  .catch((err) => console.error("Error de conexión:", err));

// Sincronizar modelos (crear tablas)
sequelize
  .sync({ alter: true })
  .then(() => console.log("Tablas sincronizadas con MySQL"))
  .catch((err) => console.error("Error al sincronizar tablas:", err));

export default app;