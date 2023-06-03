export default function filterItemsBy(todoList, field, filteredTodoList) {
  if (filteredTodoList === todoList) {
    const filteredTodos = todoList.filter((todo) => todo[field] === true);
    return filteredTodos;
  }
  return todoList;
}
