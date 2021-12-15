import { ObjectSchema } from "joi";
import { endpoint } from "../functions/endpoint";
import { HttpError } from "./httpError";

export const createRequestValidate =
  (key: "body" | "params" | "query") => (schema: ObjectSchema) =>
    endpoint(async (req, res, next) => {
      try {
        const value = await schema.validateAsync(req[key]);
        req[key] = value;
        next();
      } catch (err: any) {
        throw new HttpError(400, err.message);
      }
    });
