// src/routes/CursoRoutes.js
import { Router } from "express";
import CursoController from "../controllers/CursoController.js";

const routes = Router();

routes.get("/", CursoController.buscarTodos);
routes.get("/:id", CursoController.buscarPorId);
routes.post("/", CursoController.criar);
routes.put("/:id", CursoController.atualizar);
routes.delete("/:id", CursoController.deletar);

export default routes;
