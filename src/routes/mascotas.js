import express from "express";
import multer from "multer";
import Mascota from "../models/Mascota.js";
import path from "path";

const router = express.Router();

// Configurar almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Endpoint para crear mascota con imagen
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, edad, descripcion } = req.body;
    const imagenUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const mascota = await Mascota.create({
      nombre,
      edad,
      descripcion,
      imagenUrl,
    });

    res.json({ success: true, mascota });
  } catch (error) {
    console.error("Error al crear mascota:", error);
    res.status(500).json({ error: "Error al crear mascota" });
  }
});

// GET /api/mascotas
router.get("/", async (req, res) => {
  try {
    const mascotas = await Mascota.findAll();
    res.json(mascotas);
  } catch (err) {
    console.error("Error al obtener mascotas:", err);
    res.status(500).json({ error: "Error al obtener las mascotas" });
  }
});

export default router;
