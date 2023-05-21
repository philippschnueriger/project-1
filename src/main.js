import todoStore from "./todo-store.js"
const todos = todoStore.todos;
let sortedTodos = todos;
let filteredTodos = todos;

const themeButton = document.querySelector("#theme-button");
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});

const switchViewButtons = document.querySelectorAll(".switch-view");
const overview = document.querySelector(".overview");
const newentry = document.querySelector(".new-entry");
for (let switchViewButton of switchViewButtons) {
    switchViewButton.addEventListener("click", () => {
        overview.classList.toggle("hide");
        newentry.classList.toggle("hide");
    });
}

const sortButtons = document.querySelectorAll(".sort-button");
for (let sortButton of sortButtons) {
    let sortBy = sortButton.dataset.sortBy;
    sortButton.addEventListener("click", () => {
        sortedTodos = sortItemsBy(todos, sortBy);
        renderTodos(sortedTodos);
    });
}

const filterButton = document.querySelector(".filter-button");
filterButton.addEventListener("click", () => {
    filteredTodos = filterItemsBy(todos, "status");
    renderTodos(filteredTodos);
});

function createTodosHtml(todos) {
    return todos.map(todo =>
    `<li>
        <div class="status">
            <div class="due-date">${todo.duedate}</div>
            <input type="checkbox" class="checkbox" disabled>${todo.status ? "Completed" : "Open"}</input>
        </div>
        <div class="content">
            <div class="name">${todo.name}</div>
            <div class="description">${todo.description}</div>
        </div>
        <div class="rating">
            <div class="importance">${displayPriority(todo.priority)}</div>
        </div>
        <div class="edit">
            <button class="edit-button" data-id="${todo.created}">Edit</button>
        </div>
    </li>`).join('');
}

function displayPriority(priority) {
    let priorityText = "";
    for (let i = 0; i < priority; i++) {
        priorityText += "↯";
    }
    return priorityText;
}

function filterItemsBy(items, field) {
    if (filteredTodos === todos) {
        filteredTodos = items.filter(todo => todo[field] === true);
        return filteredTodos;
    } else {
        return todos;
    }
}

function sortItemsBy(items, sort) {
  const sortType = {
    "string": (a, b) => a > b ? 1 : a < b ? -1 : 0,
    "number": (a, b) => a - b,
  };
  const sortFn = sortType[typeof (items[0][sort])];
  return [...items].sort((a, b) => sortFn(a[sort], b[sort]));
}

function renderTodos(todos){
    const todoListElement = document.querySelector("#todos");
    todoListElement.innerHTML = createTodosHtml(todos);
    const editButtons = document.querySelectorAll(".edit-button");
    const checkboxes = document.querySelectorAll(".checkbox");
    for (let i=0; i < todos.length; i++) {
        let id = Number(editButtons[i].dataset.id);
        let todo = todos.filter(todo => todo.created === id);
        editButtons[i].addEventListener("click", () => {
            console.log(todo)
            // TODO
        });
        checkboxes[i].checked = todo[0].status;
      } 
};

const form = document.querySelector("#form");
const title = document.querySelector("#title");
const importance = document.querySelector("#importance");
const duedate = document.querySelector("#duedate");
const status = document.querySelector("#status");
const description = document.querySelector("#description");
const createButton = document.querySelector("#create-button");

form.addEventListener("submit", event => {
    event.preventDefault();
    let message = {
        created: Date.now(),
        name: title.value,
        description: description.value,
        priority: importance.value,
        duedate: duedate.value,
        status: status.value
    }
    console.log(message);
    todos.push(message);
    // TODO
    //message = {};
    createButton.innerHTML="Update";
    renderTodos(todos);
});
renderTodos(todos);
