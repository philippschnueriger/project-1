import express from "express";
import path from "path";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import todosRoutes from "./source/server/routes/todos-routes.js";

// eslint-disable-next-line import/prefer-default-export
export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(methodOverrideFn));

function methodOverrideFn(req, res) {
  if (req.body && typeof req.body === "object" && "_method" in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}

app.use("/api/todos", todosRoutes);
app.use(express.static(path.resolve("source/public")));
