import todoService from "../services/todo-service.js";

const todosFragmentTemplateSource =
  document.querySelector("#todo-template").innerHTML;
// eslint-disable-next-line no-undef
const createTodosHtml = Handlebars.compile(todosFragmentTemplateSource);

function renderTodos(todoList) {
  const todoListElement = document.querySelector("#todos");
  todoListElement.innerHTML = createTodosHtml(todoList);
}

function showOverview() {
  const themeButton = document.querySelector("#theme-button");
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });

  const switchViewButtons = document.querySelectorAll(".switch-view");
  const overview = document.querySelector(".overview");
  const newentry = document.querySelector(".new-entry");
  // eslint-disable-next-line no-restricted-syntax
  for (const switchViewButton of switchViewButtons) {
    switchViewButton.addEventListener("click", () => {
      overview.classList.toggle("hide");
      newentry.classList.toggle("hide");
    });
  }

  const sortButtons = document.querySelectorAll(".sort-button");
  // eslint-disable-next-line no-restricted-syntax
  for (const sortButton of sortButtons) {
    const { sortBy } = sortButton.dataset;
    // eslint-disable-next-line no-loop-func
    sortButton.addEventListener("click", () => {
      todoService.sortItemsBy(sortBy);
      renderTodos(todoService.sortedData);
    });
  }

  const filterButton = document.querySelector(".filter-button");
  filterButton.addEventListener("click", () => {
    todoService.filterItemsBy("status");
    renderTodos(todoService.filteredData);
  });
  renderTodos(todoService.data);
}

function showForm() {
  const form = document.querySelector("#form");
  const title = document.querySelector("#title");
  const importance = document.querySelector("#importance");
  const duedate = document.querySelector("#duedate");
  const status = document.querySelector("#status");
  const description = document.querySelector("#description");
  const createButton = document.querySelector("#create-button");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = {
      created: Date.now(),
      name: title.value,
      description: description.value,
      priority: importance.value,
      duedate: duedate.value,
      status: status.value,
    };
    todoService.data.push(message);
    todoService.saveData();
    // TODO
    // message = {};
    createButton.innerHTML = "Update";
    renderTodos(todoService.data);
  });
}

function renderViews() {
  showOverview();
  showForm();
}

function initialize() {
  todoService.loadData();
  renderViews();
}

initialize();

// function renderTodos(todoList) {
//   const todoListElement = document.querySelector("#todos");
//   todoListElement.innerHTML = createTodosHtml(todoList);
//   const editButtons = document.querySelectorAll(".edit-button");
//   const checkboxes = document.querySelectorAll(".checkbox");
//   for (let i = 0; i < todos.length; i++) {
//     const id = Number(editButtons[i].dataset.id);
//     const todo = todos.filter(() => todo.created === id);
//     editButtons[i].addEventListener("click", () => {
//       console.log(todo);
//       // TODO
//     });
//     checkboxes[i].checked = todo[0].status;
//   }
// }

// function displayPriority(priority) {
//     let priorityText = "";
//     for (let i = 0; i < priority; i++) {
//       priorityText += "↯";
//     }
//     return priorityText;
//   }
