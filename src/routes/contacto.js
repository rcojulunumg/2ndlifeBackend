import express from "express";
import dotenv from "dotenv";
import { Resend } from 'resend';

dotenv.config();
const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/enviar", async (req, res) => {
  const { nombre, correo, mensaje } = req.body;

  try {
    const htmlTemplate = `
      <div style="
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      ">
        <div style="
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        ">
          <h2 style="color: #2563eb; text-align: center;">📩 Nuevo mensaje de contacto</h2>
          <hr style="border: none; border-top: 2px solid #2563eb; width: 60px; margin: 15px auto;">
          
          <p style="font-size: 16px; color: #333;">
            <strong>Nombre:</strong> ${nombre}
          </p>
          <p style="font-size: 16px; color: #333;">
            <strong>Correo electrónico:</strong> ${correo}
          </p>
          <p style="font-size: 16px; color: #333; margin-top: 20px;">
            <strong>Mensaje:</strong><br>
            <span style="
              display: inline-block;
              background: #f9fafb;
              border-left: 4px solid #2563eb;
              padding: 10px 15px;
              border-radius: 5px;
              color: #555;
              white-space: pre-line;
            ">${mensaje}</span>
          </p>

          <p style="text-align: center; color: #999; font-size: 13px; margin-top: 30px;">
            Este correo fue enviado desde el formulario de contacto de <strong>2ndLife</strong>.
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: `"2ndLife" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_BOX,
      subject: "Nuevo mensaje de contacto - 2ndLife",
      html: htmlTemplate,
    });

    res.json({ message: "Correo enviado correctamente" });
  } catch (err) {
    console.error("Error al enviar correo:", err);
    res.status(500).json({ error: "Error enviando correo" });
  }
});

router.post("/adopcion", async (req, res) => {
  const { nombreMascota, correoUsuario, mensaje } = req.body;

  try {
    // ✉️ Plantilla HTML para solicitudes de adopción
    const htmlTemplate = `
      <div style="
        font-family: 'Segoe UI', Arial, sans-serif;
        background-color: #f3f6fa;
        padding: 30px;
      ">
        <div style="
          max-width: 650px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 12px;
          padding: 25px 30px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        ">
          <div style="text-align: center;">
            <h2 style="color: #2563eb; margin-bottom: 5px;">🐾 Solicitud de Adopción</h2>
            <p style="color: #666; font-size: 15px; margin-top: 0;">
              Se ha recibido una nueva solicitud de contacto para adopción.
            </p>
          </div>

          <hr style="border: none; border-top: 2px solid #2563eb; margin: 20px 0;">

          <div style="font-size: 16px; color: #333;">
            <p><strong>🐶 Mascota de interés:</strong> <span style="color:#2563eb;">${nombreMascota}</span></p>
            <p><strong>📧 Correo del interesado:</strong> 
              <a href="mailto:${correoUsuario}" style="color:#2563eb; text-decoration:none;">${correoUsuario}</a>
            </p>
          </div>

          <div style="margin-top: 20px;">
            <p style="font-weight: bold; color:#333;">📝 Mensaje del usuario:</p>
            <div style="
              background: #f9fafb;
              border-left: 4px solid #2563eb;
              padding: 12px 15px;
              border-radius: 6px;
              color: #555;
              white-space: pre-line;
              font-size: 15px;
            ">
              ${mensaje}
            </div>
          </div>

          <div style="text-align:center; margin-top:30px; font-size:13px; color:#888;">
            Este correo fue enviado automáticamente desde el portal de adopciones 
            <strong style="color:#2563eb;">2ndLife</strong>.
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: `"2ndLife Adopciones" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_BOX,
      subject: `Solicitud de adopción - ${nombreMascota}`,
      html: htmlTemplate,
    });

    res.json({ message: "Solicitud de adopción enviada correctamente" });
  } catch (err) {
    console.error("Error al enviar correo:", err);
    res.status(500).json({ error: "Error al enviar la solicitud" });
  }
});

export default router;