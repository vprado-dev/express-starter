import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { readdirSync } from "fs";
import { join } from "path";
import morgan from "morgan";
import { notFound } from "./middlewares/notFound";
import { exception } from "./middlewares/exception";
import openapi from "@ev-fns/openapi";

const app = express();

app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);

app.use(cors());
app.use(json());
app.use(morgan("combined", { skip: () => process.env.NODE_ENV === "test" }));
app.use(openapi({ apiName: process.env.API_NAME }));

const routes = readdirSync(join(__dirname, "routes"));

for (const route of routes) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.use(require(join(__dirname, "routes", route)).default);
}

app.use(exception);

app.use(notFound);

export default app;
