import todoStore from "./data/todo-store.js";

const todoService = {
  loadData() {
    const todos = todoStore.getTodos();
    this.data = todos;
    this.filteredData = todos;
    this.sortedData = todos;
  },
  saveData() {
    todoStore.setTodos(this.data);
  },
  filterItemsBy(filterBy) {
    const filteredTodos = this.data.filter((todo) => todo[filterBy] === true);
    if (JSON.stringify(filteredTodos) === JSON.stringify(this.filteredData)) {
      this.filteredData = this.data;
    } else {
      this.filteredData = filteredTodos;
    }
  },
  sortItemsBy(sortBy) {
    console.log("sort");
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
};

export default todoService;
