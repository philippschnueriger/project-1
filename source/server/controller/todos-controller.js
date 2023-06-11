import { todosStore } from "../services/todos-store.js";

export class TodosController {
  allTodos = async (req, res) => {
    console.log("Showing all orders");
    res.json(await todosStore.all());
  };
}

export const todosController = new TodosController();
