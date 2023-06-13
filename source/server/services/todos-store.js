/* eslint-disable max-classes-per-file */
import Datastore from "nedb-promises";

export class Todo {
  constructor(name, description, priority, duedate, status) {
    this.created = new Date();
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.duedate = duedate;
    this.status = status;
    this.state = "OK";
  }
}

export class TodosStore {
  constructor(db) {
    this.db =
      db ||
      new Datastore({
        filename: "./source/server/services/data/todos.db",
        autoload: true,
      });
  }

  async all() {
    return this.db.find({});
  }

  async get(id) {
    return this.db.findOne({ _id: id });
  }

  async create(body) {
    const todo = new Todo(
      body.name,
      body.description,
      body.priority,
      body.duedate,
      body.status
    );
    return this.db.insert(todo);
  }

  async update(id, body) {
    const todo = new Todo(
      body.name,
      body.description,
      body.priority,
      body.duedate,
      body.status
    );
    await this.db.update({ _id: id }, todo);
    return this.get(id);
  }

  async delete(id) {
    await this.db.remove({ _id: id });
    return "";
  }
}

export const todosStore = new TodosStore();
