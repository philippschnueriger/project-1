const todoTemplate = [
  {
    created: 1684663897851,
    name: "Geburi von Sarah",
    description: "Anrufen",
    priority: 5,
    duedate: "2023-05-21",
    status: true,
  },
  {
    created: 1684663897850,
    name: "Ferien",
    description: "Flug buchen",
    priority: 2,
    duedate: "2023-03-13",
    status: false,
  },
  {
    created: 1684663897859,
    name: "Einkaufen",
    description: "Pizza Schuhe Kekse",
    priority: 3,
    duedate: "2023-06-11",
    status: false,
  },
];

const todoStore = {
  resetTodos() {
    localStorage.setItem("todoStore", JSON.stringify(todoTemplate));
  },
  getTodos() {
    const todos = JSON.parse(
      //localStorage.getItem("todoStore") || JSON.stringify(todoTemplate)
      localStorage.getItem("todoStore")
    );
    return todos;
  },
  setTodos(todos) {
    localStorage.setItem("todoStore", JSON.stringify(todos));
  },
};

export default todoStore;
