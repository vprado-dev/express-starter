import { ErrorRequestHandler } from "express";
import { isHttpError } from "./httpError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const exception: ErrorRequestHandler = (err, req, res, next) => {
  const status = isHttpError(err) ? err.status : 500;
  let message: string = err.message;
  if (status === 500) {
    console.error(err);
    if (process.env.NODE_ENV === "production") {
      message = "Internal server error";
    }
  }
  res.status(status).json({ message });
};
