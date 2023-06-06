import todoService from "../services/todo-service.js";

const form = document.querySelector("#form");
const title = document.querySelector("#title");
const importance = document.querySelector("#importance");
const duedate = document.querySelector("#duedate");
const status = document.querySelector("#status");
const description = document.querySelector("#description");

const createButton = document.querySelector("#create-button");
const createAndOverviewButton = document.querySelector(
  "#create-and-overview-button"
);

const switchOverview = document.querySelectorAll(".switch-overview");

const formDialog = document.querySelector("dialog");

const todoTemplate = document.querySelector("#todo-template").innerHTML;
// eslint-disable-next-line no-undef
const createTodosHtml = Handlebars.compile(todoTemplate);

function renderForm() {
  title.value = todoService.CurrentDataset.name;
  importance.value = todoService.CurrentDataset.priority;
  duedate.value = todoService.CurrentDataset.duedate;
  status.value = todoService.CurrentDataset.status;
  description.value = todoService.CurrentDataset.description;
}

function renderTodos() {
  const todoListElement = document.querySelector("#todos");
  todoListElement.innerHTML = createTodosHtml(todoService.data);
  const editButtons = document.querySelectorAll(".edit-button");
  // //const checkboxes = document.querySelectorAll(".checkbox");
  for (let i = 0; i < todoService.data.length; i++) {
    const id = Number(editButtons[i].dataset.id);
    editButtons[i].addEventListener("click", () => {
      todoService.setCurrentDataset(id);
      renderForm();
      createButton.innerHTML = "Update";
      createAndOverviewButton.innerHTML = "Update & Overview";
      formDialog.showModal();
    });
    //   //checkboxes[i].checked = todo[0].status;
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
  const themeButton = document.querySelector("#theme-button");
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });

  const switchViewButtons = document.querySelectorAll(".switch-view");

  // eslint-disable-next-line no-restricted-syntax
  for (const switchViewButton of switchViewButtons) {
    switchViewButton.addEventListener("click", () => {
      switchView();
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
  for (let i = 0; i < switchOverview.length; i++) {
    switchOverview[i].addEventListener("click", () => {
      formDialog.close();
    });
  }
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
    if (todoService.CurrentDataset) {
      const objIndex = todoService.data.findIndex(
        (obj) => obj.id === todoService.CurrentDataset.id
      );
      todoService.data[objIndex] = message;
    } else {
      todoService.data.push(message);
    }
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

// implement dialog element
// https://blog.logrocket.com/using-the-dialog-element/

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
