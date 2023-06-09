import todoService from "../services/todo-service.js";

// BUTTONS
const themeButton = document.querySelector("#theme-button");
const switchOverviewButton = document.querySelector("#switch-overview-button");
const createButton = document.querySelector("#create-button");
const createAndOverviewButton = document.querySelector(
  "#create-and-overview-button"
);
const switchViewButton = document.querySelector("#switch-form");

// TODOS OVERVIEW
const todoListElement = document.querySelector("#todos");
const todoTemplate = document.querySelector("#todo-template").innerHTML;
// eslint-disable-next-line no-undef
const createTodosHtml = Handlebars.compile(todoTemplate);
const noTodos = document.querySelector("#no-todos");

// FORM
const formDialog = document.querySelector("dialog");
const form = document.querySelector("#form");
const title = document.querySelector("#title");
const importance = document.querySelector("#importance");
const duedate = document.querySelector("#duedate");
const status = document.querySelector("#status");
const description = document.querySelector("#description");

function renderForm() {
  title.value = todoService.CurrentDataset.name;
  importance.value = todoService.CurrentDataset.priority;
  if (todoService.CurrentDataset.duedate.length > 10) {
    duedate.value = todoService.CurrentDataset.duedate.slice(0, 10);
  } else {
    duedate.value = todoService.CurrentDataset.duedate;
  }
  status.checked = todoService.CurrentDataset.status === "true";
  description.value = todoService.CurrentDataset.description;
}

async function renderTodos(todoList) {
  todoListElement.innerHTML = createTodosHtml(todoList);
  const editButtons = document.querySelectorAll(".edit-button");
  const deleteButtons = document.querySelectorAll(".delete-button");
  if (todoList.length === 0) {
    noTodos.style.display = "block";
  } else {
    noTodos.style.display = "none";
  }
  for (let i = 0; i < todoList.length; i++) {
    const { id } = editButtons[i].dataset;
    editButtons[i].addEventListener("click", async () => {
      await todoService.getTodo(id);
      renderForm();
      createButton.innerHTML = "Update";
      createAndOverviewButton.innerHTML = "Update & Overview";
      formDialog.showModal();
    });
    deleteButtons[i].addEventListener("click", async () => {
      await todoService.deleteTodo(id);
      await todoService.allTodos();
      renderTodos(todoService.data);
    });
  }
}

function switchView() {
  formDialog.showModal();
  title.value = "";
  importance.value = "";
  duedate.value = "";
  status.value = "";
  description.value = "";
  createButton.innerHTML = "Create";
  createAndOverviewButton.innerHTML = "Create & Overview";
}

function showOverview() {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });
  switchViewButton.addEventListener("click", () => {
    switchView();
  });

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
  switchOverviewButton.addEventListener("click", () => {
    formDialog.close();
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = {
      created: Date.now(),
      name: title.value,
      description: description.value,
      priority: importance.value,
      duedate: duedate.value,
      status: status.checked.toString(),
    };
    if (todoService.CurrentDataset) {
      // eslint-disable-next-line no-underscore-dangle
      await todoService.updateTodo(message, todoService.CurrentDataset._id);
    } else {
      await todoService.createTodo(message);
    }
    createButton.innerHTML = "Update";
    await todoService.allTodos();
    await renderTodos(todoService.data);
    if (event.submitter.id === "create-and-overview-button") {
      todoService.CurrentDataset = null;
      formDialog.close();
    }
  });
}

function renderViews() {
  showOverview();
  showForm();
}

async function initialize() {
  await todoService.allTodos();
  renderViews();
}

initialize();
