import express from "express";
import path from "path";
import bodyParser from "body-parser";
import todosRoutes from "./source/server/routes/todos-routes.js";

// eslint-disable-next-line import/prefer-default-export
export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/todos", todosRoutes);
app.use(express.static(path.resolve("source/public")));
