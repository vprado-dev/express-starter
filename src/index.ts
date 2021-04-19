import express from "express";
import cors from "cors";
import { json } from "body-parser";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World").end();
});

app.listen(3000, () => console.log("Listening at http://localhost:3000"));
