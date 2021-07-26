import { RequestHandler } from "express";

export const statusGet: RequestHandler = (req, res) => {
  res.status(204).end();
};
