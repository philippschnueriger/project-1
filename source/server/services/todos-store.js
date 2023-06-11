import Datastore from "nedb-promises";

export class TodosStore {
  constructor(db) {
    this.db =
      db ||
      new Datastore({
        filename: "./source/server/data/todos.db",
        autoload: true,
      });
  }

  async all() {
    return this.db.find({});
  }
}

export const todosStore = new TodosStore();
