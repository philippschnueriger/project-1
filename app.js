import express from "express";
import path from "path";

// eslint-disable-next-line import/prefer-default-export
export const app = express();

app.use(express.static(path.resolve("source/public")));
