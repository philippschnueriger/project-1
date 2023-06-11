import express from "express";
import { todosController } from "../controller/todos-controller.js";

const router = express.Router();

router.get("/", todosController.allTodos);
router.post("/", todosController.createTodo);
router.get("/:id", todosController.getTodo);
router.patch("/:id", todosController.updateTodo);
router.delete("/:id", todosController.deleteTodo);

const todosRoutes = router;

export default todosRoutes;
