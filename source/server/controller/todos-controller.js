import { todosStore } from "../services/todos-store.js";

export class TodosController {
  allTodos = async (req, res) => {
    res.json(await todosStore.all());
  };
  getTodo = async (req, res) => {
    res.json(await todosStore.get(req.params.id));
  };
  createTodo = async (req, res) => {
    res.json(await todosStore.create(req.body));
  };
  updateTodo = async (req, res) => {
    res.json(await todosStore.update(req.params.id, req.body));
  };
  deleteTodo = async (req, res) => {
    res.json(await todosStore.delete(req.params.id));
  };
}

export const todosController = new TodosController();
