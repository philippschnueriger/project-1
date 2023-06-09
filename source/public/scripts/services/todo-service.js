import { httpService } from "./http-service.js";

const todoService = {
  async allTodos() {
    const todos = await httpService.ajax("GET", "/api/todos/", undefined);
    this.data = todos;
    this.filteredData = todos;
    this.sortedData = todos;
  },
  async getTodo(id) {
    const todo = await httpService.ajax("GET", `/api/todos/${id}`, undefined);
    this.CurrentDataset = todo;
  },

  async createTodo(todo) {
    await httpService.ajax("POST", "/api/todos/", todo);
  },
  async updateTodo(todo, id) {
    await httpService.ajax("PATCH", `/api/todos/${id}`, todo);
  },
  async deleteTodo(id) {
    await httpService.ajax("DELETE", `/api/todos/${id}`, undefined);
  },
  filterItemsBy(filterBy) {
    const filteredTodos = this.data.filter((todo) => todo[filterBy] === "true");
    if (JSON.stringify(filteredTodos) === JSON.stringify(this.filteredData)) {
      this.filteredData = this.data;
    } else {
      this.filteredData = filteredTodos;
    }
  },
  sortItemsBy(sortBy) {
    const sortType = {
      // eslint-disable-next-line no-nested-ternary
      string: (a, b) => (a > b ? 1 : a < b ? -1 : 0),
      number: (a, b) => a - b,
    };
    const sortFn = sortType[typeof this.data[0][sortBy]];
    const sortedTodos = [...this.data].sort((a, b) =>
      sortFn(a[sortBy], b[sortBy])
    );
    if (JSON.stringify(sortedTodos) === JSON.stringify(this.sortedData)) {
      this.sortedData = sortedTodos.reverse();
    } else {
      this.sortedData = sortedTodos;
    }
  },
  data: undefined,
  filteredData: undefined,
  sortedData: undefined,
  CurrentDataset: null,
};

export default todoService;
