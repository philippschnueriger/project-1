import express from "express";
import { todosController } from "../controller/todos-controller.js";

const router = express.Router();

router.get("/", todosController.allTodos);

const todosRoutes = router;

export default todosRoutes;
