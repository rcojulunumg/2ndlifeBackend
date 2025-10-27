import app from "./src/app.js";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});