import { endpoint } from "../functions/endpoint";
import { HttpError } from "../utils/httpError";

const TOKEN_PREFIX = `Bearer `;

const createInternalAuth = (token: string) =>
  endpoint(async (req, res, next) => {
    const authHeader = req.headers["authorization"] || "";

    if (!authHeader || !authHeader.startsWith(TOKEN_PREFIX)) {
      res.set("WWW-Authenticate", "Bearer");
      throw new HttpError(401, "Unauthorized");
    }

    const requestToken = authHeader.split(TOKEN_PREFIX)[1];

    if (requestToken !== token) {
      throw new HttpError(401, "Unauthorized");
    }

    next();
  });

export const auth = createInternalAuth(process.env.API_TOKEN!);
