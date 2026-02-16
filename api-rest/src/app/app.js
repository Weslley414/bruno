import express from "express";
import cursoRoutes from "./routes/CursoRoutes.js";



const app = express();
const port = 3000;

// Middleware para ler JSON
app.use(express.json());

// Rotas
app.use( cursoRoutes);

// Inicia servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

export default app;
