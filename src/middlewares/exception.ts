import { ErrorRequestHandler } from "express";

export const exception: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (process.env.NODE_ENV === "production") {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  return res.status(500).json({
    message: err.message,
  });
};
