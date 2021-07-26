import { RequestHandler } from "express";

export const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({
    message: "Resource Not Found",
  });
};
